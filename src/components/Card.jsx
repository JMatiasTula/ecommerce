import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../styles/Productos.css";

function CardProducto({ producto }) {
    return (
        <Card 
            bg="dark" 
            text="white" 
            className="shadow-sm border-0 rounded-4 mb-4" 
            style={{ width: '100%', minHeight: '350px' }}
        >
            <Card.Img 
  variant="top" 
  src={producto.imagen || producto.image}
  style={{ 
    maxHeight: "200px", 
    objectFit: "cover", 
    borderTopLeftRadius: "1rem", 
    borderTopRightRadius: "1rem" 
  }} 
/>

            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title className="mb-3 fs-5 fw-semibold text-white text-uppercase">
                        {producto.name}
                    </Card.Title>
                </div>
                <Link to={`/productos/${producto.id}`}>
                    <Button 
                        variant="light" 
                        className="w-100 text-dark fw-bold rounded-pill"
                    >
                        Ver detalles del producto
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default CardProducto;
