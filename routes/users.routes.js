import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  deleteUser
} from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // ojo: carpeta singular

const router = express.Router();

// Listar todos los usuarios
router.get('/', authMiddleware, getUsers);

// Obtener usuario por ID
router.get('/:id', authMiddleware, getUser);

// Crear usuario
router.post('/create', authMiddleware, createUser);

// Eliminar usuario
router.delete('/:id', authMiddleware, deleteUser);

export default router;
