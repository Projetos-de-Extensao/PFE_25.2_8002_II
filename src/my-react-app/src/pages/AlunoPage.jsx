import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AlunoPage.css'; // Vamos criar este CSS

// --- SIMULAÇÃO DE DADOS ---
const mockVagas = [
  { id: 1, disciplina: "Cálculo I", professor: "João Silva", vagas: 2 },
  { id: 2, disciplina: "Física II", professor: "Maria Souza", vagas: 1 }
];
const mockCandidaturas = [
  { id: 1, disciplina: "Cálculo I", status: "Em análise" },
  { id: 2, disciplina: "Algoritmos", status: "Não selecionado" }
];
const mockCalendario = [
  { id: 1, dia: "Segunda", horario: "14:00-16:00", disciplina: "Cálculo I", sala: "B201" },
  { id: 2, dia: "Quarta", horario: "10:00-12:00", disciplina: "Física II", sala: "C105" }
];

function AlunoPage() {
  const [vagas, setVagas] = useState(mockVagas);
  const [candidaturas, setCandidaturas] = useState(mockCandidaturas);
  const [calendario, setCalendario] = useState(mockCalendario);

  return (
    <div className="aluno-page">
      
      {/* Título da Página */}
      <h1 className="page-title">Portal do Aluno</h1>

      {/* O Painel Principal (reutilizando a classe do admin) */}
      <div className="admin-panel">

        {/* Cabeçalho do Painel (com os links de navegação) */}
        <header className="panel-header">
          <nav className="panel-nav">
            <Link to="/aluno/vagas">"Vagas Abertas"</Link>
            <Link to="/aluno/candidaturas">"Minhas Candidaturas"</Link>
            <Link to="/aluno/calendario">"Calendário"</Link>
          </nav>
        </header>

        {/* Seção: Vagas Abertas */}
        <section className="panel-section">
          <h3>Vagas de Monitoria Abertas</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Professor</th>
                  <th>Vagas</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {vagas.map((vaga) => (
                  <tr key={vaga.id}>
                    <td>{vaga.disciplina}</td>
                    <td>{vaga.professor}</td>
                    <td>{vaga.vagas}</td>
                    <td>
                      {/* Botão de ação (como no protótipo) */}
                      <Link to={`/vaga/${vaga.id}`} className="button-table-action">
                        Ver Detalhes e Candidatar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Seção: Minhas Candidaturas */}
        <section className="panel-section">
          <h3>Minhas Candidaturas</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {candidaturas.map((cand) => (
                  <tr key={cand.id}>
                    <td>{cand.disciplina}</td>
                    <td>
                      {/* Badge de status dinâmica */}
                      <span className={`status-badge ${
                        cand.status === 'Em análise' ? 'status-analise' : 'status-rejeitado'
                      }`}>
                        {cand.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Seção: Calendário */}
        <section className="panel-section">
          <h3>Calendário de Monitorias da Semana</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Horário</th>
                  <th>Disciplina</th>
                  <th>Sala</th>
                </tr>
              </thead>
              <tbody>
                {calendario.map((cal) => (
                  <tr key={cal.id}>
                    <td>{cal.dia}</td>
                    <td>{cal.horario}</td>
                    <td>{cal.disciplina}</td>
                    <td>{cal.sala}</td>
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

export default AlunoPage;