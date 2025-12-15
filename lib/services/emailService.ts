import { Resend } from 'resend';
import OrderConfirmationEmail from '@/emails/order-confirmation';
import { IOrder } from '@/types';
import React from 'react';
import Product from '@/lib/models/Product';
import dbConnect from '@/lib/mongodb';
import { emailThumbnail } from '@/lib/utils/cloudinary';
import { BRAND } from '@/constants/brand';

// ============================================
// Configuration
// ============================================

const EMAIL_CONFIG = {
  from: `${process.env.EMAIL_FROM_NAME || BRAND.name} <${process.env.EMAIL_FROM_ADDRESS || 'onboarding@resend.dev'}>`,
  contactEmail: process.env.EMAIL_CONTACT || BRAND.contact.email,
  companyName: process.env.EMAIL_FROM_NAME || BRAND.name,
} as const;

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================
// Types
// ============================================

interface EmailResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

interface SendOrderEmailParams {
  order: IOrder;
  invoicePdfUrl?: string;
}

interface SendEmailOptions {
  logPrefix: string;
  to: string[];
  subject: string;
  html?: string;
  react?: React.ReactElement;
  attachments?: Array<{ filename: string; path: string }>;
}

// ============================================
// Helpers
// ============================================

/**
 * Generate order number from order ID
 */
function getOrderNumber(order: IOrder): string {
  return order._id.toString().slice(-8).toUpperCase();
}

/**
 * Core email sending function with shared logic
 */
async function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
  const { logPrefix, ...emailOptions } = options;

  // Validate configuration
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    console.log(`📧 ${logPrefix}: ${emailOptions.to}`);

    // @ts-expect-error - Resend types are overly strict with discriminated unions
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: emailOptions.to,
      subject: emailOptions.subject,
      ...(emailOptions.react ? { react: emailOptions.react } : { html: emailOptions.html }),
      ...(emailOptions.attachments && { attachments: emailOptions.attachments }),
    });

    if (error) {
      console.error(`❌ ${logPrefix} failed:`, error);
      return { success: false, error: error.message };
    }

    console.log(`✅ ${logPrefix} successful:`, data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ ${logPrefix} error:`, errorMessage);
    return { success: false, error: errorMessage };
  }
}

// ============================================
// Public Functions
// ============================================

/**
 * Send order confirmation email with optional invoice attachment
 */
export async function sendOrderConfirmationEmail({
  order,
  invoicePdfUrl,
}: SendOrderEmailParams): Promise<EmailResult> {
  const orderNumber = getOrderNumber(order);
  const customerName = order.shippingAddress.name;
  const customerEmail = order.shippingAddress.email;

  // Fetch products to get images
  await dbConnect();
  const productIds = order.items.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });
  const productMap = new Map(products.map((p) => [String(p._id), p]));

  // Enrich items with images and variant display names
  const enrichedItems = order.items.map((item) => {
    const product = productMap.get(item.productId);
    const primaryImage = product?.images?.find((img) => img.isPrimary);
    const rawUrl = primaryImage?.url || `${process.env.NEXT_PUBLIC_APP_URL}/placeholder-product.png`;

    // Apply Cloudinary transformation for email thumbnail (60x60px, optimized quality)
    const imageUrl = emailThumbnail(rawUrl);

    console.log(`📸 Product: ${item.productName}, Optimized URL: ${imageUrl}`);

    return {
      productName: item.productName,
      quantity: item.quantity,
      pricePerItem: item.pricePerItem,
      variantDisplayNames: item.variantDisplayNames,
      imageUrl,
    };
  });

  console.log('📧 Email data:', {
    logo: BRAND.logo.url.email,
    customerName,
    itemCount: enrichedItems.length,
  });

  const attachments = invoicePdfUrl
    ? [{ filename: `Faktura-${orderNumber}.pdf`, path: invoicePdfUrl }]
    : undefined;

  return sendEmail({
    logPrefix: 'Sending order confirmation email to',
    to: [customerEmail],
    subject: `Potwierdzenie zamówienia #${orderNumber}`,
    react: OrderConfirmationEmail({
      orderNumber,
      customerName,
      items: enrichedItems,
      total: order.total,
      trackingNumber: order.trackingNumber,
    }),
    attachments,
  });
}

/**
 * Send shipping notification email with tracking link
 */
