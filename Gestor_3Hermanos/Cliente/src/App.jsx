import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PedidosRepartidor from "./Paginas/PedidosRepartidor.jsx";
import GestionUsuarios from "./Paginas/GestionUsuarios.jsx"; // si deseas incluirlo en alguna ruta
import LoginGE from "./Paginas/LoginGE.jsx"; // asegúrate de tener este componente

function App() {
  const [data, setData] = useState(null);

  // Llamar al backend cuando el componente se monte
  useEffect(() => {
    fetch('http://localhost:3000/api/test') // URL del backend
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <h1>GESTOR 3 HERMANOS</h1>
        {data ? (
          <p>Respuesta del backend: {data.message}</p>
        ) : (
          <p>Cargando...</p>
        )}
        <Routes>
          <Route path="/login" element={<LoginGE />} />
          <Route path="/pedidos" element={<PedidosRepartidor />} />
          {/* Puedes agregar otras rutas, por ejemplo: */}
          <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

