import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import TrainingBooking from '@/lib/models/TrainingBooking';
import {
  TRAINING_STATUSES,
  TrainingStatus,
  TrainingCategory,
} from '@/lib/constants/trainingStatuses';
import { ITraining } from '@/types';

// Type-safe mapper from Mongoose Document to ITraining
function toTraining(doc: unknown): ITraining {
  return JSON.parse(JSON.stringify(doc)) as ITraining;
}

// Types for service responses
export interface TrainingStats {
  statusCounts: Record<TrainingStatus, number>;
  upcomingCount: number;
  totalRevenue: number;
  averageOccupancy: number;
}

export interface TrainingsListResponse {
  trainings: ITraining[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
  stats: TrainingStats;
}

export interface TrainingQueryOptions {
  status?: TrainingStatus;
  category?: TrainingCategory;
  search?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

/**
 * Get training statistics (status counts, upcoming, revenue, occupancy)
 */
export async function getTrainingStats(): Promise<TrainingStats> {
  await dbConnect();

  // Status counts aggregation
  const statusAggregation = await Training.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const statusCounts: Record<TrainingStatus, number> = TRAINING_STATUSES.reduce(
    (acc, status) => ({ ...acc, [status]: 0 }),
    {} as Record<TrainingStatus, number>
  );

  statusAggregation.forEach((stat) => {
    if (stat._id in statusCounts) {
      statusCounts[stat._id as TrainingStatus] = stat.count;
    }
  });

  // Upcoming trainings count (published + future date)
  const upcomingCount = await Training.countDocuments({
    status: 'published',
    date: { $gte: new Date() },
  });

  // Total revenue from paid bookings
  const revenueAggregation = await TrainingBooking.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$paymentAmount' } } },
  ]);

  const totalRevenue = revenueAggregation[0]?.total || 0;

  // Average occupancy rate
  const occupancyAggregation = await Training.aggregate([
    {
      $match: {
        status: { $in: ['published', 'completed'] },
      },
    },
    {
      $group: {
        _id: null,
        avgOccupancy: {
          $avg: {
            $cond: [
              { $gt: ['$maxParticipants', 0] },
              { $multiply: [{ $divide: ['$currentParticipants', '$maxParticipants'] }, 100] },
              0,
            ],
          },
        },
      },
    },
  ]);

  const averageOccupancy = Math.round(occupancyAggregation[0]?.avgOccupancy || 0);

  return {
    statusCounts,
    upcomingCount,
    totalRevenue,
    averageOccupancy,
  };
}

/**
 * Get list of trainings with stats and pagination
 * @param options - Query options (status, category, search, sortBy, limit, page)
 */
export async function getTrainingsWithStats(
  options?: TrainingQueryOptions
): Promise<TrainingsListResponse> {
  await dbConnect();

  const {
    status,
    category,
    search,
    sortBy = '-date',
    limit = 50,
    page = 1,
  } = options || {};

  const query: Record<string, unknown> = {};

  if (status) {
    query.status = status;
  }

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { slug: { $regex: search, $options: 'i' } },
      { 'location.city': { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const trainings = await Training.find(query)
    .sort(sortBy)
    .limit(limit)
    .skip(skip)
    .lean();

  const total = await Training.countDocuments(query);

  const stats = await getTrainingStats();

  return {
    trainings: trainings.map(toTraining),
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
    stats,
  };
}

/**
 * Get upcoming trainings for dashboard widget
 * @param limit - Number of trainings to return (default 5)
 */
export async function getUpcomingTrainings(limit = 5): Promise<ITraining[]> {
  await dbConnect();

  const trainings = await Training.find({
    status: 'published',
    date: { $gte: new Date() },
  })
    .sort({ date: 1 })
    .limit(limit)
    .lean();

  return trainings.map(toTraining);
}

/**
 * Check if training can be deleted (no confirmed bookings)
 * @param trainingId - Training ID to check
 */
export async function canDeleteTraining(trainingId: string): Promise<boolean> {
  await dbConnect();

  const confirmedBookingsCount = await TrainingBooking.countDocuments({
    trainingId: trainingId,
    bookingStatus: 'confirmed',
  });

  return confirmedBookingsCount === 0;
}

/**
 * Get training revenue from paid bookings
 * @param trainingId - Optional training ID. If not provided, returns total revenue for all trainings
 */
export async function getTrainingRevenue(trainingId?: string): Promise<number> {
  await dbConnect();

  const matchQuery: Record<string, unknown> = { paymentStatus: 'paid' };

  if (trainingId) {
    matchQuery.trainingId = trainingId;
  }

  const revenueAggregation = await TrainingBooking.aggregate([
    { $match: matchQuery },
    { $group: { _id: null, total: { $sum: '$paymentAmount' } } },
  ]);

  return revenueAggregation[0]?.total || 0;
}

/**
 * Get bookings count for a specific training
 * @param trainingId - Training ID
 */
export async function getTrainingBookingsCount(trainingId: string): Promise<{
  total: number;
  confirmed: number;
  cancelled: number;
  pending: number;
}> {
  await dbConnect();

  const aggregation = await TrainingBooking.aggregate([
    { $match: { trainingId: trainingId } },
    {
      $group: {
        _id: '$bookingStatus',
        count: { $sum: 1 },
      },
    },
  ]);

  const counts = {
    total: 0,
    confirmed: 0,
    cancelled: 0,
    pending: 0,
  };

  aggregation.forEach((stat) => {
    if (stat._id === 'confirmed') counts.confirmed = stat.count;
    if (stat._id === 'cancelled') counts.cancelled = stat.count;
    if (stat._id === 'pending_approval') counts.pending = stat.count;
  });

  counts.total = counts.confirmed + counts.cancelled + counts.pending;

  return counts;
}
