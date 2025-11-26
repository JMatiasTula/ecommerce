import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../styles/Carrito.css";

function CarritoCard({ producto, funcionDisparadora }) {

    function borrarDelCarrito() {
        console.log("Paso 1");
        funcionDisparadora(producto.id);
    }

    return (
        <Card 
            bg="dark" 
            text="white" 
            className="mb-3 p-3 rounded-4 shadow-sm border-0"
        >
            <div className="d-flex align-items-center gap-3">
                <img 
                    src={producto.imagen} 
                    alt={producto.name} 
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "0.5rem" }} 
                />

                <div className="flex-grow-1">
                    <h5 className="mb-1 text-white text-uppercase">{producto.name}</h5>
                    <p className="mb-1 text-secondary" style={{ fontSize: "0.9rem" }}>{producto.description}</p>

                    <div className="d-flex justify-content-between">
                        <span className="text-white">Cantidad: {producto.cantidad}</span>
                        <span className="text-white">Unitario: ${producto.price}</span>
                        <span className="fw-bold text-white">Subtotal: ${producto.cantidad * producto.price}</span>
                    </div>
                </div>

                <Button 
                    variant="outline-light" 
                    className="rounded-circle fw-bold" 
                    style={{ width: "2.5rem", height: "2.5rem" }} 
                    onClick={borrarDelCarrito}
                >
                    &times;
                </Button>
            </div>
        </Card>
    );
}

export default CarritoCard;
