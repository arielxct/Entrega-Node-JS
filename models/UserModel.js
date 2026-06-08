import db from '../config/firebase.js';

class UserModel {
  static async getAll() {
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id) {
    const doc = await db.collection('users').doc(id.toString()).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  static async add(user) {
    const ref = await db.collection('users').add(user);
    const newDoc = await ref.get();
    return { id: newDoc.id, ...newDoc.data() };
  }

  static async deleteById(id) {
    const ref = db.collection('users').doc(id.toString());
    const doc = await ref.get();
    if (!doc.exists) return null;

    await ref.delete();
    return { id: doc.id, ...doc.data() };
  }
}

export default UserModel;

