import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Verificación de variables de entorno (para debug en Vercel)
console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log(
  "FIREBASE_PRIVATE_KEY:",
  process.env.FIREBASE_PRIVATE_KEY
    ? "Cargada correctamente"
    : "MISSING"
);

// Inicializar Firebase Admin SDK solo una vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Reemplaza los saltos de línea escapados (\n) por saltos reales
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// Exportar la referencia a Firestore
const db = admin.firestore();
export default db;

