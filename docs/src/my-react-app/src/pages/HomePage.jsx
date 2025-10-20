import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Vamos usar o mesmo arquivo, mas com código novo

function HomePage() {
  return (
    <div className="admin-homepage">
      
      {/* Título da Página (como no protótipo) */}
      <h1 className="admin-title">Administrador:</h1>

      {/* O Painel Principal */}
      <div className="admin-panel">

        {/* Cabeçalho do Painel (com os links de navegação) */}
        <header className="panel-header">
          <h2>Painel do Administrador (CASA)</h2>
          <nav className="panel-nav">
            <Link to="/admin/postagens">"Postagens"</Link>
            <Link to="/admin/oportunidades">"Oportunidades"</Link>
            <Link to="/admin/alunos">"Alunos"</Link>
            <Link to="/admin/salas">"Salas"</Link>
            <Link to="/admin/agenda">"Agenda"</Link>
            <Link to="/admin/pedidos">"Pedidos"</Link>
          </nav>
        </header>

        {/* Seção: Pedidos de Monitoria */}
        <section className="panel-section">
          <h3>Pedidos de Monitoria de Professores</h3>
          
          {/* Tabela de Pedidos */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Professor</th>
                  <th>Disciplina</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {/* Linha 1 (Pendente) */}
                <tr>
                  <td>João Silva</td>
                  <td>Cálculo I</td>
                  <td><span className="status-badge status-pendente">Pendente</span></td>
                  <td className="action-links">
                    <button className="action-button-link">Aprovar</button> | 
                    <button className="action-button-link">Rejeitar</button>
                  </td>
                </tr>
                {/* Linha 2 (Aprovado) */}
                <tr>
                  <td>Maria Souza</td>
                  <td>Física II</td>
                  <td><span className="status-badge status-aprovado">Aprovado</span></td>
                  <td className="action-links">
                    <button className="action-button-link">Ver</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Seção: Ações Rápidas */}
        <section className="panel-section quick-actions">
          <h3>Ações Rápidas</h3>
          <div className="button-group">
            <button className="button-primary">+ Nova Postagem</button>
            <div className="right-buttons">
              <button className="button-secondary">+ Nova Oportunidade</button>
              <button className="button-secondary">Verificar Salas</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default HomePage;