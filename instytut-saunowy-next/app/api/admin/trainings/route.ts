import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';

// POST /api/admin/trainings - Create new training
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();

    // Create training
    const training = await Training.create(body);

    return NextResponse.json({
      status: 'success',
      data: JSON.parse(JSON.stringify(training)),
    });
  } catch (error: any) {
    console.error('Error creating training:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Nie udało się utworzyć szkolenia',
      },
      { status: 500 }
    );
  }
}
