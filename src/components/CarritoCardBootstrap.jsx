import React from 'react';
import { Card, Row, Col, Button } from "react-bootstrap";

function CarritoCardBootstrap({ producto, funcionDisparadora }) {
  function borrarDelCarrito() {
    funcionDisparadora(producto.id);
  }

  // Usa primero "imagen" (productos del admin) y si no, "image"
  const imagenProducto = producto.imagen || producto.image;

  return (
    <Card bg="dark" text="white" className="mb-3 rounded-4 shadow-sm border-0">
      <Card.Body>
        <Row className="align-items-center g-3">
          <Col md={2}>
            <Card.Img
              variant="top"
              src={imagenProducto}
              alt={producto.name}
              style={{
                height: "100px",
                objectFit: "cover",
                borderRadius: "0.5rem"
              }}
            />
          </Col>

          <Col md={3}>
            <Card.Title className="mb-1 text-uppercase">
              {producto.name}
            </Card.Title>
            <Card.Text
              className="text-secondary mb-0"
              style={{ fontSize: "0.9rem" }}
            >
              {producto.description}
            </Card.Text>
          </Col>

          <Col md={1} className="text-center">
            <span className="text-white fw-semibold">
              x{producto.cantidad}
            </span>
          </Col>

          <Col md={2} className="text-center">
            <span className="text-white">
              ${producto.price}
            </span>
          </Col>

          <Col md={2} className="text-center">
            <span className="fw-bold text-white">
              ${producto.cantidad * producto.price}
            </span>
          </Col>

          <Col md={2} className="text-center">
            <Button
              variant="outline-light"
              size="sm"
              onClick={borrarDelCarrito}
              className="rounded-circle fw-bold"
              style={{ width: "2.2rem", height: "2.2rem" }}
            >
              &times;
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CarritoCardBootstrap;
