import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateStock,
  deleteProduct
} from '../controllers/ProductController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Listar todos los productos
router.get('/', authMiddleware, getProducts);

// Obtener producto por ID
router.get('/:id', authMiddleware, getProduct);

// Crear producto
router.post('/create', authMiddleware, createProduct);

// Actualizar stock de un producto
router.put('/:id/stock', authMiddleware, updateStock);

// Eliminar producto
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
