import { Router } from 'express';
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock
} from '../controllers/productController.js';
import {
  validateObjectId,
  validateCategory,
  validateProductData
} from '../middleware/validation.js'

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/id/:id', validateObjectId('id'), getProductById);
router.get('/slug/:slug', getProductBySlug);
router.get('/category/:category', validateCategory, getProductByCategory);

// Admin routes (TODO: add authorization middleware)
router.post('/', validateProductData, createProduct);
router.put('/:id', validateObjectId('id'), updateProduct);
router.delete('/:id', validateObjectId('id'), deleteProduct);
router.patch('/:id/stock', validateObjectId('id'), updateStock);

export default router;