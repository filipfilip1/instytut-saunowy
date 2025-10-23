import mongoose, { Schema, Model, Document } from 'mongoose';
import slugify from 'slugify';
import { IProduct, IProductVariant, IVariantOption } from '@/types';

export interface IProductDocument extends Omit<IProduct, '_id'>, Document {
  incrementViews(): Promise<void>;
  updateStock(variantId: string, optionId: string, quantity: number): Promise<void>;
}

interface IProductModel extends Model<IProductDocument> {
  findBySlug(slug: string): Promise<IProductDocument | null>;
  findByCategory(
    category: string,
    options?: {
      sort?: string;
      limit?: number;
      skip?: number;
    }
  ): Promise<IProductDocument[]>;
}


const variantOptionSchema = new Schema<IVariantOption>({
  id: String,
  value: String,
  priceModifier: { type: Number, default: 0 },
  stock: Number,
  image: String
}, { _id: false });

const productVariantSchema = new Schema<IProductVariant>({
  id: String,
  name: String,
  options: [variantOptionSchema]
}, { _id: false });

const productSchema = new Schema<IProductDocument>({
  name: {
    type: String,
    required: [true, 'Nazwa produktu jest wymagana'],
    trim: true,
    maxLength: [100, 'Nazwa nie może przekraczać 100 znaków']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Kategoria jest wymagana'],
    enum: ['kilty', 'poncha', 'spodnie', 'bluzy', 'akcesoria', 'zestawy', 'pareo', 'kimona', 'spodnice', 'topy']
  },
  description: {
    type: String,
    required: [true, 'Opis produktu jest wymagany'],
    maxLength: [2000, 'Opis nie może przekraczać 2000 znaków']
  },
  basePrice: {
    type: Number,
    required: [true, 'Cena jest wymagana'],
    min: [0, 'Cena nie może być ujemna']
  },
  images: [{
    id: String,
    url: String,
    alt: String,
    isPrimary: Boolean,
    variantId: String,
    cloudinaryPublicId: String  // Required for removal from Cloudinary
  }],
  variants: [productVariantSchema],
  features: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  stats: {
    views: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// Virtuals
productSchema.virtual('isAvailable').get(function (this: IProductDocument) {
  if (!this.isActive) return false;
  return this.variants.some(variant =>
    variant.options.some(option => option.stock > 0)
  );
});

productSchema.virtual('totalStock').get(function (this: IProductDocument) {
  return this.variants.reduce((total, variant) => {
    return total + variant.options.reduce((variantTotal, option) => {
      return variantTotal + option.stock;
    }, 0);
  }, 0);
});

productSchema.virtual('priceRange').get(function (this: IProductDocument) {
  let minPrice = this.basePrice;
  let maxPrice = this.basePrice;

  this.variants.forEach(variant => {
    variant.options.forEach(option => {
      const price = this.basePrice + (option.priceModifier || 0);
      minPrice = Math.min(price, minPrice);
      maxPrice = Math.max(price, maxPrice);
    });
  });

  return { min: minPrice, max: maxPrice };
});

// Pre-save hooks
productSchema.pre('save', function (this: IProductDocument, next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
    locale: 'pl'
  });
  next();
});

productSchema.pre('save', function (this: IProductDocument, next) {
  if (!this.seo) this.seo = {};
  if (!this.seo.metaTitle) {
    this.seo.metaTitle = `${this.name} - Instytut Saunowy`;
  }
  if (!this.seo.metaDescription) {
    this.seo.metaDescription = this.description.substring(0, 160);
  }
  next();
});

// Methods
productSchema.methods.incrementViews = async function (this: IProductDocument) {

  await Product.updateOne(
    { _id: this._id },
    { $inc: { 'stats.views': 1 } }
  );
};

productSchema.methods.updateStock = async function (
  this: IProductDocument,
  variantId: string,
  optionId: string,
  quantity: number
) {
  const variant = this.variants.find(v => v.id === variantId);
  if (!variant) throw new Error('Wariant nie znaleziony');

  const option = variant.options.find(o => o.id === optionId);
  if (!option) throw new Error('Opcja nie znaleziona');

  option.stock = quantity;
  await this.save();
};

// Static methods
productSchema.statics.findBySlug = async function (slug: string) {
  return this.findOne({ slug, isActive: true });
};

productSchema.statics.findByCategory = async function (
  category: string,
  options = {}
) {
  const query = { category, isActive: true };
  return this.find(query)
    .sort(options.sort || '-createdAt')
    .limit(options.limit || 20)
    .skip(options.skip || 0);
};

// Indexes
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ name: 'text', description: 'text' });

const Product = (mongoose.models.Product ||
  mongoose.model<IProductDocument, IProductModel>('Product', productSchema)) as IProductModel;

export default Product;