import ProductService from '../services/ProductService.js';

export const getProducts = async (req, res) => {
  const products = await ProductService.getProducts();
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await ProductService.getProduct(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
};

export const createProduct = async (req, res) => {
  const newProduct = await ProductService.createProduct(req.body);
  res.status(201).json(newProduct);
};

export const updateStock = async (req, res) => {
  const updated = await ProductService.updateProductStock(req.params.id, req.body.stock);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
};

export const deleteProduct = async (req, res) => {
  const deleted = await ProductService.deleteProduct(req.params.id);
  if (deleted) {
    res.json({ message: 'Producto eliminado', producto: deleted });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
};
