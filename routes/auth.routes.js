import express from 'express';
import { login } from '../controllers/AuthController.js';

const router = express.Router();

// Ruta de login
router.post('/login', login);

export default router;
