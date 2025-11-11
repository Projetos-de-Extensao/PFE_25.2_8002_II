import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GerenciarSalas.css'; // Vamos criar este CSS

// --- SIMULAÇÃO DE DADOS ---
const mockSalas = [
  { id: 1, nome: "A-101", capacidade: "10", status: "Livre" },
  { id: 2, nome: "A-102", capacidade: "8", status: "Ocupada" },
  { id: 3, nome: "B-205", capacidade: "20 (Lab)", status: "Livre" },
  { id: 4, nome: "B-206", capacidade: "20 (Lab)", status: "Manutenção" }
];

function GerenciarSalas() {
  const [salas, setSalas] = useState(mockSalas);

  // Função para determinar os botões de ação com base no status
  const getActionButtons = (sala) => {
    switch (sala.status) {
      case 'Livre':
        return (
          <>
            <button className="button-table-action button-reserve">Reservar</button>
            <button className="button-table-action">Ver Agenda</button>
          </>
        );
      case 'Ocupada':
        return (
          <>
            <button className="button-table-action">Ver Agenda</button>
            <button className="button-table-action button-liberar">Liberar</button>
          </>
        );
      case 'Manutenção':
        return (
          <>
            <button className="button-table-action">Editar</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="gerenciar-salas-page">
      
      {/* Título da Página */}
      <h1 className="page-title">Administrador: Gerenciar Salas de Estudo</h1>

      {/* O Painel Principal */}
      <div className="admin-panel">

        {/* Cabeçalho do Painel (Links de navegação) */}
        <header className="panel-header">
          {/* Esta navegação é idêntica à do Admfeed para consistência */}
          <nav className="panel-nav">
            <Link to="/administrador/postagens">"Postagens"</Link>
            <Link to="/administrador/oportunidades">"Oportunidades"</Link>
            <Link to="/administrador/gerenciarsalas">"Salas"</Link>
            <Link to="/administrador/gerenciarpedidos">"Pedidos"</Link>
          </nav>
        </header>

        {/* Seção: Botão Adicionar Sala */}
        <section className="panel-section add-button-bar">
          <button className="button-primary">+ Adicionar Sala</button>
        </section>

        {/* Seção: Tabela de Salas */}
        <section className="panel-section">
          {/* <h3>Salas Disponíveis</h3> (Opcional) */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>! "Sala"</th>
                  <th>Capacidade</th>
                  <th>Status Atual</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {salas.map((sala) => (
                  <tr key={sala.id}>
                    <td>{sala.nome}</td>
                    <td>{sala.capacidade}</td>
                    <td>
                      {/* Badge de status dinâmica */}
                      <span className={`status-badge status-${sala.status.toLowerCase()}`}>
                        {sala.status}
                      </span>
                    </td>
                    <td className="action-buttons-cell">
                      {/* Botões de ação dinâmicos */}
                      {getActionButtons(sala)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

export default GerenciarSalas;
