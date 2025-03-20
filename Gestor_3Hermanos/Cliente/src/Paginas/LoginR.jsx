// src/Paginas/LoginR.jsx
import React, { useState } from "react";
import "./LoginR.css";

// Ajusta la ruta de tu imagen
import Logo from "../Imagenes/Logo.jpg";

function LoginR() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario:", usuario);
    console.log("Contraseña:", contrasena);
  };

  return (
    <div className="loginr-page">
      <div className="loginr-header">
        <img src={Logo} alt="Gestor 3 Hermanos" className="loginr-img" />
      </div>

      <div className="loginr-container">
        <h2 className="loginr-title">Inicio de Sesión</h2>
        <form onSubmit={handleSubmit} className="loginr-form">
          <label htmlFor="usuario" className="loginr-label">
            Usuario:
          </label>
          <input
            type="text"
            id="usuario"
            className="loginr-input"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <label htmlFor="contrasena" className="loginr-label">
            Contraseña:
          </label>
          <input
            type="password"
            id="contrasena"
            className="loginr-input"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />

          <div className="loginr-links">
            <a href="#olvido" className="loginr-olvido">
              ¿Olvidaste tu Contraseña?
            </a>
          </div>

          <button type="submit" className="loginr-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginR;
