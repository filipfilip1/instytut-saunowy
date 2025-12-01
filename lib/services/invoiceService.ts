import axios from 'axios';
import { IOrder } from '@/types';
import { capitalizeWords } from '@/lib/utils/text';

interface InvoiceResponse {
  success: boolean;
  invoiceId?: string;
  invoiceNumber?: string;
  invoicePdfUrl?: string;
  error?: string;
}

/**
 * Create invoice in Fakturownia.pl
 */
export async function createInvoice(order: IOrder): Promise<InvoiceResponse> {
  try {
    // Validate configuration
    if (!process.env.FAKTUROWNIA_API_TOKEN) {
      console.error('❌ FAKTUROWNIA_API_TOKEN is not configured');
      return { success: false, error: 'Invoice service not configured' };
    }

    if (!process.env.FAKTUROWNIA_ACCOUNT) {
      console.error('❌ FAKTUROWNIA_ACCOUNT is not configured');
      return { success: false, error: 'Invoice account not configured' };
    }

    const apiUrl = `https://${process.env.FAKTUROWNIA_ACCOUNT}/invoices.json`;

    console.log('📄 Creating invoice for order:', order._id);

    // UWAGA: Używamy Faktur Pro Forma dla bezpiecznego testowania!
    //
    // Pro Forma to NIE jest dokument księgowy:
    // - NIE trafia do Urzędu Skarbowego / KSeF / JPK
    // - Fikcyjne dane są całkowicie bezpieczne
    // - Idealne do testowania flow email + PDF
    //
    // Przed produkcją: zmień 'proforma' → 'vat' i użyj prawdziwych danych firmy
    const invoiceData = {
      api_token: process.env.FAKTUROWNIA_API_TOKEN,
      invoice: {
        kind: 'proforma', // Faktura Pro Forma (informacyjna, nie księgowa)
        number: null, // Auto-numeracja
        sell_date: new Date().toISOString().split('T')[0], // Data sprzedaży (dziś)
        issue_date: new Date().toISOString().split('T')[0], // Data wystawienia (dziś)
        payment_to: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0], // Termin płatności +14 dni

        // Dane nabywcy (z capitalize dla profesjonalnego wyglądu)
        buyer_name: capitalizeWords(order.shippingAddress.name),
        buyer_email: order.shippingAddress.email, // Email bez capitalize
        buyer_street: capitalizeWords(order.shippingAddress.street),
        buyer_city: capitalizeWords(order.shippingAddress.city),
        buyer_post_code: order.shippingAddress.zipCode,
        buyer_country: order.shippingAddress.country || 'PL',

        positions: order.items.map((item) => ({
          name: item.productName,
          tax: 23,
          total_price_gross: Number((item.pricePerItem * item.quantity).toFixed(2)),
          quantity: item.quantity,
          quantity_unit: 'szt',
        })),

        oid: order._id.toString().slice(-8).toUpperCase(),
        description: `Faktura Pro Forma - dokument informacyjny. Płatność: ${order.paymentStatus === 'paid' ? 'Opłacone kartą przez Stripe' : 'Oczekuje na płatność'}.`,
      },
    };

    // Create invoice via Fakturownia API
    const response = await axios.post(apiUrl, invoiceData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10s timeout
    });

    const invoice = response.data;

    console.log('✅ Invoice created:', invoice.number);

    // Generate PDF URL
    const pdfUrl = `https://${process.env.FAKTUROWNIA_ACCOUNT}/invoices/${invoice.id}.pdf?api_token=${process.env.FAKTUROWNIA_API_TOKEN}`;

    return {
      success: true,
      invoiceId: invoice.id.toString(),
      invoiceNumber: invoice.number,
      invoicePdfUrl: pdfUrl,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Fakturownia API error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Invoice creation error:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Get invoice PDF URL
 */
export function getInvoicePdfUrl(invoiceId: string): string {
  if (!process.env.FAKTUROWNIA_ACCOUNT || !process.env.FAKTUROWNIA_API_TOKEN) {
    throw new Error('Fakturownia not configured');
  }

  return `https://${process.env.FAKTUROWNIA_ACCOUNT}/invoices/${invoiceId}.pdf?api_token=${process.env.FAKTUROWNIA_API_TOKEN}`;
}

/**
 * Send invoice via email directly from Fakturownia
 * (Alternative to sending via Resend)
 */
export async function sendInvoiceEmail(invoiceId: string): Promise<InvoiceResponse> {
  try {
    if (!process.env.FAKTUROWNIA_API_TOKEN || !process.env.FAKTUROWNIA_ACCOUNT) {
      return { success: false, error: 'Fakturownia not configured' };
    }

    const apiUrl = `https://${process.env.FAKTUROWNIA_ACCOUNT}/invoices/${invoiceId}/send_by_email.json`;

    await axios.post(apiUrl, {
      api_token: process.env.FAKTUROWNIA_API_TOKEN,
    });

    console.log('✅ Invoice email sent via Fakturownia:', invoiceId);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to send invoice email:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Update invoice (e.g., mark as paid)
 */
export async function updateInvoice(
  invoiceId: string,
  updates: { paid?: boolean; payment_date?: string }
): Promise<InvoiceResponse> {
  try {
    if (!process.env.FAKTUROWNIA_API_TOKEN || !process.env.FAKTUROWNIA_ACCOUNT) {
      return { success: false, error: 'Fakturownia not configured' };
    }

    const apiUrl = `https://${process.env.FAKTUROWNIA_ACCOUNT}/invoices/${invoiceId}.json`;

    await axios.put(apiUrl, {
      api_token: process.env.FAKTUROWNIA_API_TOKEN,
      invoice: updates,
    });

    console.log('✅ Invoice updated:', invoiceId);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to update invoice:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Cancel/delete invoice
 */
export async function cancelInvoice(invoiceId: string): Promise<InvoiceResponse> {
  try {
    if (!process.env.FAKTUROWNIA_API_TOKEN || !process.env.FAKTUROWNIA_ACCOUNT) {
      return { success: false, error: 'Fakturownia not configured' };
    }

    const apiUrl = `https://${process.env.FAKTUROWNIA_ACCOUNT}/invoices/${invoiceId}.json`;

    await axios.delete(apiUrl, {
      params: {
        api_token: process.env.FAKTUROWNIA_API_TOKEN,
      },
    });

    console.log('✅ Invoice cancelled:', invoiceId);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to cancel invoice:', errorMessage);
    return { success: false, error: errorMessage };
  }
}
