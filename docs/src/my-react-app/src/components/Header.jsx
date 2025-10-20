import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // O import já existe

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
      
        <div className="header-logo">
          <Link to="/home">Sistema de Monitorias</Link>
        </div>
        
        <nav className="main-nav">
          <Link to="/home">Início</Link>
          <Link to="/minhas-monitorias">Monitorias</Link>
          <Link to="/buscar">Buscar</Link>
          
          {/* Este é o nosso "botão" de ação (Call to Action) */}
          <Link to="/perfil" className="nav-cta-button">
            Meu Perfil
          </Link>
        </nav>
        
      </div>
    </header>
  );
}

export default Header;