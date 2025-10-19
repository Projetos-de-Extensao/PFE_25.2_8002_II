import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // <-- 1. IMPORTAMOS O CSS

function Header() {
  return (
    // 2. Adicionamos a className principal
    <header className="main-header">
      {/* 3. Adicionamos o container para centralizar */}
      <div className="header-container">
      
        {/* 4. Adicionamos a classe do Logo */}
        <div className="header-logo">
          <Link to="/home">Sistema de Monitorias</Link>
        </div>
        
        {/* 5. Adicionamos a classe da navegação */}
        <nav className="main-nav">
          <Link to="/home">Início</Link>
          <Link to="/minhas-monitorias">Monitorias</Link>
          <Link to="/buscar">Buscar</Link>
          <Link to="/perfil">Meu Perfil</Link>
        </nav>
        
      </div>
    </header>
  );
}

export default Header;