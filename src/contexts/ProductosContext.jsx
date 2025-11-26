import React, { createContext, useState, useContext } from 'react';

const ProductosContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;



export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  // GET /api/products
  function obtenerProductos() {
    return new Promise((res, rej) => {
      fetch(`${API_URL}/api/products`)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          setProductos(datos);
          setProductosOriginales(datos);
          res(datos);
        })
        .catch((error) => {
          console.log('Error al obtener productos', error);
          rej(error);
        });
    });
  }

  // GET /api/products/:id
  function obtenerProducto(id) {
    return new Promise((res, rej) => {
      fetch(`${API_URL}/api/products/${id}`)
        .then(async (respuesta) => {
          if (!respuesta.ok) {
            if (respuesta.status === 404) {
              throw new Error('Producto no encontrado');
            }
            throw new Error('Hubo un error al obtener el producto.');
          }
          return respuesta.json();
        })
        .then((producto) => {
          setProductoEncontrado(producto);
          res(producto);
        })
        .catch((err) => {
          console.log('Error:', err);
          rej(err.message);
        });
    });
  }

  // POST /api/products/create (PROTEGIDO)
  const agregarProducto = (producto) => {
    return new Promise(async (res, rej) => {
      try {
        const token = localStorage.getItem('authToken');

        const respuesta = await fetch(`${API_URL}/api/products/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token || '',
          },
          body: JSON.stringify(producto),
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(data.message || 'Error al agregar el producto.');
        }

        setProductos((prev) => [...prev, data]);
        setProductosOriginales((prev) => [...prev, data]);

        res(data);
      } catch (error) {
        console.error(error.message);
        rej(error);
      }
    });
  };

  // PUT /api/products/:id (PROTEGIDO)
  const editarProducto = (producto) => {
    return new Promise(async (res, rej) => {
      try {
        const token = localStorage.getItem('authToken');

        const respuesta = await fetch(`${API_URL}/api/products/${producto.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token || '',
          },
          body: JSON.stringify(producto),
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(data.message || 'Error al actualizar el producto.');
        }

        setProductos((prev) => prev.map((p) => (p.id === data.id ? data : p)));
        setProductosOriginales((prev) =>
          prev.map((p) => (p.id === data.id ? data : p))
        );

        res(data);
      } catch (error) {
        console.error(error.message);
        rej(error);
      }
    });
  };

  // DELETE /api/products/:id (PROTEGIDO)
  const eliminarProducto = (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar?');
    if (!confirmar) return Promise.resolve();

    return new Promise(async (res, rej) => {
      try {
        const token = localStorage.getItem('authToken');

        const respuesta = await fetch(`${API_URL}/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: token || '',
          },
        });

        const data = await respuesta.json().catch(() => ({}));

        if (!respuesta.ok) {
          throw new Error(data.message || 'Error al eliminar el producto.');
        }

        setProductos((prev) => prev.filter((p) => p.id !== id));
        setProductosOriginales((prev) => prev.filter((p) => p.id !== id));

        res();
      } catch (error) {
        console.error(error.message);
        rej(error);
      }
    });
  };

  // Filtrar localmente
  const filtrarProductos = (filtro) => {
    if (!filtro) {
      setProductos(productosOriginales);
      return;
    }

    const productosFiltrados = productosOriginales.filter((producto) =>
      producto.name.toLowerCase().includes(filtro.toLowerCase())
    );
    setProductos(productosFiltrados);
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        productosOriginales,
        productoEncontrado,
        obtenerProductos,
        obtenerProducto,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        filtrarProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductosContext = () => useContext(ProductosContext);
