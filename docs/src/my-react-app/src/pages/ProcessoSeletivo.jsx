import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProcessoSeletivo.css'; // O CSS que vamos criar a seguir

// --- SIMULAÇÃO DE DADOS ---
const mockEtapas = [
  { id: 'analise', nome: "Análise Currículos" },
  { id: 'entrevista', nome: "Entrevista" },
  { id: 'prova', nome: "Prova Técnica" }
];
const mockCandidatos = [
  { id: 1, nome: "Ana B.", status: "Aprovado" },
  { id: 2, nome: "Carlos D.", status: "Reprovado" },
  { id: 3, nome: "Beatriz M.", status: "Pendente" }
];

function ProcessoSeletivo() {
  const [etapas, setEtapas] = useState(mockEtapas);
  const [candidatos, setCandidatos] = useState(mockCandidatos);
  const [etapaSelecionada, setEtapaSelecionada] = useState(mockEtapas[0]?.id || ''); // Seleciona a primeira por padrão

  return (
    <div className="processo-seletivo-page"> {/* Classe específica */}

      <h1 className="page-title">Professor: Gerenciar Processo Seletivo</h1>

      {/* O Painel Principal */}
      <div className="admin-panel">

        {/* Cabeçalho do Painel (Links de navegação) */}
        <header className="panel-header">
          {/* Navegação consistente com ProfessorPage */}
          <nav className="panel-nav">
            <Link to="/professor">Home</Link>
            <Link to="/professor/processo-seletivo">Processo Seletivo</Link>
            <Link to="/professor/postagens">Postagens</Link>
          </nav>
        </header>

        {/* Seção: Filtro de Etapa */}
        <section className="panel-section filter-etapa-bar">
          <div className="filter-group">
            <label htmlFor="etapa-select">"Filtrar por Etapa:"</label>
            <select
              id="etapa-select"
              value={etapaSelecionada}
              onChange={(e) => setEtapaSelecionada(e.target.value)}
              className="filter-select"
            >
              {etapas.map(etapa => (
                <option key={etapa.id} value={etapa.id}>{etapa.nome}</option>
              ))}
            </select>
          </div>
          <button className="button-primary">+ Adicionar Etapa</button>
        </section>

        {/* Seção: Tabela de Candidatos da Etapa */}
        <section className="panel-section">
          <h3>Candidatos - {etapas.find(e => e.id === etapaSelecionada)?.nome || ''}</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Candidato</th>
                  <th>Status na Etapa</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {candidatos.map((cand) => (
                  <tr key={cand.id}>
                    <td>{cand.nome}</td>
                    <td>
                      {/* Badge de status dinâmica */}
                      <span className={`status-badge ${
                        cand.status === 'Aprovado' ? 'status-aprovado' :
                        cand.status === 'Reprovado' ? 'status-rejeitado' :
                        'status-pendente' // Pendente ou outro
                      }`}>
                        {cand.status}
                      </span>
                    </td>
                    <td className="action-buttons-cell-radio">
                      {/* Botões de rádio para Aprovar/Reprovar */}
                      <label>
                        <input type="radio" name={`status-${cand.id}`} value="aprovado" /> Aprovar
                      </label>
                      <label>
                        <input type="radio" name={`status-${cand.id}`} value="reprovado" /> Reprovar
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="salvar-etapa-link">
            <button className="button-primary">Salvar Alterações da Etapa</button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default ProcessoSeletivo;

