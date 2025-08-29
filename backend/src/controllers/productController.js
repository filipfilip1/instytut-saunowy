import Product from '../models/Product.js';

// @desc Get all products
// @route GET /api/products
// @access Public
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      sort = '-createdAt',
      limit = 20,
      page = 1,
      search
    } = req.query

    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await Product.countDocuments(query);

    res.json({
      status: 'success',
      results: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Błąd podczas pobierania produktów'
    });
  }
};

// @desc Get single product by ID
// @route GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product || !product.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'Produkt nie został znaleziony'
      });
    }

    await product.incrementViews();

    res.json({
      status: 'success',
      data: product
    });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        status: 'error',
        message: 'Nieprawidłowy format ID prouktu'
      });
    }

    console.error('Error in getProductById: ', error);
    res.status(500).json({
      status: 'error',
      message: 'Błąd podczas pobierania produktu'
    });
  }
};

// @desc Get product by slug
// @route GET /api/products/:slug
// @access Public
export const getProductBySlug = async (req, res) => {
  try {
    console.log('🔍 Searching for product with slug:', req.params.slug);
    const product = await Product.findBySlug(req.params.slug);
    console.log('📦 Product found:', product ? 'YES' : 'NO');

    if (!product) {
      console.log('❌ Product not found, returning 404');
      return res.status(404).json({
        status: 'error',
        message: 'Produkt nie został znaleziony'
      });
    }

    console.log('📈 Incrementing views for product:', product.name);
    await product.incrementViews();

    console.log('✅ Sending product response');
    res.json({
      status: 'success',
      data: product
    })

  } catch (error) {
    console.error('❌ Error in getProductBySlug: ', error);
    res.status(500).json({
      status: 'error',
      message: 'Błąd podczas pobierania produktu'
    })
  }
}

// @desc Get products by category
// @route GET /api/products/category/:category
// @access Public
export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { sort, limit = 20, page = 1 } = req.query;

    const skip = (page - 1) * limit;

    const product = await Product.findByCategory(category, {
      sort,
      limit: parseInt(limit),
      page
    });

    const total = await Product.countDocuments({
      category,
      isActive: true
    });

    res.json({
      status: 'success',
      results: product.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: product
    });
  } catch (error) {
    console.error('Error in getProductByCategory:', error);
    res.status(500).json({
      status: 'error',
      message: 'Błąd podczas pobierania produktów'
    });
  }
};

// @desc Create new product
// @route  POST /api/products
// @access Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Błąd walidacji',
        errors
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Produkt o tej nazwie już istnieje'
      });
    }

    console.error('Error in createProduct: ', error);
    res.status(500).json({
      status: 'error',
      message: 'Błąd podczas tworzenia produktu'
    });
  }
};

// @desc Update product
// @route PUT /api/product/:id
// @access Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Produkt nie został znaleziony'
      });
    }

    res.json({
      status: 'success',
      data: product
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Błąd walidacji',
        errors
      });
    }

    console.error('Error in updateProduct: ', error);
    res.status(500).json({
      status: 'error',
      message: 'Błąd podczas aktualizacji produktów'
    });
  }
};

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Produkt nie został znaleziony'
      });
    }

    // Soft delete
    product.isActive = false;
    await product.save();

    res.json({
      status: 'success',
      message: 'Produkt został usunięty'
    });
  } catch (error) {
    console.error('Error in deleteProduct: ', error);
    res.status(500).json({
      status: 'error',
      message: 'Błąd podczas usuwania produktu'
    });
  }
};

// @desc Update stock level
// @route PATCH /api/product/:id/stock
// @access Private/Admin
export const updateStock = async (req, res) => {
  try {
    const { variantId, optionId, quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Produkt nie został znaleziony'
      });
    }

    await product.updateStock(variantId, optionId, quantity);

    res.json({
      status: 'success',
      message: 'Stan magazynowy zaktualizowany',
      data: product
    });
  } catch (error) {
    console.error('Error in updateStock: ', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Błąd podczas aktualizacji stanu magazynowego'
    });
  }
};