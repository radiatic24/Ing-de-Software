// src/Paginas/PedidosRepartidor.jsx
import React, { useState } from "react";
import PedidosRepartidorC from "../Componentes/PedidosRepartidorC.jsx";
import "./PedidosRepartidor.css";

// Importa tu nueva imagen (ajusta la ruta si es distinta)
import LogoSinTexto from "../Imagenes/Logosintexto.jpg";

function PedidosRepartidor() {
  const [busqueda, setBusqueda] = useState("");

  // Ejemplo de pedidos
  const [pedidos, setPedidos] = useState([
    {
      id: 13,
      direccion: "Mexico Sur #177 Col. Atenas",
      total: 150,
      nombreCliente: "Alejandro",
      estado: "Listo p Entrega",
    },
    {
      id: 5,
      direccion: "Camilo Torres #117 Col. 2 de Agosto",
      total: 100,
      nombreCliente: "Juan Luis",
      estado: "En Reparto",
    },
    {
      id: 10,
      direccion: "Av Siempreviva #742",
      total: 300,
      nombreCliente: "Homer",
      estado: "En Reparto",
    },
    {
      id: 4,
      direccion: "Escobedo #177 Col. Tepeyac",
      total: 150,
      nombreCliente: "Juan Daniel",
      estado: "En Reparto",
    },
  ]);

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.direccion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="pedidos-page">
      {/* Franja café con la imagen centrada */}
      <div className="pedidos-header">
        <img src={LogoSinTexto} alt="Logo sin texto" className="header-logo" />
      </div>

      <div className="pedidos-content">
        <div className="search-container">
          <div className="search-box">
            {/* Puedes usar un ícono Unicode o una imagen, por ejemplo */}
            <span className="search-icon">&#x1F50E;</span>
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="pedidos-container">
          <PedidosRepartidorC pedidos={pedidosFiltrados} />
        </div>
      </div>
    </div>
  );
}

export default PedidosRepartidor;
