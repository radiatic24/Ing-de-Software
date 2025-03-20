import { useState, useEffect } from 'react'
import './LoginGE.css'
import logo from '../Imagenes/Logo.jpg';





function Login() {
  return (
    <div className="contenedor-general">
      {/* Barra lateral con logo */}
      <div className="barra-lateral">
        <img 
          src={logo} 
          alt="Gestor 3 Hermanos" 
          className="logo-imagen"
        />
      </div>

      {/* Sección de inicio de sesión */}
      <div className="contenedor-login">
        <h2 className="titulo-login">Inicio de Sesión</h2>

        <div className="grupo-input">
          <label className="etiqueta">Usuario:</label>
          <input 
            type="text" 
            className="campo-input"
            placeholder="Ingrese su usuario"
          />
        </div>

        <div className="grupo-input">
          <label className="etiqueta">Contraseña:</label>
          <input 
            type="password" 
            className="campo-input"
            placeholder="Ingrese su contraseña"
          />
          <div className='contenedor-enlace'>
          <a href="#" className="enlace-olvido">¿Olvidaste tu Contraseña?</a>
          </div>
        </div>
        
        

        <button className="boton-ingresar">Ingresar</button>
      </div>
    </div>
  );
}



export default Login;