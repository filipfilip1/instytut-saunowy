import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { cancelBookingWithRefund } from '@/lib/services/bookingService';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/admin/bookings/[id]/cancel
 * Cancel booking with optional Stripe refund
 *
 * Body:
 *   - reason?: string (cancellation reason)
 *   - refund: boolean (whether to process refund, default: true)
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { reason, refund = true } = await request.json();

    const booking = await cancelBookingWithRefund(id, reason, refund);

    return NextResponse.json({
      status: 'success',
      data: booking,
      message: refund
        ? 'Rezerwacja została anulowana i zwrot został przetworzony'
        : 'Rezerwacja została anulowana',
    });
  } catch (error: unknown) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Błąd podczas anulowania rezerwacji',
      },
      { status: 500 }
    );
  }
}
