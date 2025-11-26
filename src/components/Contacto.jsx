import React from 'react';
import Footer from "./Footer";
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function Contacto() {
  return (
    <>
      <Container className="py-5">
        <Card bg="dark" text="white" className="shadow-lg rounded-4">
          <Card.Body>
            <h3 className="mb-4 text-center">Formulario de Contacto</h3>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Tu nombre" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder="tuemail@ejemplo.com" required />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="tel" placeholder="Ej: 1123456789" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formAsunto">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control type="text" placeholder="Motivo de tu consulta" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4" controlId="formMensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Escribí tu mensaje aquí..." required />
              </Form.Group>

              <div className="d-grid">
                <Button variant="light" type="submit">
                  Enviar Mensaje
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

export default Contacto;
