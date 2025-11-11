import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfessorPage.css';

// --- SIMULAÇÃO DE DADOS (Candidatos) ---
// (Não há problema em deixar os mocks aqui fora)
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

// A FUNÇÃO DO COMPONENTE COMEÇA AQUI
function ProfessorPage() {
  
  // OS HOOKS (useState) SÃO CHAMADOS AQUI DENTRO
  const [candidatos, setCandidatos] = useState(mockCandidatos);
  const [requisicoes, setRequisicoes] = useState(mockRequisicoes);

  // O HTML (JSX) COMEÇA AQUI
  return (
    <div className="professor-page">
      
      <h1 className="page-title">Painel do Professor</h1>

      <div className="admin-panel">

        {/* --- Cabeçalho (sem mudanças) --- */}
        <header className="panel-header">
          <nav className="panel-nav">
            <Link to="/professor">Home</Link>
            <Link to="/professor/processo-seletivo">Processo Seletivo</Link>
            <Link to="/professor/postagens">Postagens</Link> {/* Link Ativo */}
          </nav>
        </header>

        {/* === SEÇÃO REQUISIÇÕES === */}
        <section className="panel-section">
          <h3>Requisições</h3>
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
          <div className="nova-requisicao-link">
            <Link to="/novamonitoria" className="button-primary">
              + Requisitar monitoria para o CASA
            </Link>
          </div>
        </section>

        {/* === SEÇÃO CANDIDATOS === */}
        <section className="panel-section">
          <h3>Candidatos para Cálculo I</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
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

// ADICIONEI ESTA LINHA QUE FALTAVA:
export default ProfessorPage;

