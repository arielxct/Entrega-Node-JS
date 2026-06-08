import express from 'express';
import { getUsers, getUser, createUser, deleteUser } from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // ojo: carpeta singular

const router = express.Router();

// Rutas protegidas
router.get('/api/users', authMiddleware, getUsers);
router.get('/api/users/:id', authMiddleware, getUser);
router.post('/api/users/create', authMiddleware, createUser);
router.delete('/api/users/:id', authMiddleware, deleteUser);

export default router;   // 👈 Esto es lo que faltaba
