import {
  findAllProducts,
  findProductById,
  createProductModel,
  deleteProductModel,
  updateProductModel,
} from "../models/product.model.js";

// Servicio: obtener todos los productos
export const getAllProductsService = async () => {
  const products = await findAllProducts();
  return products;
};

// Servicio: obtener un producto por ID
export const getProductByIdService = async (id) => {
  const product = await findProductById(id);
  return product;
};

// Servicio: crear un nuevo producto
export const createProductService = async (productData) => {
  const newProduct = await createProductModel(productData);
  return newProduct;
};

// Servicio: eliminar producto por ID
export const deleteProductService = async (id) => {
  const deleted = await deleteProductModel(id);
  return deleted;
};

// Servicio: actualizar producto por ID
export const updateProductService = async (id, productData) => {
  const updated = await updateProductModel(id, productData);
  return updated;
};
