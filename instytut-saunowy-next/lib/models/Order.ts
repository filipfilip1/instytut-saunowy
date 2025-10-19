import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from '@/types';
import { ORDER_STATUSES, PAYMENT_STATUSES } from '@/lib/constants/orderStatuses';

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Optional for guests
    },

    guestEmail: {
      type: String,
      required: false, // Optional for logged-in user
      lowercase: true,
    },

    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        variantSelections: { type: Schema.Types.Mixed },
        quantity: { type: Number, required: true, min: 1 },
        pricePerItem: { type: Number, required: true, min: 0 },
      },
    ],

    shippingAddress: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true, default: 'Polska' },
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'pending',
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: 'pending',
    },

    trackingNumber: String,
  },
  {
    timestamps: true,
  }
);

// Validation - userId or guestEmail
orderSchema.pre('save', function (next) {
  if (!this.userId && !this.guestEmail) {
    next(new Error('Order must have either userId or guestEmail'));
  } else {
    next();
  }
});

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ guestEmail: 1, createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
export default Order;
