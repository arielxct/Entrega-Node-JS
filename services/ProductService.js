import ProductModel from '../models/ProductModel.js';

class ProductService {
  static async getProducts() {
    return await ProductModel.getAll();
  }

  static async getProduct(id) {
    return await ProductModel.getById(id);
  }

  static async createProduct(product) {
    return await ProductModel.add(product);
  }

  static async updateProductStock(id, stock) {
    return await ProductModel.updateStock(id, stock);
  }

  static async deleteProduct(id) {
    return await ProductModel.deleteById(id);
  }
}

export default ProductService;
