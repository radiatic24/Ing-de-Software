import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
    <div>
      <h1>Frontend React + Backend Node.js</h1>
      {data ? (
        <p>Respuesta del backend: {data.message}</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default App;
