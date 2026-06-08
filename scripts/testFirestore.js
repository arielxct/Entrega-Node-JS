const db = require("./config/firebase");

async function testConnection() {
  try {
    console.log("🔍 Probando conexión a Firestore...");

    // Intentamos leer la colección "users"
    const snapshot = await db.collection("users").get();

    if (snapshot.empty) {
      console.log("⚠️ No hay documentos en la colección 'users'.");
    } else {
      console.log("✅ Documentos encontrados en 'users':");
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
      });
    }
  } catch (error) {
    console.error("❌ Error al conectar con Firestore:", error);
  }
}

testConnection();
