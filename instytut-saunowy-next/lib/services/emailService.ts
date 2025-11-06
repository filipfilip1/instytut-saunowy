import { Resend } from 'resend';
import OrderConfirmationEmail from '@/emails/order-confirmation';
import { IOrder } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOrderEmailParams {
  order: IOrder;
  invoicePdfUrl?: string; // Optional: URL to invoice PDF
}

/**
 * Send order confirmation email with invoice attachment
 */
export async function sendOrderConfirmationEmail({
  order,
  invoicePdfUrl,
}: SendOrderEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate email configuration
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not configured');
      return { success: false, error: 'Email service not configured' };
    }

    const orderNumber = order._id.toString().slice(-8).toUpperCase();
    const customerName = order.shippingAddress.name;
    const customerEmail = order.shippingAddress.email;

    console.log(`📧 Sending order confirmation email to: ${customerEmail}`);

    // Prepare attachments array
    const attachments: Array<{ filename: string; path: string }> = [];

    // Add invoice PDF if available
    if (invoicePdfUrl) {
      attachments.push({
        filename: `Faktura-${orderNumber}.pdf`,
        path: invoicePdfUrl,
      });
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Instytut Saunowy <zamowienia@instytut-saunowy.pl>',
      to: [customerEmail],
      subject: `Potwierdzenie zamówienia #${orderNumber}`,
      react: OrderConfirmationEmail({
        orderNumber,
        customerName,
        items: order.items.map((item) => ({
          productName: item.productName,
          quantity: item.quantity,
          pricePerItem: item.pricePerItem,
        })),
        total: order.total,
        trackingNumber: order.trackingNumber,
      }),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('❌ Failed to send email:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Order confirmation email sent successfully:', data?.id);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Email service error:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send shipping notification email
 */
export async function sendShippingNotificationEmail(
  order: IOrder,
  trackingNumber: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: 'Email service not configured' };
    }

    const orderNumber = order._id.toString().slice(-8).toUpperCase();

    const { data, error } = await resend.emails.send({
      from: 'Instytut Saunowy <zamowienia@instytut-saunowy.pl>',
      to: [order.shippingAddress.email],
      subject: `Twoja przesyłka została wysłana! #${orderNumber}`,
      html: `
        <h2>Świetne wieści! 📦</h2>
        <p>Twoje zamówienie <strong>#${orderNumber}</strong> zostało właśnie wysłane!</p>
        <p>Numer przesyłki: <strong>${trackingNumber}</strong></p>
        <p>
          <a href="https://inpost.pl/sledzenie-przesylek?number=${trackingNumber}"
             style="background-color: #98391d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 16px 0;">
            Śledź przesyłkę
          </a>
        </p>
        <p>Przesyłka powinna dotrzeć do Ciebie w ciągu 1-2 dni roboczych.</p>
        <p>Dziękujemy za zakupy!</p>
        <p>Zespół Instytutu Saunowego 🧖‍♀️</p>
      `,
    });

    if (error) {
      console.error('❌ Failed to send shipping notification:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Shipping notification sent:', data?.id);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Shipping notification error:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send order cancellation email
 */
export async function sendOrderCancellationEmail(
  order: IOrder,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: 'Email service not configured' };
    }

    const orderNumber = order._id.toString().slice(-8).toUpperCase();

    const { data, error } = await resend.emails.send({
      from: 'Instytut Saunowy <zamowienia@instytut-saunowy.pl>',
      to: [order.shippingAddress.email],
      subject: `Anulowanie zamówienia #${orderNumber}`,
      html: `
        <h2>Zamówienie anulowane</h2>
        <p>Twoje zamówienie <strong>#${orderNumber}</strong> zostało anulowane.</p>
        ${reason ? `<p>Powód: ${reason}</p>` : ''}
        <p>Jeśli masz pytania, skontaktuj się z nami: kontakt@instytut-saunowy.pl</p>
        <p>Zespół Instytutu Saunowego</p>
      `,
    });

    if (error) {
      console.error('❌ Failed to send cancellation email:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Cancellation email sent:', data?.id);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Cancellation email error:', errorMessage);
    return { success: false, error: errorMessage };
  }
}
