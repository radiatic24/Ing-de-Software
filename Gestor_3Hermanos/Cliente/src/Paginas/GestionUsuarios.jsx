// Cliente/src/Paginas/GestionUsuarios.jsx
import React, { useState, useEffect } from "react";
import "./GestionUsuarios.css";
import Logo from "../Imagenes/Logo.jpg"; // Ajusta la ruta de tu logo

// Íconos
import pencilIcon from "../Imagenes/pencil.png";
import trashIcon from "../Imagenes/trash.png";

function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  // Estado para saber qué fila está seleccionada
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/usuarios") // Ajusta la URL a tu servidor
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setUsuarios(response.data);
        } else {
          console.error("Error al obtener usuarios:", response.error);
        }
      })
      .catch((error) => {
        console.error("Error de red o servidor:", error);
      });
  }, []);

  // Funciones de ejemplo para editar/eliminar
  const handleEditar = (usuarioId) => {
    console.log("Editar usuario:", usuarioId);
    // Lógica de edición
  };

  const handleEliminar = (usuarioId) => {
    console.log("Eliminar usuario:", usuarioId);
    // Lógica de eliminación
  };

  // Al hacer clic en la fila, alternamos si está seleccionada o no
  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

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
        {/* Tarjeta del formulario (mismo código) */}
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

        {/* Tarjeta de la tabla */}
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
              {usuarios.map((u, index) => {
                const isSelected = selectedRow === index;
                return (
                  <tr
                    className="user-row"
                    key={index}
                    onClick={() => handleRowClick(index)}
                  >
                    <td>{u.nombre}</td>
                    <td>{u.rol}</td>
                    <td>{u.usuario}</td>
                    <td>{u.correo}</td>

                    {/* Muestra los íconos solo si la fila está seleccionada */}
                    {isSelected && (
                      <div className="row-icons">
                        <button
                          className="btn-icon"
                          onClick={(e) => {
                            e.stopPropagation(); // Evita que el clic cierre la selección
                            handleEditar(u.usuarioId);
                          }}
                        >
                          <img src={pencilIcon} alt="Editar" />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEliminar(u.usuarioId);
                          }}
                        >
                          <img src={trashIcon} alt="Eliminar" />
                        </button>
                      </div>
                    )}
                  </tr>
                );
              })}

              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No hay usuarios registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GestionUsuarios;
