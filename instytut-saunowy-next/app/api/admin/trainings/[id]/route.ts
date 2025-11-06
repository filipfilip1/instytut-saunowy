import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/admin/trainings/[id] - Get single training
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const training = await Training.findById(params.id);

    if (!training) {
      return NextResponse.json(
        { status: 'error', message: 'Szkolenie nie zostało znalezione' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: JSON.parse(JSON.stringify(training)),
    });
  } catch (error) {
    console.error('Error fetching training:', error);
    return NextResponse.json(
      { status: 'error', message: 'Nie udało się pobrać szkolenia' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/trainings/[id] - Update training
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();

    const training = await Training.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!training) {
      return NextResponse.json(
        { status: 'error', message: 'Szkolenie nie zostało znalezione' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: JSON.parse(JSON.stringify(training)),
    });
  } catch (error: any) {
    console.error('Error updating training:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Nie udało się zaktualizować szkolenia',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/trainings/[id] - Delete training
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const training = await Training.findByIdAndDelete(params.id);

    if (!training) {
      return NextResponse.json(
        { status: 'error', message: 'Szkolenie nie zostało znalezione' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'Szkolenie zostało usunięte',
    });
  } catch (error) {
    console.error('Error deleting training:', error);
    return NextResponse.json(
      { status: 'error', message: 'Nie udało się usunąć szkolenia' },
      { status: 500 }
    );
  }
}
