import mongoose, { Schema, Document } from 'mongoose';

export interface ITrainingBooking extends Document {
  // Training reference
  trainingId: mongoose.Types.ObjectId;

  // User (optional - can be guest)
  userId?: mongoose.Types.ObjectId;
  guestEmail?: string;

  // Participant information
  participantInfo: {
    name: string;
    email: string;
    phone: string;
    experience?: string; // previous sauna/aufguss experience
    specialRequirements?: string; // dietary, accessibility, etc.
  };

  // Payment
  stripeSessionId: string;
  amount: number;
  depositAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';

  // Booking status
  status: 'confirmed' | 'cancelled' | 'pending_approval'; // pending_approval for manual approval flow (future)

  // Cancellation
  cancelledAt?: Date;
  cancellationReason?: string;

  // Notes
  adminNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const TrainingBookingSchema = new Schema<ITrainingBooking>(
  {
    trainingId: {
      type: Schema.Types.ObjectId,
      ref: 'Training',
      required: [true, 'Training ID jest wymagane'],
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

    amount: {
      type: Number,
      required: [true, 'Kwota jest wymagana'],
      min: [0, 'Kwota nie może być ujemna'],
    },

    depositAmount: {
      type: Number,
      required: [true, 'Kwota wpłaty jest wymagana'],
      min: [0, 'Kwota wpłaty nie może być ujemna'],
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },

    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'pending_approval'],
      default: 'confirmed', // Auto-confirm by default
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
TrainingBookingSchema.index({ trainingId: 1, status: 1 });
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
  return this.find({ trainingId, status: { $ne: 'cancelled' } });
};

// Static method: find by user
TrainingBookingSchema.statics.findByUser = function(userId: string) {
  return this.find({ userId, status: { $ne: 'cancelled' } }).sort({ createdAt: -1 });
};

// Static method: find by guest email
TrainingBookingSchema.statics.findByGuestEmail = function(email: string) {
  return this.find({ guestEmail: email.toLowerCase(), status: { $ne: 'cancelled' } }).sort({ createdAt: -1 });
};

// Static method: count confirmed bookings for a training
TrainingBookingSchema.statics.countConfirmedForTraining = function(trainingId: string) {
  return this.countDocuments({
    trainingId,
    status: 'confirmed',
    paymentStatus: 'paid',
  });
};

// Instance method: cancel booking
TrainingBookingSchema.methods.cancel = function(reason?: string) {
  this.status = 'cancelled';
  this.cancelledAt = new Date();
  if (reason) {
    this.cancellationReason = reason;
  }
  return this.save();
};

const TrainingBooking = mongoose.models.TrainingBooking ||
  mongoose.model<ITrainingBooking>('TrainingBooking', TrainingBookingSchema);

export default TrainingBooking;
