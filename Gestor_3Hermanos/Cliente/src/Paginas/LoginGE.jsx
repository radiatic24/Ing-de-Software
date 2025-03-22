import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // nuevo import
import './LoginGE.css';
import logo from '../Imagenes/Logo.jpg';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); //inicializar navegación

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('usuario', JSON.stringify(data.data)); // guardar sesión
        setError('');
        navigate('/gestion-usuarios'); // redirigir
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="contenedor-general">
      <div className="barra-lateral">
        <img src={logo} alt="Gestor 3 Hermanos" className="logo-imagen" />
      </div>

      <div className="contenedor-login">
        <h2 className="titulo-login">Inicio de Sesión</h2>

        <div className="grupo-input">
          <label className="etiqueta">Correo:</label>
          <input
            type="text"
            className="campo-input"
            placeholder="Ingrese su correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="grupo-input">
          <label className="etiqueta">Contraseña:</label>
          <input
            type="password"
            className="campo-input"
            placeholder="Ingrese su contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button className="boton-ingresar" onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  );
}

export default Login;
