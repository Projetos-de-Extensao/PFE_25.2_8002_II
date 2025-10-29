import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './OportunidadesAdm.css';

// --- SIMULAÇÃO DE DADOS (ATUALIZADA) ---
const mockOportunidades = [
  // Dados da imagem adm2.png
  { 
    id: 1, 
    tipo: "! Vaga", // O protótipo mostra isso, embora não usemos no CSS atual
    nome: "Cálculo II", 
    professor: "Júlio César", 
    status: "Aberta" 
  },
  { 
    id: 2, 
    tipo: "! Vaga", 
    nome: "Programação Estruturada", 
    professor: "Alberto Souza", 
    status: "Aberta" 
  },
  { 
    id: 3, 
    tipo: "! Vaga", 
    nome: "Machine Learning", 
    professor: "Gabriela Amaro", 
    status: "Fechada" 
  }
];

function OportunidadesAdm() {
  const [oportunidades, setOportunidades] = useState(mockOportunidades);

  return (
    <div className="oportunidades-page">
      
      <h1 className="page-title">Administrador: Gerenciar Oportunidades</h1>

      <div className="admin-panel">
        <header className="panel-header">
          <nav className="panel-nav">
             {/* Os links continuam iguais */}
            <Link to="/administrador/postagens">"Postagens"</Link>
            <Link to="/administrador/oportunidades">"Oportunidades"</Link>
            <Link to="/administrador/gerenciarsalas">"Salas"</Link>
            <Link to="/administrador/gerenciarpedidos">"Pedidos"</Link> 
          </nav>
        </header>

        {/* --- Seção de Filtros (sem mudanças no JSX) --- */}
        <section className="panel-section filter-bar">
            {/* ... código dos filtros e botão +Nova Oportunidade ... */}
            <div className="filter-group">
                <span>"Filtrar por tipo:"</span>
                <button className="filter-button">&lt; "Todas" &gt;</button>
                <button className="filter-button filter-active">&lt; "Abertas" &gt;</button>
            </div>
            <button className="button-primary">+ Nova Oportunidade</button>
        </section>

        {/* --- Seção: Tabela de Oportunidades (JSX sem mudanças, mas usará os novos dados) --- */}
        <section className="panel-section">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {/* Note que o cabeçalho "! Vaga" do protótipo
                     corresponde à coluna "Nome" no nosso código.
                     Se quiser mudar o texto aqui, pode mudar.
                  */}
                  <th>! "Vaga" (Disciplina)</th>
                  <th>Professor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {/* O .map() vai usar a nova lista mockOportunidades */}
                {oportunidades.map((op) => (
                  <tr key={op.id}>
                    <td>{op.nome}</td>
                    <td>{op.professor}</td>
                    <td>
                      <span className={`status-badge ${
                        op.status === 'Aberta' ? 'status-aprovado' : 'status-fechada'
                      }`}>
                        {op.status}
                      </span>
                    </td>
                    <td className="action-buttons-cell">
                      <button className="button-table-action">Ver</button>
                      <button className="button-table-action">Editar</button>
                      <button className="button-table-action button-danger">
                        {op.status === 'Aberta' ? 'Fechar' : 'Reabrir'}
                      </button>
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

export default OportunidadesAdm;
