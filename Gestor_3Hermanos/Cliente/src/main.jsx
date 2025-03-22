import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import Login from './Paginas/LoginGE'
//import PedidosRepartidor from './Paginas/PedidosRepartidor'
//import LoginR from "./Paginas/LoginR.jsx";
//import GestionU from './Paginas/GestionUsuarios'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
    {/* <GestionU/> */}
    {/* <PedidosRepartidor/> */}
    {/* <LoginR /> */}
    
 
  </StrictMode>,
)
