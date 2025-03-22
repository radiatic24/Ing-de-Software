
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// Cliente/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Páginas
import LoginGE from './Paginas/LoginGE.jsx';
import PedidosRepartidor from './Paginas/PedidosRepartidor.jsx';
import GestionUsuarios from './Paginas/GestionUsuarios.jsx';
import LoginR from './Paginas/LoginR.jsx';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const usuarioLogueado = localStorage.getItem("usuario");

  // Llamada al backend al cargar la app (test)
  useEffect(() => {
    fetch('http://localhost:3000/api/test') //  ajustá el puerto si tu backend usa 3001
      .then((response) => response.json())
      .then((data) => {
        setData(data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al conectar con el backend:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>GESTOR 3 HERMANOS</h1>
      

      <BrowserRouter>
        <Routes>
          {/* Redirección automática al login o dashboard */}
          <Route path="/" element={
            usuarioLogueado ? <Navigate to="/gestion-usuarios" /> : <Navigate to="/login" />
          } />

          <Route path="/login" element={<LoginGE />} />
          <Route path="/login-repartidor" element={<LoginR />} />

          {/* Rutas protegidas */}
          <Route path="/pedidos" element={
            usuarioLogueado ? <PedidosRepartidor /> : <Navigate to="/login-repartidor" />
          } />
          <Route path="/gestion-usuarios" element={
            usuarioLogueado ? <GestionUsuarios /> : <Navigate to="/login" />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
