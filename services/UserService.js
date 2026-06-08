import UserModel from '../models/UserModel.js';

class UserService {
  static async getUsers() {
    return await UserModel.getAll();
  }

  static async getUser(id) {
    return await UserModel.getById(id);
  }

  static async createUser(user) {
    return await UserModel.add(user);
  }

  static async deleteUser(id) {
    return await UserModel.deleteById(id);
  }
}

export default UserService;   // 👈 Esto es lo que faltaba
