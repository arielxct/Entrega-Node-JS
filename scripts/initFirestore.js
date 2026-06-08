const fs = require("fs");
const path = require("path");
const db = require("../config/firebase");

// Rutas de los archivos JSON locales
const productsFile = path.join(__dirname, "../data/products.json");
const usersFile = path.join(__dirname, "../data/users.json");

async function importProducts() {
  const products = JSON.parse(fs.readFileSync(productsFile, "utf8"));
  for (const product of products) {
    if (product) {
      await db.collection("products").doc(product.id.toString()).set(product);
      console.log(`Producto importado: ${product.name}`);
    }
  }
}

async function importUsers() {
  const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
  for (const user of users) {
    if (user) {
      await db.collection("users").doc(user.id.toString()).set(user);
      console.log(`Usuario importado: ${user.name}`);
    }
  }
}

async function main() {
  try {
    console.log("Iniciando importación a Firestore...");
    await importProducts();
    await importUsers();
    console.log("✅ Importación completada con éxito.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en la importación:", error);
    process.exit(1);
  }
}

main();
