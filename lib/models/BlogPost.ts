import mongoose, { Schema, Model } from 'mongoose';

export interface IBlogPost extends mongoose.Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredImage: {
    url: string;
    alt?: string;
  };
  category: 'poradniki' | 'trendy' | 'diy' | 'szkolenia' | 'zdrowie' | 'przepisy';
  tags: string[];
  readTime: number; // in minutes
  publishedAt: Date;
  isPublished: boolean;
  viewCount: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, 'Tytuł jest wymagany'],
      trim: true,
      maxlength: [200, 'Tytuł nie może być dłuższy niż 200 znaków'],
    },
    slug: {
      type: String,
      required: [true, 'Slug jest wymagany'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt jest wymagany'],
      trim: true,
      maxlength: [500, 'Excerpt nie może być dłuższy niż 500 znaków'],
    },
    content: {
      type: String,
      required: [true, 'Treść jest wymagana'],
    },
    author: {
      name: {
        type: String,
        required: [true, 'Imię autora jest wymagane'],
      },
      role: {
        type: String,
        default: 'Autor',
      },
      avatar: String,
    },
    featuredImage: {
      url: {
        type: String,
        required: [true, 'Featured image URL jest wymagany'],
      },
      alt: String,
    },
    category: {
      type: String,
      required: [true, 'Kategoria jest wymagana'],
      enum: {
        values: ['poradniki', 'trendy', 'diy', 'szkolenia', 'zdrowie', 'przepisy'],
        message: '{VALUE} nie jest wspieraną kategorią',
      },
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    readTime: {
      type: Number,
      required: [true, 'Czas czytania jest wymagany'],
      min: [1, 'Czas czytania musi być większy niż 0'],
    },
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    seo: {
      metaTitle: {
        type: String,
        maxlength: [70, 'Meta title nie może być dłuższy niż 70 znaków'],
      },
      metaDescription: {
        type: String,
        maxlength: [160, 'Meta description nie może być dłuższy niż 160 znaków'],
      },
      keywords: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
BlogPostSchema.index({ title: 'text', excerpt: 'text', content: 'text' });
BlogPostSchema.index({ publishedAt: -1 });
BlogPostSchema.index({ category: 1, isPublished: 1 });

// Static method to find by slug
BlogPostSchema.statics.findBySlug = function (slug: string) {
  return this.findOne({ slug, isPublished: true });
};

// Instance method to increment view count
BlogPostSchema.methods.incrementViews = function () {
  this.viewCount += 1;
  return this.save();
};

// Virtual for formatted date
BlogPostSchema.virtual('formattedDate').get(function () {
  return this.publishedAt.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

// Re-export category labels from constants for backward compatibility
export { CATEGORY_LABELS } from '@/lib/constants/blog';

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
