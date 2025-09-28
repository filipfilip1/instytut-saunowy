import { Response, NextFunction } from 'express';
import Product from '../models/Product.js';
import {
  TypedRequest,
  ApiResponse,
  PaginatedResponse,
  IProduct
} from '../types/index.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (
  req: TypedRequest,
  res: Response<PaginatedResponse<IProduct>>,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      category,
      sort = '-createdAt',
      limit = '20',
      page = '1',
      search
    } = req.query;

    const query: any = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .sort(sort)
      .limit(limitNum)
      .skip(skip)
      .select('-__v');

    const total = await Product.countDocuments(query);

    res.json({
      status: 'success',
      results: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (
  req: TypedRequest,
  res: Response<ApiResponse<IProduct>>,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      throw new NotFoundError('Produkt nie został znaleziony');
    }

    await product.incrementViews();

    res.json({
      status: 'success',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
export const getProductBySlug = async (
  req: TypedRequest,
  res: Response<ApiResponse<IProduct>>,
  next: NextFunction
): Promise<void> => {
  try {

    const product = await Product.findBySlug(req.params.slug);

    if (!product) {
      throw new NotFoundError('Produkt nie został znaleziony');
    }

    await product.incrementViews();

    res.json({
      status: 'success',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductByCategory = async (
  req: TypedRequest,
  res: Response<PaginatedResponse<IProduct>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { category } = req.params;
    const { sort, limit = '20', page = '1' } = req.query;

    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.findByCategory(category, {
      sort,
      limit: limitNum,
      skip
    });

    const total = await Product.countDocuments({
      category,
      isActive: true
    });

    res.json({
      status: 'success',
      results: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (
  req: TypedRequest<IProduct>,
  res: Response<ApiResponse<IProduct>>,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (
  req: TypedRequest<Partial<IProduct>>,
  res: Response<ApiResponse<IProduct>>,
  next: NextFunction
): Promise<void> => {
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
      throw new NotFoundError('Produkt nie został znaleziony');
    }

    res.json({
      status: 'success',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (soft delete)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (
  req: TypedRequest,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError('Produkt nie został znaleziony');
    }

    product.isActive = false;
    await product.save();

    res.json({
      status: 'success',
      message: 'Produkt został usunięty'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update stock level
// @route   PATCH /api/products/:id/stock
// @access  Private/Admin
export const updateStock = async (
  req: TypedRequest<{
    variantId: string;
    optionId: string;
    quantity: number;
  }>,
  res: Response<ApiResponse<IProduct>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { variantId, optionId, quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError('Produkt nie został znaleziony');
    }

    await product.updateStock(variantId, optionId, quantity);

    res.json({
      status: 'success',
      message: 'Stan magazynowy zaktualizowany',
      data: product
    });
  } catch (error) {
    next(error);
  }
};