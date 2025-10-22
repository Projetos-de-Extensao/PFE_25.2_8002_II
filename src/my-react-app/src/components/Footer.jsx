import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // O import já existe

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* O conteúdo principal do rodapé (com as colunas) */}
        <div className="footer-content">
          
          {/* Coluna 1: Sobre */}
          <div className="footer-column footer-about">
            <h3 className="footer-logo">Sistema de Monitorias</h3>
            <p>
              Um projeto de front-end para a disciplina de PFE, 
              criado com React e Vite.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="footer-column footer-links">
            <h4>Navegação</h4>
            {/* Usar <ul> e <li> é bom para semântica e acessibilidade */}
            <ul>
              <li><Link to="/home">Início</Link></li>
              <li><Link to="/minhas-monitorias">Monitorias</Link></li>
              <li><Link to="/buscar">Buscar</Link></li>
              <li><Link to="/perfil">Meu Perfil</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato/Links */}
          <div className="footer-column footer-contact">
            <h4>Contato</h4>
            <ul>
              <li><Link to="/">Administração</Link></li>
              <li><Link to="/esqueci-senha">Suporte</Link></li>
            </ul>
          </div>

        </div>

        {/* A barra inferior de copyright */}
        <div className="footer-bottom-bar">
          <p>&copy; 2025 - Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;