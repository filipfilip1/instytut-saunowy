import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import TrainingBooking from '@/lib/models/TrainingBooking';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/bookings/[id]
 * Get single booking by ID (with populated training)
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;

    const booking = await TrainingBooking.findById(id)
      .populate('trainingId', 'name date location slug price')
      .lean();

    if (!booking) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Rezerwacja nie znaleziona',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: booking,
    });
  } catch (error: unknown) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Błąd podczas pobierania rezerwacji',
      },
      { status: 500 }
    );
  }
}
