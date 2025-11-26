import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { dispararSweetBasico } from '../assets/SweetAlert';

function Login2() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout, admin } = useAuthContext();
  const navigate = useNavigate();

  // Cerrar sesión
  const handleSubmit2 = (e) => {
    e.preventDefault();
    logout();
    dispararSweetBasico("Sesión cerrada", "", "info", "Aceptar");
  };

  // 🔐 Login REAL contra tu backend (usa AuthContext.login)
  const iniciarSesionEmailPass = async (e) => {
    e.preventDefault();
    try {
      await login(usuario, password); // llama al backend /auth/login
      dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar");
      navigate('/admin'); // o la ruta que quieras después de loguear
    } catch (error) {
      dispararSweetBasico(
        error.message || "Credenciales incorrectas",
        "",
        "error",
        "Cerrar"
      );
    }
  };

  // Para este proyecto no implementamos registro real
  function registrarUsuario(e) {
    e.preventDefault();
    dispararSweetBasico(
      "Registro no disponible",
      "Para este proyecto usá el usuario admin@techlab.com y la contraseña 123456",
      "info",
      "Aceptar"
    );
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  // Si el usuario ya está logueado
  if (user || admin) {
    return (
      <form onSubmit={handleSubmit2}>
        <button type="submit">Cerrar sesión</button>
      </form>
    );
  }

  // Formulario de LOGIN
  if (!user && show) {
    return (
      <div>
        <form onSubmit={iniciarSesionEmailPass}>
          <h2>Iniciar sesión con Email y pass</h2>
          <div>
            <label>Email</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        <button style={{ marginTop: '2px' }} onClick={handleShow}>
          Registrate
        </button>
      </div>
    );
  }

  // Formulario de "registro" (solo informativo en este TP)
  if (!user && !show) {
    return (
      <div>
        <form onSubmit={registrarUsuario}>
          <h2>Registrarse</h2>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>
        <button style={{ marginTop: '2px' }} onClick={handleShow}>
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return null;
}

export default Login2;
