import dbConnect from '@/lib/mongodb';
import TrainingBooking from '@/lib/models/TrainingBooking';
import Training from '@/lib/models/Training';
import {
  BOOKING_STATUSES,
  BOOKING_PAYMENT_STATUSES,
  BookingStatus,
  BookingPaymentStatus,
} from '@/lib/constants/bookingStatuses';
import { ITrainingBooking } from '@/types';
// import Stripe from 'stripe'; // TODO: PRODUCTION - Uncomment for Stripe refunds

// Types for service responses
export interface BookingStats {
  statusCounts: Record<BookingStatus, number>;
  paymentCounts: Record<BookingPaymentStatus, number>;
  totalRevenue: number;
  refundedAmount: number;
}

export interface BookingsListResponse {
  bookings: any[]; // Populated bookings with trainingId
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
  stats: BookingStats;
}

export interface BookingQueryOptions {
  trainingId?: string;
  bookingStatus?: BookingStatus;
  paymentStatus?: BookingPaymentStatus;
  search?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

/**
 * Get booking statistics (status counts, payment counts, revenue)
 */
export async function getBookingStats(): Promise<BookingStats> {
  await dbConnect();

  // Booking status counts
  const statusAggregation = await TrainingBooking.aggregate([
    {
      $group: {
        _id: '$bookingStatus',
        count: { $sum: 1 },
      },
    },
  ]);

  const statusCounts: Record<BookingStatus, number> = BOOKING_STATUSES.reduce(
    (acc, status) => ({ ...acc, [status]: 0 }),
    {} as Record<BookingStatus, number>
  );

  statusAggregation.forEach((stat) => {
    if (stat._id in statusCounts) {
      statusCounts[stat._id as BookingStatus] = stat.count;
    }
  });

  // Payment status counts
  const paymentAggregation = await TrainingBooking.aggregate([
    {
      $group: {
        _id: '$paymentStatus',
        count: { $sum: 1 },
      },
    },
  ]);

  const paymentCounts: Record<BookingPaymentStatus, number> =
    BOOKING_PAYMENT_STATUSES.reduce(
      (acc, status) => ({ ...acc, [status]: 0 }),
      {} as Record<BookingPaymentStatus, number>
    );

  paymentAggregation.forEach((stat) => {
    if (stat._id in paymentCounts) {
      paymentCounts[stat._id as BookingPaymentStatus] = stat.count;
    }
  });

  // Total revenue from paid bookings
  const revenueAggregation = await TrainingBooking.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$paymentAmount' } } },
  ]);

  const totalRevenue = revenueAggregation[0]?.total || 0;

  // Total refunded amount
  const refundedAggregation = await TrainingBooking.aggregate([
    { $match: { paymentStatus: 'refunded' } },
    { $group: { _id: null, total: { $sum: '$paymentAmount' } } },
  ]);

  const refundedAmount = refundedAggregation[0]?.total || 0;

  return {
    statusCounts,
    paymentCounts,
    totalRevenue,
    refundedAmount,
  };
}

/**
 * Get list of bookings with stats and pagination
 * @param options - Query options (trainingId, bookingStatus, paymentStatus, search, sortBy, limit, page)
 */
