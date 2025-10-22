import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfessorPage.css';

// --- SIMULAÇÃO DE DADOS (Candidatos) ---
const mockCandidatos = [
  { id: 1, nome: "Ana B.", matricula: "202301", email: "ana.b@aluno.br" },
  { id: 2, nome: "Carlos D.", matricula: "202305", email: "carlos.d@aluno.br" },
  { id: 3, nome: "Beatriz M.", matricula: "202245", email: "beatriz.m@aluno.br" }
];

// --- SIMULAÇÃO DE DADOS (Novas Requisições) ---
const mockRequisicoes = [
  { id: 1, disciplina: "Cálculo I", status: "Aprovado" },
  { id: 2, disciplina: "Física II", status: "Pendente" },
  { id: 3, disciplina: "Álgebra Linear", status: "Rejeitado" }
];

function ProfessorPage() {
  
  const [candidatos, setCandidatos] = useState(mockCandidatos);
  // Guardamos as requisições no estado
  const [requisicoes, setRequisicoes] = useState(mockRequisicoes);

  return (
    <div className="professor-page">
      
      <h1 className="page-title">Painel do Professor</h1>

      <div className="admin-panel">

        {/* --- Cabeçalho (sem mudanças) --- */}
        <header className="panel-header">
          <nav className="panel-nav">
            <Link to="/professor/requisicoes">"Requisições"</Link>
            <Link to="/professor/candidatos">"Candidatos"</Link>
            <Link to="/professor/processo-seletivo">"Processo Seletivo"</Link>
            <Link to="/professor/postagens">"Postagens"</Link>
          </nav>
        </header>

        {/* === SEÇÃO MODIFICADA === */}
        <section className="panel-section">
          {/* 1. Título mudou */}
          <h3>Requisições</h3>
          
          {/* 2. O <form> foi substituído por esta <table> */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {requisicoes.map((req) => (
                  <tr key={req.id}>
                    <td>{req.disciplina}</td>
                    <td>
                      {/* Usando as classes de status do CSS do Admin */}
                      <span className={`status-badge status-${req.status.toLowerCase()}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="action-links">
                      <button className="action-button-link">Ver Detalhes</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. O botão/link foi movido para o final da seção */}
          <div className="nova-requisicao-link">
            <Link to="/professor/nova-requisicao" className="button-primary">
              + Requisitar monitoria para o CASA
            </Link>
          </div>
        </section>

        {/* --- Seção de Candidatos (sem mudanças) --- */}
        <section className="panel-section">
          <h3>Candidatos para Cálculo I</h3>
          
          <div className="table-wrapper">
            <table>
              <thead>
                {/* ... (cabeçalho da tabela de candidatos) ... */}
              </thead>
              <tbody>
                {/* O .map() dos candidatos continua aqui, funcionando */}
                {candidatos.map((candidato) => (
                  <tr key={candidato.id}>
                    <td>{candidato.nome}</td>
                    <td>{candidato.matricula}</td>
                    <td>{candidato.email}</td>
                    <td className="action-links">
                      <button className="action-button-link">Ver Info</button> | 
                      <button className="action-button-link">Notificar Seleção</button>
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

export default ProfessorPage;