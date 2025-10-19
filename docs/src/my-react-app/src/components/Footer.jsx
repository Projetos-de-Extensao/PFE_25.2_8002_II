import React from 'react';
import './Footer.css'; // <-- 1. IMPORTAMOS O CSS

function Footer() {
  return (
    // 2. Adicionamos a className principal
    <footer className="main-footer">
      <p>&copy; 2025 - Sistema de Monitorias - Projeto Front-End</p>
    </footer>
  );
}

export default Footer;