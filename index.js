import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import productRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Log para verificar que Vercel recibe las peticiones
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API funcionando correctamente'
  });
});

// Ruta de prueba independiente
app.get('/test', (req, res) => {
  res.json({
    ok: true,
    message: 'Ruta de prueba funcionando'
  });
});

// Registrar rutas API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba específica de auth
app.post('/api/auth/prueba', (req, res) => {
  res.json({
    ok: true,
    message: 'Ruta auth funcionando',
    body: req.body
  });
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
    metodo: req.method,
    ruta: req.originalUrl
  });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error('ERROR:', err);

  res.status(500).json({
    message: 'Error interno del servidor',
    error: err.message
  });
});

// Servidor local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Export para Vercel
export default app;
