import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import { dispararSweetBasico } from "../assets/SweetAlert";
import Footer from "../components/Footer"; 

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();

  const [producto, setProducto] = useState(productoEncontrado || {});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => {
        setProducto(productoEncontrado);
        setCargando(false);
      })
      .catch((error) => {
        if (error === "Producto no encontrado") {
          setError("Producto no encontrado");
        } else {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  const validarFormulario = () => {
    if (!producto.name?.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description?.trim() || producto.description.length < 10) return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen?.trim()) return "La URL de la imagen no debe estar vacía.";
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
      editarProducto(producto)
        .then(() => {
          toast.success("¡Producto editado correctamente!");
        })
        .catch((error) => {
          toast.error("Hubo un problema al actualizar el producto. " + error.message);
        });
    } else {
      dispararSweetBasico("Error en la edición del producto", validacion, "error", "Cerrar");
    }
  };

  if (cargando) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="light" />
        <p className="text-white mt-2">Cargando producto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Card bg="dark" text="white" className="p-4 mx-auto" style={{ maxWidth: "500px" }}>
          <h4>{error}</h4>
        </Card>
        <Footer />
      </Container>
    );
  }

  return (
    <>
      <Container className="py-5">
        <Card bg="dark" text="white" className="shadow-lg rounded-4 mx-auto" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <h3 className="text-center mb-4">Editar Producto</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Ej: Correa GM"
                  value={producto.name || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  placeholder="https://..."
                  value={producto.imagen || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  min="0"
                  value={producto.price || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={producto.description || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="light">
                  Actualizar Producto
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <ToastContainer />
      </Container>
      <Footer />
    </>
  );
}

export default FormularioEdicion;
