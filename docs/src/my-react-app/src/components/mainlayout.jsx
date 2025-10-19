import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx'; // Importa o Header
import Footer from './Footer.jsx'; // Importa o Footer

// Este é o "Molde" para as páginas DEPOIS do login
function MainLayout() {
  return (
    <>
      <Header />
      
      {/* O <Outlet> é o espaço onde suas páginas (HomePage, etc)
          vão aparecer */}
      <Outlet />
      
      <Footer />
    </>
  );
}

export default MainLayout;