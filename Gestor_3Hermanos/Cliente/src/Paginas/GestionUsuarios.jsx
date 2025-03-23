import React, { useState, useEffect } from "react";
import "./GestionUsuarios.css";
import Header from "../Componentes/Header.jsx";

// Íconos
import pencilIcon from "../Imagenes/pencil.png";
import trashIcon from "../Imagenes/trash.png";

function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  // Estados para el formulario (sin usuarioId)
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [correo, setCorreo] = useState("");

  // Estado para el mensaje de registro
  const [mensaje, setMensaje] = useState("");

  // Al montar, cargar los usuarios existentes
  useEffect(() => {
    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setUsuarios(response.data);
        } else {
          console.error("Error al obtener usuarios:", response.error);
        }
      })
      .catch((error) =>
        console.error("Error de red o servidor:", error)
      );
  }, []);

  // Alterna la selección de la fila (para mostrar iconos)
  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!nombre || !rol || !contraseña || !correo) {
      setMensaje("Faltan campos requeridos");
      return;
    }

    const nuevoUsuario = { nombre, rol, contraseña, correo };

    fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setUsuarios([...usuarios, response.data]);
          setMensaje("Usuario registrado correctamente");
          // Limpiar campos
          setNombre("");
          setRol("");
          setContraseña("");
          setCorreo("");
        } else {
          setMensaje("Error: " + response.error);
        }
      })
      .catch((error) => {
        console.error("Error al registrar usuario:", error);
        setMensaje("Error al registrar usuario");
      });
  };

  // Funciones para editar y eliminar usando el _id generado por MongoDB
  const handleEditar = (id) => {
    console.log("Editar usuario:", id);
    // Implementa la lógica de edición según necesites
  };

  const handleEliminar = (id) => {
    console.log("Eliminar usuario:", id);
    // Implementa la lógica de eliminación según necesites
  };

  return (
    <div className="usuarios-page">
      <Header />

      <div className="usuarios-content">
        <div className="usuarios-form-container">
          <h3>Registrar Empleado</h3>
          {mensaje && <div className="mensaje">{mensaje}</div>}
          <form className="usuarios-form" onSubmit={handleSubmit}>
            {/* Fila 1: Nombre / Rol */}
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

            {/* Fila 2: Contraseña / Correo */}
            <div className="form-row">
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="text"
                  placeholder="Contraseña del trabajador"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
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
            </div>

            {/* Fila 3: Solo botón (centrado a la derecha) */}
            <div className="form-row">
              <div className="form-group button-group">
                <button type="submit" className="btn-registrar">
                  Registrar Empleado
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tabla de usuarios */}
        <div className="usuarios-table-container">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Rol</th>
                <th>Correo Electrónico</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, index) => {
                const isSelected = selectedRow === index;
                return (
                  <tr
                    className="user-row"
                    key={u._id}
                    onClick={() => handleRowClick(index)}
                  >
                    <td>{u.nombre}</td>
                    <td>{u.rol}</td>
                    <td>{u.correo}</td>
                    {isSelected && (
                      <div className="row-icons">
                        <button
                          className="btn-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditar(u._id);
                          }}
                        >
                          <img src={pencilIcon} alt="Editar" />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEliminar(u._id);
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
                  <td colSpan="3" style={{ textAlign: "center" }}>
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
