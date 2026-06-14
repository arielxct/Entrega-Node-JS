import ProductService from '../services/ProductService.js';

export const getProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener productos'
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await ProductService.getProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: 'Error al obtener producto'
    });

  }
};

export const createProduct = async (req, res) => {

  try {

    const { nombre, precio } = req.body;

    if (!nombre || precio === undefined) {
      return res.status(400).json({
        message: 'Nombre y precio son obligatorios'
      });
    }

    const newProduct =
      await ProductService.createProduct(req.body);

    res.status(201).json(newProduct);

  } catch (error) {

    res.status(500).json({
      message: 'Error al crear producto'
    });

  }
};

export const updateStock = async (req, res) => {

  try {

    const { stock } = req.body;

    if (stock === undefined) {
      return res.status(400).json({
        message: 'Stock requerido'
      });
    }

    const updated =
      await ProductService.updateProductStock(
        req.params.id,
        stock
      );

    if (!updated) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message: 'Error al actualizar stock'
    });

  }
};

export const deleteProduct = async (req, res) => {

  try {

    const deleted =
      await ProductService.deleteProduct(
        req.params.id
      );

    if (!deleted) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    res.json({
      message: 'Producto eliminado',
      producto: deleted
    });

  } catch (error) {

    res.status(500).json({
      message: 'Error al eliminar producto'
    });

  }
};