import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateBookingPaymentStatus } from '@/lib/services/bookingService';
import {
  BookingPaymentStatus,
  isValidBookingPaymentStatus,
} from '@/lib/constants/bookingStatuses';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/bookings/[id]/payment
 * Manual payment status override (for edge cases)
 *
 * Body:
 *   - paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
 *   - adminNote?: string (optional note explaining the override)
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { paymentStatus, adminNote } = await request.json();

    if (!paymentStatus || !isValidBookingPaymentStatus(paymentStatus)) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Nieprawidłowy status płatności. Dozwolone: pending, paid, failed, refunded',
        },
        { status: 400 }
      );
    }

    const booking = await updateBookingPaymentStatus(
      id,
      paymentStatus as BookingPaymentStatus,
      adminNote
    );

    return NextResponse.json({
      status: 'success',
      data: booking,
      message: `Status płatności zmieniony na: ${paymentStatus}`,
    });
  } catch (error: unknown) {
    console.error('Error updating payment status:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Błąd podczas aktualizacji statusu płatności',
      },
      { status: 500 }
    );
  }
}
