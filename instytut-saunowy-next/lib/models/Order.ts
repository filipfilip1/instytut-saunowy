import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  // For logged-in users
  userId?: mongoose.Types.ObjectId;

  // For guests
  guestEmail?: string;

  // Common
  items: Array<{
    productId: string;
    productName: string;
    variantSelections: Record<string, string>;
    quantity: number;
    pricePerItem: number;
  }>;

  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };

  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  trackingNumber?: string;

  createdAt: Date;
  updatedAt: Date;
}

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
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
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
