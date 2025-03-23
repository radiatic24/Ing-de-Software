// src/Paginas/PedidosRepartidor.jsx
import React, { useState, useEffect } from "react";
import "./PedidosRepartidor.css";
import LogoSinTexto from "../Imagenes/Logosintexto.jpg";

// Importa tu componente que renderiza la lista de pedidos
import PedidosRepartidorC from "../Componentes/PedidosRepartidorC.jsx";

function PedidosRepartidor() {
  const [busqueda, setBusqueda] = useState("");
  const [pedidos, setPedidos] = useState([]);

  // Cargar pedidos desde la base de datos al montar el componente
  useEffect(() => {
    // Ajusta la ruta a tu servidor/puerto y endpoint
    fetch("http://localhost:3000/api/pedidos")
      .then((res) => res.json())
      .then((data) => {
        // asumiendo que tu servidor responde con un array de pedidos
        // o con un objeto { success: true, data: [...] }
        // ajusta según tu formato real
        if (data.success) {
          setPedidos(data.data); // o data.pedidos
        } else {
          console.error("Error al obtener pedidos:", data.error);
        }
      })
      .catch((err) => console.error("Error de red o servidor:", err));
  }, []);

  // Filtra pedidos según la búsqueda
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
          {/* Muestra los pedidos filtrados */}
          <PedidosRepartidorC pedidos={pedidosFiltrados} />
        </div>
      </div>
    </div>
  );
}

export default PedidosRepartidor;
