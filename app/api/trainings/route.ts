import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';

// GET /api/trainings - List published trainings
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const upcoming = searchParams.get('upcoming') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    // Build query
    const query: any = { status: 'published' };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter upcoming trainings
    if (upcoming) {
      query.date = { $gte: new Date() };
    }

    // Execute query with pagination
    const trainings = await Training.find(query)
      .sort({ date: 1 }) // Sort by date ascending
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-__v')
      .lean();

    // Get total count
    const total = await Training.countDocuments(query);

    return NextResponse.json({
      status: 'success',
      data: JSON.parse(JSON.stringify(trainings)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Nie udało się pobrać szkoleń',
      },
      { status: 500 }
    );
  }
}