import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getTrainingsWithStats } from '@/lib/services/trainingService';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { TrainingStatus, TrainingCategory } from '@/lib/constants/trainingStatuses';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

/**
 * GET /api/admin/trainings
 * Get list of trainings with filters, pagination, and stats
 *
 * Query params:
 *   - status: draft | published | cancelled | completed
 *   - category: podstawowy | zaawansowany | master | indywidualny
 *   - search: string (searches name, description, location)
 *   - sortBy: string (default: -date)
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
      status: searchParams.get('status') as TrainingStatus | undefined,
      category: searchParams.get('category') as TrainingCategory | undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || '-date',
      limit: parseInt(searchParams.get('limit') || '50'),
      page: parseInt(searchParams.get('page') || '1'),
    };

    const result = await getTrainingsWithStats(options);

    return NextResponse.json({
      status: 'success',
      data: result,
    });
  } catch (error: unknown) {
    console.error('Error fetching trainings:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Błąd podczas pobierania szkoleń',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/trainings
 * Create new training
 *
 * Body: ITraining (all required fields)
 */
export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await request.json();

    // Validate required fields for published trainings
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

      // Validate location
      if (!data.location?.venue || !data.location?.address || !data.location?.city) {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Lokalizacja jest wymagana (venue, address, city)',
          },
          { status: 400 }
        );
      }

      // Validate instructor
      if (!data.instructor?.name) {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Nazwa instruktora jest wymagana',
          },
          { status: 400 }
        );
      }

      // Validate whatYouLearn
      if (!data.whatYouLearn || data.whatYouLearn.length === 0) {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Musisz dodać przynajmniej jedną rzecz do "Czego się nauczysz"',
          },
          { status: 400 }
        );
      }

      // Validate featuredImage
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

    // Ensure currentParticipants is 0 for new trainings
    data.currentParticipants = 0;

    const training = await Training.create(data);

    return NextResponse.json(
      {
        status: 'success',
        data: training,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating training:', error);

    // Duplicate slug error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Szkolenie o tym slugu już istnieje',
        },
        { status: 400 }
      );
    }

    // Validation error
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
        message: 'Błąd podczas tworzenia szkolenia',
      },
      { status: 500 }
    );
  }
}
