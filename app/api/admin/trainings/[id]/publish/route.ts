import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/admin/trainings/[id]/publish
 * Toggle training published status
 *
 * Body: { status: 'published' | 'draft' }
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const { status } = await request.json();

    if (!status || !['published', 'draft'].includes(status)) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Status musi być "published" lub "draft"',
        },
        { status: 400 }
      );
    }

    const training = await Training.findById(id);

    if (!training) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Szkolenie nie znalezione',
        },
        { status: 404 }
      );
    }

    // Validate required fields before publishing
    if (status === 'published') {
      const validationErrors: string[] = [];

      if (!training.name) validationErrors.push('Nazwa szkolenia');
      if (!training.slug) validationErrors.push('Slug');
      if (!training.description) validationErrors.push('Opis');
      if (!training.date) validationErrors.push('Data szkolenia');
      if (!training.duration) validationErrors.push('Czas trwania');
      if (training.price === undefined || training.price === null) validationErrors.push('Cena');
      if (!training.maxParticipants) validationErrors.push('Maksymalna liczba uczestników');
      if (!training.category) validationErrors.push('Kategoria');
      if (!training.level) validationErrors.push('Poziom');
      if (!training.location?.venue) validationErrors.push('Miejsce szkolenia');
      if (!training.location?.address) validationErrors.push('Adres');
      if (!training.location?.city) validationErrors.push('Miasto');
      if (!training.instructor?.name) validationErrors.push('Nazwa instruktora');
      if (!training.whatYouLearn || training.whatYouLearn.length === 0)
        validationErrors.push('Czego się nauczysz (minimum 1 pozycja)');
      if (!training.featuredImage?.url) validationErrors.push('Zdjęcie główne');

      if (validationErrors.length > 0) {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Nie można opublikować szkolenia. Brakujące pola:',
            errors: validationErrors,
          },
          { status: 400 }
        );
      }
    }

    training.status = status;
    await training.save();

    return NextResponse.json({
      status: 'success',
      data: training,
      message:
        status === 'published'
          ? 'Szkolenie zostało opublikowane'
          : 'Szkolenie zostało zapisane jako szkic',
    });
  } catch (error: unknown) {
    console.error('Error updating training status:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Błąd podczas zmiany statusu szkolenia',
      },
      { status: 500 }
    );
  }
}
