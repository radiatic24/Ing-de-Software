import React from "react";

function PedidosRepartidorC({ pedidos = [] }) {
  return (
    <ul className="pedidos-list">
      {pedidos.map((pedido) => (
        <li key={pedido.id} className="pedido-item">
          <div className="pedido-col-izq">
            <p className="direccion">{pedido.direccion}</p>
            <p className="pedido-id">Pedido {pedido.id}</p>
            <p className="total">Total ${pedido.total}</p>
          </div>
          <div className="pedido-col-der">
            <span className="cliente">{pedido.nombreCliente}</span>
            <span className="estado">{pedido.estado}</span>
            <span className="flecha">▼</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PedidosRepartidorC;
