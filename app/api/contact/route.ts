import { NextRequest, NextResponse } from 'next/server';
import {
  sendContactFormEmailToAdmin,
  sendContactFormConfirmationToUser,
} from '@/lib/services/emailService';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message || !data.subject) {
      return NextResponse.json(
        { status: 'error', message: 'Wymagane pola nie zostały wypełnione' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { status: 'error', message: 'Podaj poprawny adres email' },
        { status: 400 }
      );
    }

    // Validate message length
    if (data.message.trim().length < 10) {
      return NextResponse.json(
        { status: 'error', message: 'Wiadomość powinna mieć minimum 10 znaków' },
        { status: 400 }
      );
    }

    // Send email to admin
    const adminEmailResult = await sendContactFormEmailToAdmin({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });

    if (!adminEmailResult.success) {
      console.error('Failed to send admin email:', adminEmailResult.error);
      return NextResponse.json(
        { status: 'error', message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const userEmailResult = await sendContactFormConfirmationToUser({
      email: data.email,
      name: data.name,
      message: data.message,
    });

    // Don't fail the request if confirmation email fails
    if (!userEmailResult.success) {
      console.warn('Failed to send user confirmation email:', userEmailResult.error);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Wiadomość została wysłana',
    });
  } catch (error: any) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Wystąpił błąd serwera. Spróbuj ponownie później.' },
      { status: 500 }
    );
  }
}
