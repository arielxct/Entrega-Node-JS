import db from '../config/firebase.js';

class ProductModel {
  static async getAll() {
    const snapshot = await db.collection('products').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id) {
    const doc = await db.collection('products').doc(id.toString()).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  static async add(product) {
    const ref = await db.collection('products').add(product);
    const newDoc = await ref.get();
    return { id: newDoc.id, ...newDoc.data() };
  }

  static async updateStock(id, newStock) {
    const ref = db.collection('products').doc(id.toString());
    const doc = await ref.get();
    if (!doc.exists) return null;

    await ref.update({ stock: newStock });
    const updatedDoc = await ref.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }

  static async deleteById(id) {
    const ref = db.collection('products').doc(id.toString());
    const doc = await ref.get();
    if (!doc.exists) return null;

    await ref.delete();
    return { id: doc.id, ...doc.data() };
  }
}

export default ProductModel;
