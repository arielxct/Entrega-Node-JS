import express from 'express';
import { login } from '../controllers/AuthController.js';

const router = express.Router();

// Ruta de login
router.post('/auth/login', login);

export default router;
