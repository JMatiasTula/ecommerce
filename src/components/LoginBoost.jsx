import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
// Ya no usamos Firebase Auth para este proyecto final
import { dispararSweetBasico } from '../assets/SweetAlert';

const API_URL = 'http://localhost:3000';

function LoginBoost() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout, admin } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    dispararSweetBasico('Sesión cerrada', '', 'info', 'Aceptar');
  };

  // 🔐 Login contra tu backend: POST /auth/login
  const iniciarSesionEmailPass = async (e) => {
    e.preventDefault();
    try {
      await login(usuario, password); // llama a AuthContext, que hace fetch al backend
      dispararSweetBasico('Logeo exitoso', '', 'success', 'Confirmar');

      // Si es el admin, lo mando al panel. Si es cliente, al carrito.
      if (usuario === 'admin@techlab.com') {
        navigate('/admin');
      } else {
        navigate('/carrito');
      }
    } catch (error) {
      dispararSweetBasico(
        error.message || 'Credenciales incorrectas',
        '',
        'error',
        'Cerrar'
      );
    }
  };

  // 🆕 Registro REAL de cliente: POST /auth/register
  const registrarUsuario = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: usuario,
          password: password,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || 'Error al registrar');
      }

      // Después de registrarse, lo logueamos con el mismo email/pass
      await login(usuario, password);

      dispararSweetBasico(
        'Registro exitoso',
        'Tu cuenta fue creada y ya iniciaste sesión.',
        'success',
        'Aceptar'
      );

      // Lo mando al carrito para que continúe con la compra
      navigate('/carrito');
    } catch (error) {
      dispararSweetBasico(
        error.message || 'No se pudo registrar el usuario',
        '',
        'error',
        'Aceptar'
      );
    }
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  // Estilo de inputs y botones en blanco y negro
  const inputClass = 'form-control bg-white text-dark border-dark';
  const buttonClass = 'btn w-100 text-white border border-dark';

  // Si el usuario ya está logueado
  if (user || admin) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <form
          onSubmit={handleLogout}
          className="bg-white text-dark p-5 rounded shadow"
        >
          <h4 className="mb-3 text-center">¿Cerrar sesión?</h4>
          <button type="submit" className="btn btn-dark w-100">
            Cerrar sesión
          </button>
        </form>
      </div>
    );
  }

  // Formulario de LOGIN
  if (!user && show) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <form
          onSubmit={iniciarSesionEmailPass}
          className="bg-dark text-white p-4 rounded shadow w-75 w-md-50 w-lg-25"
        >
          <h2 className="mb-4 text-center">Iniciar sesión</h2>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className={inputClass}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>Contraseña</label>
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={`${buttonClass} bg-black mb-2`}>
            Ingresar
          </button>
          <button
            onClick={toggleForm}
            className={`${buttonClass} bg-secondary`}
          >
            ¿No tenés cuenta? Registrate
          </button>
        </form>
      </div>
    );
  }

  // Formulario de REGISTRO (ahora sí registra de verdad)
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <form
        onSubmit={registrarUsuario}
        className="bg-dark text-white p-4 rounded shadow w-75 w-md-50 w-lg-25"
      >
        <h2 className="mb-4 text-center">Registrarse</h2>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className={inputClass}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Contraseña</label>
          <input
            type="password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={`${buttonClass} bg-black mb-2`}>
          Registrarse
        </button>
        <button
          onClick={toggleForm}
          className={`${buttonClass} bg-secondary`}
        >
          ¿Ya tenés cuenta? Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginBoost;
