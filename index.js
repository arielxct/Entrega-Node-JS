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

// Ruta de salud de la API
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    api: 'Ejercicio-14'
  });
});

// Rutas API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

// Middleware global de errores
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: 'Error interno del servidor'
  });
});

// Servidor local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Exportar para Vercel
export default app;
