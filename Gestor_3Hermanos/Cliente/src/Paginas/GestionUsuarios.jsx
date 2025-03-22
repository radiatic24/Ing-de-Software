// Cliente/src/Paginas/GestionUsuarios.jsx
import React, { useState, useEffect } from "react";

import "./GestionUsuarios.css";
import Logo from "../Imagenes/Logo.jpg";
import pencilIcon from "../Imagenes/pencil.png";
import trashIcon from "../Imagenes/trash.png";

function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios");
      const response = await res.json();
      if (response.success) {
        setUsuarios(response.data);
      } else {
        console.error("Error al obtener usuarios:", response.error);
      }
    } catch (error) {
      console.error("Error de red o servidor:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoEmpleado = {
      nombre,
      rol,
      usuario,
      correo,
      usuarioId: Math.floor(Math.random() * 100000),
      contraseña: '1234' // Contraseña por defecto
    };

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEmpleado),
      });

      const data = await res.json();

      if (res.ok) {
        setUsuarios([...usuarios, data.data]);
        // Limpiar formulario
        setNombre('');
        setRol('');
        setUsuario('');
        setCorreo('');
      } else {
        console.error("Error al registrar:", data.error);
      }
    } catch (err) {
      console.error("Error de red:", err);
    }
  };

  const handleEditar = (usuarioId) => {
    console.log("Editar usuario:", usuarioId);
    // Lógica de edición futura
  };

  const handleEliminar = (usuarioId) => {
    console.log("Eliminar usuario:", usuarioId);
    // Lógica de eliminación futura
  };

  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  return (
    <div className="usuarios-page">
      {/* Barra superior */}
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

      <div className="usuarios-content">
        {/* Formulario */}
        <div className="usuarios-form-container">
          <h3>Registrar Empleado</h3>
          <form className="usuarios-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  placeholder="Nombre del empleado"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Rol:</label>
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Repartidor">Repartidor</option>
                  <option value="Cajero">Cajero</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Usuario:</label>
                <input type="text" placeholder="Nombre de Usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Correo:</label>
                <input
                  type="email"
                  placeholder="Dirección de Correo Electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="form-group button-group">
                <button type="submit" className="btn-registrar">
                  Registrar Empleado
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tabla */}
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

                    {isSelected && (
                      <div className="row-icons">
                        <button
                          className="btn-icon"
                          onClick={(e) => {
                            e.stopPropagation();
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
