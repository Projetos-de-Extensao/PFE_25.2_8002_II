import React from 'react';
// 1. Importe o Link para que os cards sejam clicáveis
import { Link } from 'react-router-dom';
// 2. Importe o arquivo CSS que vamos criar no próximo passo
import './HomePage.css';

function HomePage() {
  return (
    // <main> é o container principal da nossa página
    <main className="home-container">
      
      {/* Um cabeçalho de boas-vindas */}
      <header className="home-header">
        <h1>Painel Principal</h1>
        <p>Bem-vindo(a) de volta! Selecione uma opção para começar.</p>
      </header>

      {/* A grade com os cards */}
      <section className="card-grid">

        {/* Card 1: Minhas Monitorias */}
        <div className="card">
          <h3>Minhas Monitorias</h3>
          <p>Ver seus horários, agendamentos e alunos.</p>
          {/* Este Link leva para uma rota que você pode criar depois */}
          <Link to="/minhas-monitorias" className="card-button">
            Acessar
          </Link>
        </div>

        {/* Card 2: Buscar Monitores */}
        <div className="card">
          <h3>Buscar Monitores</h3>
          <p>Encontrar um monitor por matéria ou horário.</p>
          <Link to="/buscar" className="card-button">
            Buscar
          </Link>
        </div>

        {/* Card 3: Meu Perfil */}
        <div className="card">
          <h3>Meu Perfil</h3>
          <p>Editar suas informações, foto e matérias.</p>
          <Link to="/perfil" className="card-button">
            Editar Perfil
          </Link>
        </div>

      </section>
    </main>
  );
}

export default HomePage;