export async function sendShippingNotificationEmail(
  order: IOrder,
  trackingNumber: string
): Promise<EmailResult> {
  const orderNumber = getOrderNumber(order);

  return sendEmail({
    logPrefix: 'Sending shipping notification to',
    to: [order.shippingAddress.email],
    subject: `Twoja przesyłka została wysłana! #${orderNumber}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Twoja przesyłka jest w drodze!</h2>
        <p>Twoje zamówienie <strong>#${orderNumber}</strong> zostało właśnie wysłane.</p>
        <p>Numer przesyłki: <strong>${trackingNumber}</strong></p>
        <p>
          <a href="https://inpost.pl/sledzenie-przesylek?number=${trackingNumber}"
             style="background-color: #98391d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 16px 0;">
            Śledź przesyłkę
          </a>
        </p>
        <p>Przesyłka powinna dotrzeć do Ciebie w ciągu 1-2 dni roboczych.</p>
        <p>Dziękujemy za zakupy!</p>
        <p>Zespół ${EMAIL_CONFIG.companyName}</p>
      </div>
    `,
  });
}

/**
 * Send order cancellation email
 */
export async function sendOrderCancellationEmail(
  order: IOrder,
  reason?: string
): Promise<EmailResult> {
  const orderNumber = getOrderNumber(order);

  return sendEmail({
    logPrefix: 'Sending cancellation email to',
    to: [order.shippingAddress.email],
    subject: `Anulowanie zamówienia #${orderNumber}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Zamówienie anulowane</h2>
        <p>Twoje zamówienie <strong>#${orderNumber}</strong> zostało anulowane.</p>
        ${reason ? `<p>Powód: ${reason}</p>` : ''}
        <p>Jeśli masz pytania, skontaktuj się z nami: <a href="mailto:${EMAIL_CONFIG.contactEmail}">${EMAIL_CONFIG.contactEmail}</a></p>
        <p>Zespół ${EMAIL_CONFIG.companyName}</p>
      </div>
    `,
  });
}

/**
 * Send contact form submission to admin
 */
export async function sendContactFormEmailToAdmin(params: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<EmailResult> {
  const { name, email, phone, subject, message } = params;

  return sendEmail({
    logPrefix: 'Sending contact form to admin',
    to: ['filip.fieduk@gmail.com'],
    subject: `Formularz kontaktowy: ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: bold; width: 120px;">Od:</td>
            <td style="padding: 12px 0;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: bold;">Email:</td>
            <td style="padding: 12px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: bold;">Telefon:</td>
            <td style="padding: 12px 0;">${phone || 'Nie podano'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: bold;">Temat:</td>
            <td style="padding: 12px 0;">${subject}</td>
          </tr>
        </table>
        <div style="margin: 20px 0;">
          <strong>Wiadomość:</strong>
          <div style="margin-top: 10px; padding: 16px; background-color: #f5f5f5; border-radius: 8px; white-space: pre-wrap;">${message}</div>
        </div>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Ta wiadomość została wysłana przez formularz kontaktowy na stronie ${EMAIL_CONFIG.companyName}
        </p>
      </div>
    `,
  });
}

/**
 * Send contact form confirmation to user
 */
export async function sendContactFormConfirmationToUser(params: {
  email: string;
  name: string;
  message: string;
}): Promise<EmailResult> {
  const { email, name, message } = params;

  return sendEmail({
    logPrefix: 'Sending contact form confirmation to',
    to: [email],
    subject: 'Potwierdzenie otrzymania wiadomości - Instytut Saunowy',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Dziękujemy za kontakt!</h2>
        <p>Cześć ${name},</p>
        <p>Twoja wiadomość została dostarczona. Odpowiemy w ciągu 24-48 godzin roboczych.</p>
        <div style="margin: 20px 0; padding: 20px; background-color: #f9f7f4; border-left: 4px solid #d4af7a; border-radius: 8px;">
          <strong style="color: #3a3a3a;">Twoja wiadomość:</strong>
          <div style="margin-top: 10px; color: #666; white-space: pre-wrap;">${message}</div>
        </div>
        <p>W razie pilnych pytań, możesz również skontaktować się z nami bezpośrednio:</p>
        <p>
          📧 Email: <a href="mailto:${EMAIL_CONFIG.contactEmail}" style="color: #4a7c9e; text-decoration: none;">${EMAIL_CONFIG.contactEmail}</a>
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          Pozdrawiamy,<br>
          Zespół ${EMAIL_CONFIG.companyName}
        </p>
      </div>
    `,
  });
}
