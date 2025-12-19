import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateBookingNotes } from '@/lib/services/bookingService';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/bookings/[id]/notes
 * Update admin notes for a booking
 *
 * Body:
 *   - adminNotes: string
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
    const { adminNotes } = await request.json();

    if (typeof adminNotes !== 'string') {
      return NextResponse.json(
        {
          status: 'error',
          message: 'adminNotes musi być stringiem',
        },
        { status: 400 }
      );
    }

    const booking = await updateBookingNotes(id, adminNotes);

    return NextResponse.json({
      status: 'success',
      data: booking,
      message: 'Notatki zostały zaktualizowane',
    });
  } catch (error: unknown) {
    console.error('Error updating booking notes:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Błąd podczas aktualizacji notatek',
      },
      { status: 500 }
    );
  }
}
