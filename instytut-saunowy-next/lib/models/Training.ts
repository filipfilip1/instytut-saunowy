import mongoose, { Schema, Document } from 'mongoose';

export interface ITraining extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;

  // Schedule
  date: Date;
  duration: number; // in hours

  // Location
  location: {
    venue: string;
    address: string;
    city: string;
    mapUrl?: string;
  };

  // Pricing
  price: number;
  depositPercentage: number; // 100 = full payment, 30 = 30% deposit, etc.

  // Capacity
  maxParticipants: number;
  currentParticipants: number;

  // Classification
  category: 'podstawowy' | 'zaawansowany' | 'master' | 'indywidualny';
  level: 'beginner' | 'intermediate' | 'advanced';

  // Details
  requirements?: string[];
  whatYouLearn: string[];
  agenda?: {
    time: string;
    title: string;
    description: string;
  }[];

  // Instructor
  instructor: {
    name: string;
    bio?: string;
    avatar?: string;
  };

  // Media
  images: {
    url: string;
    alt?: string;
  }[];
  featuredImage?: {
    url: string;
    alt?: string;
  };

  // Status
  status: 'draft' | 'published' | 'cancelled' | 'completed';

  // SEO
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  createdAt: Date;
  updatedAt: Date;
}

const TrainingSchema = new Schema<ITraining>(
  {
    name: {
      type: String,
      required: [true, 'Nazwa szkolenia jest wymagana'],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, 'Slug jest wymagany'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Opis jest wymagany'],
    },

    shortDescription: {
      type: String,
      maxlength: 300,
    },

    date: {
      type: Date,
      required: [true, 'Data jest wymagana'],
    },

    duration: {
      type: Number,
      required: [true, 'Czas trwania jest wymagany'],
      min: [1, 'Czas trwania musi być co najmniej 1 godzina'],
    },

    location: {
      venue: {
        type: String,
        required: [true, 'Miejsce jest wymagane'],
      },
      address: {
        type: String,
        required: [true, 'Adres jest wymagany'],
      },
      city: {
        type: String,
        required: [true, 'Miasto jest wymagane'],
      },
      mapUrl: String,
    },

    price: {
      type: Number,
      required: [true, 'Cena jest wymagana'],
      min: [0, 'Cena nie może być ujemna'],
    },

    depositPercentage: {
      type: Number,
      default: 100,
      min: [1, 'Procent wpłaty musi być co najmniej 1%'],
      max: [100, 'Procent wpłaty nie może przekraczać 100%'],
    },

    maxParticipants: {
      type: Number,
      required: [true, 'Maksymalna liczba uczestników jest wymagana'],
      min: [1, 'Musi być co najmniej 1 uczestnik'],
      default: 10,
    },

    currentParticipants: {
      type: Number,
      default: 0,
      min: 0,
    },

    category: {
      type: String,
      enum: ['podstawowy', 'zaawansowany', 'master', 'indywidualny'],
      required: [true, 'Kategoria jest wymagana'],
    },

    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: [true, 'Poziom jest wymagany'],
    },

    requirements: [String],

    whatYouLearn: {
      type: [String],
      required: [true, 'Lista czego się nauczą jest wymagana'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'Musi być co najmniej jeden element w "Czego się nauczysz"',
      },
    },

    agenda: [
      {
        time: String,
        title: String,
        description: String,
      },
    ],

    instructor: {
      name: {
        type: String,
        required: [true, 'Imię instruktora jest wymagane'],
      },
      bio: String,
      avatar: String,
    },

    images: [
      {
        url: String,
        alt: String,
      },
    ],

    featuredImage: {
      url: String,
      alt: String,
    },

    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'completed'],
      default: 'draft',
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
TrainingSchema.index({ slug: 1 });
TrainingSchema.index({ date: 1, status: 1 });
TrainingSchema.index({ category: 1, status: 1 });
TrainingSchema.index({ status: 1, date: 1 });

// Virtual property: available spots
TrainingSchema.virtual('availableSpots').get(function() {
  return this.maxParticipants - this.currentParticipants;
});

// Virtual property: is full
TrainingSchema.virtual('isFull').get(function() {
  return this.currentParticipants >= this.maxParticipants;
});

// Virtual property: is almost full (less than 5 spots OR more than 50% full)
TrainingSchema.virtual('isAlmostFull').get(function() {
  const spotsLeft = this.maxParticipants - this.currentParticipants;
  const percentFull = (this.currentParticipants / this.maxParticipants) * 100;
  return spotsLeft < 5 || percentFull > 50;
});

// Virtual property: show available spots (only when almost full)
TrainingSchema.virtual('shouldShowAvailability').get(function() {
  return this.isAlmostFull;
});

// Virtual property: deposit amount
TrainingSchema.virtual('depositAmount').get(function() {
  return (this.price * this.depositPercentage) / 100;
});

// Ensure virtuals are included in JSON
TrainingSchema.set('toJSON', { virtuals: true });
TrainingSchema.set('toObject', { virtuals: true });

// Static method: find by slug
TrainingSchema.statics.findBySlug = function(slug: string) {
  return this.findOne({ slug, status: 'published' });
};

// Static method: find upcoming trainings
TrainingSchema.statics.findUpcoming = function(limit?: number) {
  const query = this.find({
    status: 'published',
    date: { $gte: new Date() },
  }).sort({ date: 1 });

  if (limit) {
    query.limit(limit);
  }

  return query;
};

// Static method: find by category
TrainingSchema.statics.findByCategory = function(category: string) {
  return this.find({
    status: 'published',
    category,
    date: { $gte: new Date() },
  }).sort({ date: 1 });
};

// Instance method: increment participants
TrainingSchema.methods.incrementParticipants = function(count = 1) {
  if (this.currentParticipants + count > this.maxParticipants) {
    throw new Error('Brak wolnych miejsc');
  }
  this.currentParticipants += count;
  return this.save();
};

// Instance method: decrement participants (for cancellations)
TrainingSchema.methods.decrementParticipants = function(count = 1) {
  this.currentParticipants = Math.max(0, this.currentParticipants - count);
  return this.save();
};

// Pre-save hook: validate currentParticipants doesn't exceed max
TrainingSchema.pre('save', function(next) {
  if (this.currentParticipants > this.maxParticipants) {
    next(new Error('Liczba uczestników nie może przekraczać maksymalnej'));
  } else {
    next();
  }
});

const Training = mongoose.models.Training || mongoose.model<ITraining>('Training', TrainingSchema);

export default Training;
