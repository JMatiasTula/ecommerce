import React, { useEffect, useState } from 'react';
import { useProductosContext } from "../contexts/ProductosContext";
import { Carousel, Container } from "react-bootstrap";
import Footer from './Footer';
import '../styles/mainBootstrap.css'; 



function MainBootstrap() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (productos.length === 0) {
      obtenerProductos().then(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, []);

  const primerosTres = productos.slice(0, 3);

  if (cargando) return <p>Cargando carrusel...</p>;
  if (primerosTres.length === 0) return <p>No hay productos para mostrar.</p>;

  return (
    <>
      <Container className="my-5">
        <div className="bg-dark rounded shadow p-4">
          <Carousel>
            {primerosTres.map((producto) => (
              <Carousel.Item key={producto.id}>
  <div
    className="carrusel-img"
    style={{
      backgroundImage: `url(${producto.imagen || producto.image})`
    }}
  ></div>

  <Carousel.Caption
    style={{
      backgroundColor: 'rgba(2, 2, 2, 0.5)',
      borderRadius: '10px',
      padding: '1rem'
    }}
  >
    <h3 className="text-white">{producto.name}</h3>
    <p className="text-white">{producto.description}</p>
  </Carousel.Caption>
</Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Sección Multimedia */}
        <div className="bg-dark text-white rounded shadow p-4 mt-5">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <h3>Video institucional</h3>
              <iframe
                width="100%"
                height="250"
                src="https://www.youtube.com/embed/Bpua8pPVHw8?si=3-4cE6v76Y1rcT24"
                title="Video institucional GM"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>
            <div className="col-md-6">
              <h3>Ubicación en Google Maps</h3>
              <iframe
                width="100%"
                height="250"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.6675651960555!2d-83.04977062427398!3d42.33142797119448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ca0137f8c8fd%3A0x557726c3e4c9b871!2sGeneral%20Motors!5e0!3m2!1ses-419!2sar!4v1716409582894!5m2!1ses-419!2sar"
                title="Mapa GM"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>

      {/* Footer */}
    
    </>
  );
}

export default MainBootstrap;
