import express from "express";
import jwt from "jsonwebtoken";
import db from "../firebase.js";

const router = express.Router();

// Ruta de login con logs de depuración
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request recibido:", email);

  try {
    // Buscar usuario en Firestore
    const snapshot = await db.collection("users").where("email", "==", email).get();

    if (snapshot.empty) {
      console.error("Usuario no encontrado:", email);
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const userData = snapshot.docs[0].data();
    console.log("Datos de usuario encontrados:", userData);

    // Validar contraseña (ejemplo simple, sin hash)
    if (userData.password !== password) {
      console.error("Contraseña incorrecta para:", email);
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    console.log("Token generado correctamente para:", email);

    return res.json({ token });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ error: "Error interno" });
  }
});

export default router;
