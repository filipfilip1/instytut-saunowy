import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getBookingsWithStats } from '@/lib/services/bookingService';
import {
  BookingStatus,
  BookingPaymentStatus,
} from '@/lib/constants/bookingStatuses';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

/**
 * GET /api/admin/bookings
 * Get list of bookings with filters, pagination, and stats
 *
 * Query params:
 *   - trainingId: string
 *   - bookingStatus: confirmed | cancelled | pending_approval
 *   - paymentStatus: pending | paid | failed | refunded
 *   - search: string (searches participant email, name, guestEmail)
 *   - sortBy: string (default: -createdAt)
 *   - limit: number (default: 50)
 *   - page: number (default: 1)
 */
export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);

    const options = {
      trainingId: searchParams.get('trainingId') || undefined,
      bookingStatus: searchParams.get('bookingStatus') as BookingStatus | undefined,
      paymentStatus: searchParams.get('paymentStatus') as BookingPaymentStatus | undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || '-createdAt',
      limit: parseInt(searchParams.get('limit') || '50'),
      page: parseInt(searchParams.get('page') || '1'),
    };

    const result = await getBookingsWithStats(options);

    return NextResponse.json({
      status: 'success',
      data: result,
    });
  } catch (error: unknown) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Błąd podczas pobierania rezerwacji',
      },
      { status: 500 }
    );
  }
}
