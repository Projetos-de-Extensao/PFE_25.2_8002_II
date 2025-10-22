import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './MainLayout.css'; 

// --- SIMULAÇÃO DE DADOS ---
// No futuro, essa informação virá de um login, mas por agora,
// você pode trocar 'aluno' para 'professor' ou 'admin' para ver a mudança.
const user = {
  name: "João Silva",
  type: "Administrador" // Mude para "professor" ou "admin"
};
// -------------------------

// Função para decidir o que escrever na barra superior
const getHeaderText = (userType) => {
  switch (userType) {
    case 'administrador':
      return "Painel do Administrador";
    case 'professor':
      return "Monitorias";
    case 'aluno':
      return "Monitorias"; // O que estava no seu print
    default:
      return "Portal";
  }
};

function MainLayout() {
  return (
    <div className="dashboard-layout">
      
      {/* 1. SIDEBAR (Menu da Esquerda) */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          {/* MUDANÇA: Usando <img> para o logo */}
          {/* Coloque seu logo em 'my-react-app/public/logo-ibmec.png' */}
          <img src="/ibmec.png" alt="Ibmec" />
        </div>
        <nav className="sidebar-nav">
          <Link to="/home" title="Início">🏠</Link>
          <Link to="/disciplinas" title="Disciplinas">📚</Link>
          <Link to="/calendario" title="Calendário">📅</Link>
          <Link to="/tarefas" title="Tarefas">✅</Link>
          <Link to="/mensagens" title="Mensagens">✉️</Link>
        </nav>
        <div className="sidebar-footer">
          <Link to="/config" title="Configurações">⚙️</Link>
        </div>
      </aside>

      {/* 2. CONTEÚDO PRINCIPAL (Direita) */}
      <main className="main-content-wrapper">
        
        {/* 2a. TOP-BAR (Header) */}
        <header className="top-bar">
          <div className="user-info">
            {/* MUDANÇA: Nome dinâmico */}
            <span>Olá, {user.name}</span>
            <div className="profile-icon">
              {/* Pega a primeira letra do nome */}
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* 2b. O "MIOLO" ONDE ENTRAM AS PÁGINAS */}
        <div className="page-content">
          <Outlet />
        </div>
        
      </main>
    </div>
  );
}

export default MainLayout;