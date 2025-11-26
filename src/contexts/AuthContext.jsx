import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

const API_URL = 'https://techlab-backend-9ym8.onrender.com';


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // email del usuario logueado
  const [admin, setAdmin] = useState(false);   // true si es admin
  const [role, setRole] = useState(null);      // 'admin' | 'customer' | null

  // 🔐 Login REAL contra el Back-End
  const login = async (email, password) => {
    const resp = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.message || 'Error de autenticación');
    }

    // El backend devuelve: { token, email, role }
    const { token, role } = data;

    // Guardamos datos en localStorage
    localStorage.setItem('authToken', token);   // "Bearer <jwt>"
    localStorage.setItem('authEmail', email);
    localStorage.setItem('authRole', role);

    setUser(email);
    setRole(role);
    setAdmin(role === 'admin'); // ahora depende del role que manda el back
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authEmail');
    localStorage.removeItem('authRole');

    setUser(null);
    setRole(null);
    setAdmin(false);
  };

  // Se usa en App.jsx para mantener sesión al recargar
  function verificacionLog() {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('authEmail');
    const storedRole = localStorage.getItem('authRole');

    if (token && email && storedRole) {
      setUser(email);
      setRole(storedRole);
      setAdmin(storedRole === 'admin');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        role,
        login,
        logout,
        verificacionLog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
