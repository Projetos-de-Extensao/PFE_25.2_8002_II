import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './MainLayout.css'; 

// --- NOVO: IMPORTAÇÃO DOS ÍCONES LUCIDE REACT ---
import { Home, BookOpen, Calendar, CheckSquare, Send, Settings } from 'lucide-react';
// -----------------------------

// --- SIMULAÇÃO DE DADOS ---
const user = {
  name: "João Silva",
  type: "Administrador" // Mude para "professor" ou "admin"
};
// -------------------------

// Função para decidir o que escrever na barra superior
const getHeaderText = (userType) => {
  switch (userType.toLowerCase()) {
    case 'administrador':
      return "Painel do Administrador";
    case 'professor':
      return "Monitorias";
    case 'aluno':
      return "Monitorias"; 
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
          <img src="/ibmec.png" alt="Ibmec" />
        </div>
        <nav className="sidebar-nav">
          {/* ÍCONES LUCIDE NO LUGAR DOS ANTERIORES */}
          <Link to="/home" title="Início"><Home size={24} /></Link>
          <Link to="/disciplinas" title="Disciplinas"><BookOpen size={24} /></Link>
          <Link to="/calendario" title="Calendário"><Calendar size={24} /></Link>
          <Link to="/tarefas" title="Tarefas"><CheckSquare size={24} /></Link>
          <Link to="/mensagens" title="Mensagens"><Send size={24} /></Link>
        </nav>
        <div className="sidebar-footer">
          <Link to="/config" title="Configurações"><Settings size={24} /></Link>
        </div>
      </aside>

      {/* 2. CONTEÚDO PRINCIPAL (Direita) */}
      <main className="main-content-wrapper">
        
        {/* 2a. TOP-BAR (Header) */}
        <header className="top-bar">
          <div className="header-title">
            <h1>{getHeaderText(user.type)}</h1>
          </div>
          
          <div className="user-info">
            <span>Olá, {user.name}</span>
            <div className="profile-icon">
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