import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { canDeleteTraining } from '@/lib/services/trainingService';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/trainings/[id]
 * Get single training by ID
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

    const training = await Training.findById(id).lean();

    if (!training) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Szkolenie nie znalezione',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: training,
    });
  } catch (error: unknown) {
    console.error('Error fetching training:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Błąd podczas pobierania szkolenia',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/trainings/[id]
 * Update training
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();

    // Validate if publishing
    if (data.status === 'published') {
      const requiredFields = [
        'name',
        'slug',
        'description',
        'date',
        'duration',
        'price',
        'maxParticipants',
        'category',
        'level',
      ];

      const missingFields = requiredFields.filter((field) => !data[field]);

      if (missingFields.length > 0) {
        return NextResponse.json(
          {
            status: 'error',
            message: `Brakujące pola: ${missingFields.join(', ')}`,
            errors: missingFields,
          },
          { status: 400 }
        );
      }

      if (!data.location?.venue || !data.location?.address || !data.location?.city) {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Lokalizacja jest wymagana',
          },
          { status: 400 }
        );
      }

      if (!data.instructor?.name) {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Nazwa instruktora jest wymagana',
          },
          { status: 400 }
        );
      }

      if (!data.whatYouLearn || data.whatYouLearn.length === 0) {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Musisz dodać przynajmniej jedną rzecz do "Czego się nauczysz"',
          },
          { status: 400 }
        );
      }

      if (!data.featuredImage?.url) {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Zdjęcie główne jest wymagane',
          },
          { status: 400 }
        );
      }
    }

    // Validate currentParticipants <= maxParticipants
    if (data.currentParticipants > data.maxParticipants) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Liczba obecnych uczestników nie może przekroczyć maksymalnej liczby miejsc',
        },
        { status: 400 }
      );
    }

    const training = await Training.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!training) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Szkolenie nie znalezione',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: training,
    });
  } catch (error: unknown) {
    console.error('Error updating training:', error);

    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Szkolenie o tym slugu już istnieje',
        },
        { status: 400 }
      );
    }

    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const errors = Object.values(error.errors as Record<string, { message: string }>).map((e) => e.message);
      return NextResponse.json(
        {
          status: 'error',
          message: 'Błąd walidacji',
          errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        message: 'Błąd podczas aktualizacji szkolenia',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/trainings/[id]
 * Soft delete training (set status to 'cancelled')
 * Only allowed if no confirmed bookings exist
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;

    // Check if training can be deleted
    const canDelete = await canDeleteTraining(id);

    if (!canDelete) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Nie można usunąć szkolenia z potwierdzonymi rezerwacjami',
        },
        { status: 400 }
      );
    }

    // Soft delete: set status to cancelled
    const training = await Training.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    ).lean();

    if (!training) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Szkolenie nie znalezione',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Szkolenie zostało anulowane',
      data: training,
    });
  } catch (error: unknown) {
    console.error('Error deleting training:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Błąd podczas usuwania szkolenia',
      },
      { status: 500 }
    );
  }
}
