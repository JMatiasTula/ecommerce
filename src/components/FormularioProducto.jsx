import React, { useState } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProductosContext } from '../contexts/ProductosContext';
import { Form, Button, Container, Card } from 'react-bootstrap';
import Footer from '../components/Footer'; // Asegurate de que esta ruta sea correcta

function FormularioProducto() {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });

  const validarFormulario = () => {
    if (!producto.name.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description.trim() || producto.description.length < 10) return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen.trim()) return "La URL de la imagen no debe estar vacía.";
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validacion = validarFormulario();

    if (validacion === true) {
      agregarProducto(producto)
        .then(() => {
          setProducto({ name: '', price: '', description: '', imagen: '' });
        })
        .catch((error) => {
          dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar");
        });
    } else {
      dispararSweetBasico("Error en la carga de producto", validacion, "error", "Cerrar");
    }
  };

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Container className="py-5">
        <Card bg="dark" text="white" className="shadow-lg rounded-4 mx-auto" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <h3 className="text-center mb-4">Agregar Producto</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Correa GM"
                  name="name"
                  value={producto.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImagen">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://..."
                  name="imagen"
                  value={producto.imagen}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Ej: 5999"
                  name="price"
                  value={producto.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Escribí una descripción detallada del producto"
                  name="description"
                  value={producto.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="light" type="submit">
                  Agregar Producto
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </>
  );
}

export default FormularioProducto;
