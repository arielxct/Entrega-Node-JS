import express from 'express';
import { getProducts, getProduct, createProduct, updateStock, deleteProduct } from '../controllers/ProductController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/api/products', authMiddleware, getProducts);
router.get('/api/products/:id', authMiddleware, getProduct);
router.post('/api/products/create', authMiddleware, createProduct);
router.put('/api/products/:id/stock', authMiddleware, updateStock);
router.delete('/api/products/:id', authMiddleware, deleteProduct);

export default router;
