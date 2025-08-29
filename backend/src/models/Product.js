import mongoose from 'mongoose';
import slugify from 'slugify';

// Schema for individual variant option (e.g., size S, color red)
const variantOptionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  priceModifier: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stan magazynowy nie może być ujemny']
  },
  image: String
}, { _id: false });

// Schema for product variant (e.g., "Size" with options S, M, L)
const productVariantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  options: [variantOptionSchema]
}, { _id: false });

// Schema for product images with variant association support
const productImageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  variantId: String
}, { _id: false });

const productSchema = new mongoose.Schema({
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
    enum: {
      values: ['kilty', 'poncha', 'spodnie', 'bluzy', 'akcesoria', 'zestawy'],
      message: 'Nieprawidłowa kategoria'
    }
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
  images: {
    type: [productImageSchema],
    validate: {
      validator: function (images) {
        return images && images.length > 0;
      },
      message: 'Produkt musi mieć przynajmniej jedno zdjęcie'
    }
  },
  variants: {
    type: [productVariantSchema],
    default: []
  },
  features: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  // SEO
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  // Statistics
  stats: {
    views: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// Virtual: Check if product is available (active and has stock)
productSchema.virtual('isAvailable').get(function () {
  if (!this.isActive) return false;

  return this.variants.some(variant =>
    variant.options.some(option => option.stock > 0)
  );
});

// Virtual: Calculate total stock across all variant options
productSchema.virtual('totalStock').get(function () {
  return this.variants.reduce((total, variant) => {
    return total + variant.options.reduce((variantTotal, option) => {
      return variantTotal + option.stock;
    }, 0);
  }, 0);
});

// Virtual: Calculate price range considering variant modifiers
productSchema.virtual('priceRange').get(function () {
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
})

// Pre-save hook: Generate URL-friendly slug from product name
productSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next;

  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
    locale: 'pl'
  })

  next();
});

// Pre-save hook: Auto-generate SEO metadata if not provided
productSchema.pre('save', function (next) {
  if (!this.seo) this.seo = {};
  if (!this.seo.metaTitle) {
    this.seo.metaTitle = `${this.name} - Instytut Saunowy`;
  }
  if (!this.seo.metaDescription) {
    this.seo.metaDescription = this.description.substring(0, 160);
  }
  next();
});

productSchema.methods.incrementViews = async function () {
  this.stats.views += 1;
  // Use updateOne to avoid pre-save hooks that might cause infinite loops
  await this.constructor.updateOne(
    { _id: this._id },
    { $inc: { 'stats.views': 1 } }
  );
}

productSchema.methods.updateStock = async function (variantId, optionId, quantity) {
  const variant = this.variants.find(v => v.id === variantId);
  if (!variant) throw new Error('Wariant nie znaleziony');

  const option = variant.options.find(o => o.id === optionId);
  if (!option) throw new Error('Opcja nie znaleziona');

  option.stock = quantity;
  await this.save();
}

productSchema.statics.findBySlug = async function (slug) {
  return this.findOne({ slug, isActive: true });
};

productSchema.statics.findByCategory = async function (category, options = {}) {
  const query = { category, isActive: true };
  return this.find(query)
    .sort(options.sort || '-createdAt')
    .limit(options.limit || 20)
    .skip(options.skip || 0);
};

const Product = mongoose.model('Product', productSchema);

export default Product;