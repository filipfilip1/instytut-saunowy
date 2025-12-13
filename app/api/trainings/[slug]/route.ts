import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// GET /api/trainings/[slug] - Get single training by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { slug } = await params;
    const training = await (Training as any).findBySlug(slug);

    if (!training) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Szkolenie nie zostało znalezione',
        },
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
      {
        status: 'error',
        message: 'Nie udało się pobrać szkolenia',
      },
      { status: 500 }
    );
  }
}