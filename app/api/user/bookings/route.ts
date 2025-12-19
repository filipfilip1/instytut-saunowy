import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import TrainingBooking from '@/lib/models/TrainingBooking';

// GET /api/user/bookings - Get user's training bookings
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query - find by userId or guestEmail
    const query: Record<string, unknown> = {
      $or: [
        { userId: session.user.id },
        { guestEmail: session.user.email },
      ],
    };

    if (status) {
      query.bookingStatus = status;
    }

    // Get bookings with training details
    const [bookings, total] = await Promise.all([
      TrainingBooking.find(query)
        .populate('trainingId')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      TrainingBooking.countDocuments(query),
    ]);

    // Calculate stats
    const stats = await TrainingBooking.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$bookingStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = stats.reduce((acc: Record<string, number>, item: { _id: string; count: number }) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    return NextResponse.json({
      status: 'success',
      data: bookings,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
      stats: {
        statusCounts,
      },
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
