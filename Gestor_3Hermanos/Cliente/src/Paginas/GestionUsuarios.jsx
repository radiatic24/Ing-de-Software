// Cliente/src/Paginas/GestionUsuarios.jsx
import React, { useState } from "react";
import "./GestionUsuarios.css";
import Logo from "../Imagenes/Logo.jpg"; // Ajusta la ruta de tu logo

function GestionUsuarios() {
  // Datos de ejemplo (reemplaza con fetch a tu backend cuando lo tengas)
  const [usuarios, setUsuarios] = useState([
    { nombre: "Usuario01", rol: "Gerente", usuario: "User01", correo: "User01@Dominio.com" },
    { nombre: "Usuario02", rol: "Repartidor", usuario: "User02", correo: "User02@Dominio.com" },
  ]);

  return (
    <div className="usuarios-page">
      {/* Barra superior café */}
      <nav className="usuarios-navbar">
        <div className="navbar-logo">
          <img src={Logo} alt="Gestor 3 Hermanos" />
        </div>
        <ul className="navbar-links">
          <li><a href="#usuarios" className="active">Usuarios</a></li>
          <li><a href="#pedidos">Pedidos</a></li>
          <li><a href="#inventario">Inventario</a></li>
          <li><a href="#caja">Caja</a></li>
        </ul>
      </nav>

      {/* Contenedor principal */}
      <div className="usuarios-content">
        {/* Tarjeta del formulario */}
        <div className="usuarios-form-container">
          <h3>Registrar Empleado</h3>
          <form className="usuarios-form">
            {/* Fila 1: Nombre / Rol */}
            <div className="form-row">
              <div className="form-group">
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre del empleado" />
              </div>
              <div className="form-group">
                <label>Rol:</label>
                <select>
                  <option value="">Seleccionar</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Repartidor">Repartidor</option>
                  <option value="Cajero">Cajero</option>
                </select>
              </div>
            </div>

            {/* Fila 2: Usuario / Correo / Botón */}
            <div className="form-row">
              <div className="form-group">
                <label>Usuario:</label>
                <input type="text" placeholder="Nombre de Usuario" />
              </div>
              <div className="form-group">
                <label>Correo:</label>
                <input type="email" placeholder="Dirección de Correo Electrónico" />
              </div>
              <div className="form-group button-group">
                <button type="submit" className="btn-registrar">
                  Registrar Empleado
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tarjeta de la tabla (abajo o a la derecha, según el CSS) */}
        <div className="usuarios-table-container">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Rol</th>
                <th>Usuario</th>
                <th>Correo Electrónico</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, index) => (
                <tr key={index}>
                  <td>{u.nombre}</td>
                  <td>{u.rol}</td>
                  <td>{u.usuario}</td>
                  <td>{u.correo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GestionUsuarios;
