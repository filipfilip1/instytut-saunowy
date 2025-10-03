import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  image?: string;
  emailVerified?: Date | null;
  role: 'customer' | 'admin';
  addresses?: Array<{
    street: string;
    city: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }>;
  orders?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: String,
    image: String,
    emailVerified: Date,
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    addresses: [
      {
        street: String,
        city: String,
        zipCode: String,
        country: String,
        isDefault: Boolean,
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    timestamps: true,
  }
);


const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
