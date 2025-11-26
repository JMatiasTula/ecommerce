import { productsCollection } from "../config/firebase.js"; 

// Obtener todos los productos
export const findAllProducts = async () => {
  const snapshot = await productsCollection.get();
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
};

// Obtener un producto por ID
export const findProductById = async (id) => {
  const docRef = productsCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data(),
  };
};

// Crear un nuevo producto
export const createProductModel = async (productData) => {
  const docRef = await productsCollection.add(productData);
  const newDoc = await docRef.get();

  return {
    id: newDoc.id,
    ...newDoc.data(),
  };
};

// Eliminar un producto por ID
export const deleteProductModel = async (id) => {
  const docRef = productsCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return false; // para saber si existía o no
  }

  await docRef.delete();
  return true;
};

// Actualizar un producto por ID
export const updateProductModel = async (id, productData) => {
  const docRef = productsCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  await docRef.update(productData);

  const updatedDoc = await docRef.get();

  return {
    id: updatedDoc.id,
    ...updatedDoc.data(),
  };
};