export async function getBookingsWithStats(
  options?: BookingQueryOptions
): Promise<BookingsListResponse> {
  await dbConnect();

  const {
    trainingId,
    bookingStatus,
    paymentStatus,
    search,
    sortBy = '-createdAt',
    limit = 50,
    page = 1,
  } = options || {};

  const query: any = {};

  if (trainingId) {
    query.trainingId = trainingId;
  }

  if (bookingStatus) {
    query.bookingStatus = bookingStatus;
  }

  if (paymentStatus) {
    query.paymentStatus = paymentStatus;
  }

  if (search) {
    query.$or = [
      { 'participantInfo.email': { $regex: search, $options: 'i' } },
      { 'participantInfo.name': { $regex: search, $options: 'i' } },
      { guestEmail: { $regex: search, $options: 'i' } },
      { _id: search.match(/^[0-9a-fA-F]{24}$/) ? search : null },
    ].filter((condition) => condition._id !== null);
  }

  const skip = (page - 1) * limit;

  const bookings = await TrainingBooking.find(query)
    .populate('trainingId', 'name date location slug price')
    .sort(sortBy)
    .limit(limit)
    .skip(skip)
    .lean();

  const total = await TrainingBooking.countDocuments(query);

  const stats = await getBookingStats();

  return {
    bookings,
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
 * Cancel booking with optional Stripe refund
 * @param bookingId - Booking ID to cancel
 * @param reason - Optional cancellation reason
 * @param shouldRefund - Whether to process Stripe refund (default: true)
 * @returns Updated booking
 *
 * TODO: PRODUCTION - Before deploying to production:
 * 1. Uncomment Stripe import at top of file
 * 2. Uncomment Stripe refund code block below (marked with TODO: PRODUCTION)
 * 3. Ensure STRIPE_SECRET_KEY is in production environment variables
 * 4. Test refund flow in Stripe test mode first
 * 5. Monitor Stripe dashboard for successful refunds
 */
export async function cancelBookingWithRefund(
  bookingId: string,
  reason?: string,
  shouldRefund: boolean = true
): Promise<ITrainingBooking> {
  await dbConnect();

  // Get booking with populated training
  const booking = await TrainingBooking.findById(bookingId);

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.bookingStatus === 'cancelled') {
    throw new Error('Booking is already cancelled');
  }

  // Check if training date is in the future
  const training = await Training.findById(booking.trainingId);
  if (!training) {
    throw new Error('Training not found');
  }

  if (new Date(training.date) < new Date()) {
    throw new Error('Cannot cancel booking for past training');
  }

  // Process Stripe refund if payment was successful and refund is requested
  if (
    shouldRefund &&
    booking.paymentStatus === 'paid' &&
    booking.stripeSessionId
  ) {
    try {
      // TODO: PRODUCTION - Uncomment this block for Stripe refund integration
      /*
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-11-20.acacia',
      });

      // Get the payment intent from the checkout session
      const session = await stripe.checkout.sessions.retrieve(
        booking.stripeSessionId
      );

      if (session.payment_intent && typeof session.payment_intent === 'string') {
        // Create refund
        const refund = await stripe.refunds.create({
          payment_intent: session.payment_intent,
          reason: 'requested_by_customer',
          metadata: {
            bookingId: bookingId,
            trainingId: String(training._id),
            cancellationReason: reason || 'No reason provided',
          },
        });

        console.log('✅ Stripe refund created:', refund.id);

        // Update payment status to refunded
        booking.paymentStatus = 'refunded';
      }
      */

      // DEVELOPMENT MODE: Simulate refund without calling Stripe
      console.log('⚠️ DEV MODE: Simulating Stripe refund (not actually processed)');
      console.log('Booking ID:', bookingId);
      console.log('Stripe Session ID:', booking.stripeSessionId);
      console.log('Amount to refund:', booking.paymentAmount);

      // In dev mode, just update status
      booking.paymentStatus = 'refunded';
    } catch (error) {
      console.error('❌ Stripe refund failed:', error);
      throw new Error(
        `Failed to process refund: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // Update booking status
  booking.bookingStatus = 'cancelled';
  booking.cancelledAt = new Date();
  booking.cancellationReason = reason;

  await booking.save();

  // Decrement training participants count
  if (training.currentParticipants > 0) {
    await (training as any).decrementParticipants();
  }

  console.log(`✅ Booking ${bookingId} cancelled successfully`);

  return booking.toObject() as ITrainingBooking;
}

/**
 * Update admin notes for a booking
 * @param bookingId - Booking ID
 * @param notes - Admin notes
 */
export async function updateBookingNotes(
  bookingId: string,
  notes: string
): Promise<ITrainingBooking> {
  await dbConnect();

  const booking = await TrainingBooking.findByIdAndUpdate(
    bookingId,
    { adminNotes: notes },
    { new: true, runValidators: true }
  ).lean();

  if (!booking) {
    throw new Error('Booking not found');
  }

  return booking as ITrainingBooking;
}

/**
 * Manual payment status override (for edge cases)
 * @param bookingId - Booking ID
 * @param paymentStatus - New payment status
 * @param adminNote - Optional note explaining the override
 */
export async function updateBookingPaymentStatus(
  bookingId: string,
  paymentStatus: BookingPaymentStatus,
  adminNote?: string
): Promise<ITrainingBooking> {
  await dbConnect();

  const booking = await TrainingBooking.findById(bookingId);

  if (!booking) {
    throw new Error('Booking not found');
  }

  const previousStatus = booking.paymentStatus;
  booking.paymentStatus = paymentStatus;

  // Append to admin notes
  const statusChangeNote = `Payment status changed: ${previousStatus} → ${paymentStatus}${adminNote ? ` (${adminNote})` : ''} - ${new Date().toLocaleString('pl-PL')}`;

  booking.adminNotes = booking.adminNotes
    ? `${booking.adminNotes}\n${statusChangeNote}`
    : statusChangeNote;

  await booking.save();

  console.log(`✅ Booking ${bookingId} payment status updated to ${paymentStatus}`);

  return booking.toObject() as ITrainingBooking;
}

/**
 * Get bookings for a specific training
 * @param trainingId - Training ID
 */
export async function getBookingsForTraining(
  trainingId: string
): Promise<ITrainingBooking[]> {
  await dbConnect();

  const bookings = await TrainingBooking.find({ trainingId })
    .sort({ createdAt: -1 })
    .lean();

  return bookings as ITrainingBooking[];
}
