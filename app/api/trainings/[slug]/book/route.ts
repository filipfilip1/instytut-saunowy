import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { stripe, formatAmountForStripe } from '@/lib/stripe';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// Validation schema for booking request
const bookTrainingSchema = z.object({
  participantInfo: z.object({
    name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
    email: z.string().email('Nieprawidłowy adres email'),
    phone: z.string().min(9, 'Nieprawidłowy numer telefonu'),
    experience: z.string().optional(),
    specialRequirements: z.string().optional(),
  }),
  userId: z.string().optional(),
});

// POST /api/trainings/[slug]/book - Create booking and Stripe checkout session
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();

    // Validate request
    const validationResult = bookTrainingSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Nieprawidłowe dane',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { participantInfo, userId } = validationResult.data;

    await dbConnect();

    const { slug } = await params;

    // Find training
    const training = await Training.findBySlug(slug);

    if (!training) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Szkolenie nie zostało znalezione',
        },
        { status: 404 }
      );
    }

    // Check if training is published
    if (training.status !== 'published') {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Szkolenie nie jest dostępne do zapisu',
        },
        { status: 400 }
      );
    }

    // Check if training is in the past
    if (new Date(training.date) < new Date()) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'To szkolenie już się odbyło',
        },
        { status: 400 }
      );
    }

    // Check availability
    if (training.isFull) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Brak wolnych miejsc na to szkolenie',
        },
        { status: 400 }
      );
    }

    // Calculate amounts
    const fullAmount = training.price;
    const depositAmount = training.depositAmount ?? training.price; // Virtual property, fallback to full price

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'p24'], // Card and Przelewy24 for Polish customers
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: training.name,
              description: `Szkolenie: ${training.name} | ${new Date(training.date).toLocaleDateString('pl-PL')} | ${training.location.city}`,
              images: training.featuredImage?.url ? [training.featuredImage.url] : undefined,
              metadata: {
                type: 'training',
                trainingId: String(training._id),
                trainingSlug: training.slug,
              },
            },
            unit_amount: formatAmountForStripe(depositAmount),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/szkolenia/${slug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/szkolenia/${slug}`,
      customer_email: participantInfo.email,

      // Store booking data in metadata for webhook processing
      metadata: {
        type: 'training_booking',
        trainingId: String(training._id),
        trainingSlug: training.slug,
        participantInfo: JSON.stringify(participantInfo),
        userId: userId || '',
        guestEmail: !userId ? participantInfo.email : '',
        fullAmount: fullAmount.toString(),
        depositAmount: depositAmount.toString(),
      },
    });

    return NextResponse.json({
      status: 'success',
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Nie udało się utworzyć rezerwacji',
      },
      { status: 500 }
    );
  }
}