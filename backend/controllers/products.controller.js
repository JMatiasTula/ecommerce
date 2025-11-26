import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  deleteProductService,
  updateProductService,
} from "../services/products.service.js";


// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    return res.json(products);
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    return res.status(500).json({
      message: "Error al obtener los productos",
    });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.json(product);
  } catch (error) {
    console.error("Error en getProductById:", error);
    return res.status(500).json({
      message: "Error al obtener el producto",
    });
  }
};

// POST /api/products/create
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Acá más adelante podemos validar campos (nombre, precio, etc.)
    const newProduct = await createProductService(productData);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error en createProduct:", error);
    return res.status(500).json({
      message: "Error al crear el producto",
    });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteProductService(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error("Error en deleteProduct:", error);
    return res.status(500).json({
      message: "Error al eliminar el producto",
    });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    const updatedProduct = await updateProductService(id, productData);

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.json(updatedProduct);
  } catch (error) {
    console.error("Error en updateProduct:", error);
    return res.status(500).json({
      message: "Error al actualizar el producto",
    });
  }
};

