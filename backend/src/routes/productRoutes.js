import express from 'express';
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

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/id/:id', getProductById);
router.get('/slug/:slug', getProductBySlug);
router.get('/category/:category', getProductByCategory);

// Admin routes
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/stock', updateStock);

export default router;