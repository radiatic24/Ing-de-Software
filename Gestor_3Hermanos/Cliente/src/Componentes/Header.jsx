import React from "react";
import styled from 'styled-components';

import Icon from "./Icon";
import logo from './icons/Logo.jpg';
import homeicon from './icons/Home.png';




const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #8b4513;
`;


const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: 20px;


    li a {

      text-decoration: none;
      color: #000;
      font-weight: bold;
      transition: color 0.3s;
      


      &:hover {
        color: #f9f4ee;
        padding-bottom: 10px;
        border-bottom: 3px solid #f9f4ee;
      }
    }
  }
`;

const Logo = styled.img`
  height: 60px;
`;



const Header = () => (
  <HeaderContainer>
    <Logo src={logo} alt="3Hermanos" />
    <Nav>
      <ul>
        <li><a href=""><Icon src={homeicon} alt="Home" /></a></li>
        <li><a href="">Pedidos</a></li>
        <li><a href="">Caja</a></li>
        <li><a href="">Inventario</a></li>
        <li><a href="">Usuarios</a></li>
      </ul>
    </Nav>
  </HeaderContainer>
);


export default Header;