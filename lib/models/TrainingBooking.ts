import mongoose, { Schema, Model } from 'mongoose';
import { ITrainingBooking } from '@/types';

const TrainingBookingSchema = new Schema<ITrainingBooking>(
  {
    trainingId: {
      type: String,
      required: [true, 'Training ID jest wymagane'],
    },

    userId: {
      type: String,
      required: false,
    },

    guestEmail: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },

    participantInfo: {
      name: {
        type: String,
        required: [true, 'Imię jest wymagane'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email jest wymagany'],
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Telefon jest wymagany'],
        trim: true,
      },
      experience: {
        type: String,
        trim: true,
      },
      specialRequirements: {
        type: String,
        trim: true,
      },
    },

    stripeSessionId: {
      type: String,
      required: [true, 'Stripe Session ID jest wymagane'],
      unique: true,
      sparse: true,
    },

    paymentAmount: {
      type: Number,
      required: [true, 'Kwota płatności jest wymagana'],
      min: [0, 'Kwota płatności nie może być ujemna'],
    },

    paymentType: {
      type: String,
      enum: ['full', 'deposit'],
      required: [true, 'Typ płatności jest wymagany'],
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },

    bookingStatus: {
      type: String,
      enum: ['confirmed', 'cancelled', 'pending_approval'],
      default: 'confirmed',
    },

    cancelledAt: {
      type: Date,
    },

    cancellationReason: {
      type: String,
      trim: true,
    },

    adminNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
TrainingBookingSchema.index({ trainingId: 1, bookingStatus: 1 });
TrainingBookingSchema.index({ userId: 1, createdAt: -1 });
TrainingBookingSchema.index({ guestEmail: 1, createdAt: -1 });
TrainingBookingSchema.index({ stripeSessionId: 1 });
TrainingBookingSchema.index({ paymentStatus: 1 });

// Validation - userId or guestEmail must be present
TrainingBookingSchema.pre('save', function(next) {
  if (!this.userId && !this.guestEmail) {
    next(new Error('Booking musi mieć userId lub guestEmail'));
  } else {
    next();
  }
});

// Static method: find by training
TrainingBookingSchema.statics.findByTraining = function(trainingId: string) {
  return this.find({ trainingId, bookingStatus: { $ne: 'cancelled' } });
};

// Static method: find by user
TrainingBookingSchema.statics.findByUser = function(userId: string) {
  return this.find({ userId, bookingStatus: { $ne: 'cancelled' } }).sort({ createdAt: -1 });
};

// Static method: find by guest email
TrainingBookingSchema.statics.findByGuestEmail = function(email: string) {
  return this.find({ guestEmail: email.toLowerCase(), bookingStatus: { $ne: 'cancelled' } }).sort({ createdAt: -1 });
};

// Static method: count confirmed bookings for a training
TrainingBookingSchema.statics.countConfirmedForTraining = function(trainingId: string) {
  return this.countDocuments({
    trainingId,
    bookingStatus: 'confirmed',
    paymentStatus: 'paid',
  });
};

// Instance method: cancel booking
TrainingBookingSchema.methods.cancel = function(reason?: string) {
  this.bookingStatus = 'cancelled';
  this.cancelledAt = new Date();
  if (reason) {
    this.cancellationReason = reason;
  }
  return this.save();
};

const TrainingBooking: Model<ITrainingBooking> =
  mongoose.models.TrainingBooking || mongoose.model<ITrainingBooking>('TrainingBooking', TrainingBookingSchema);

export default TrainingBooking;