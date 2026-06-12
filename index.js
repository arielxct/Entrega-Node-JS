import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());



// Inicializar Firebase Admin con variables de entorno
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Importante: reemplazar los saltos de línea escapados en la clave privada
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

const db = admin.firestore();

// Ruta GET: obtener usuarios
app.get("/api/users", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    console.error("Error en GET /api/users:", error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta POST: crear usuario
app.post("/api/users/create", async (req, res) => {
  try {
    const user = req.body;
    await db.collection("users").doc(user.id.toString()).set(user);
    res.json({ message: "Usuario agregado", user });
  } catch (error) {
    console.error("Error en POST /api/users/create:", error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta POST: login con JWT
app.post("/api/login", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Falta username" });
  }
  try {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Error en POST /api/login:", error);
    res.status(500).json({ error: error.message });
  }
});

// Exportar la app para Vercel en modo ES Modules
// Al final de tu index.js
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Exportar para Vercel
export default app;


