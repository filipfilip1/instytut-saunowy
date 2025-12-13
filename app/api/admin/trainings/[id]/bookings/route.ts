import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getBookingsForTraining } from '@/lib/services/bookingService';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/trainings/[id]/bookings
 * Get all bookings for a specific training
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    const bookings = await getBookingsForTraining(id);

    return NextResponse.json({
      status: 'success',
      data: bookings,
      count: bookings.length,
    });
  } catch (error: any) {
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
