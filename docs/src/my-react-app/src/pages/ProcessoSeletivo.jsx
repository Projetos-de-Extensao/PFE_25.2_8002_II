import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProcessoSeletivo.css';

// Importa os componentes Header e Footer
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

// Dados simulados do Processo Seletivo (Cálculo I)
const initialProcessData = {
  discipline: 'Cálculo I',
  status: 'Aberto',
  currentSteps: [
    { name: 'Inscrições Abertas', completed: true },
    { name: 'Análise de Histórico', completed: true },
    { name: 'Prova Prática', completed: false },
    { name: 'Entrevista', completed: false },
    { name: 'Resultado Final', completed: false },
  ],
  candidates: [
    { id: 1, name: 'Ana B.', registration: '202301', status: 'Aguardando Análise', action: 'Aprovar/Rejeitar' },
    { id: 2, name: 'Carlos D.', registration: '202305', status: 'Aguardando Análise', action: 'Aprovar/Rejeitar' },
    { id: 3, name: 'Beatriz M.', registration: '202245', status: 'Aprovado p/ Entrevista', action: 'Marcar entrevista' },
  ]
};

const ProcessoSeletivo = () => {
  const [processData, setProcessData] = useState(initialProcessData);
  const [filter, setFilter] = useState(`${initialProcessData.discipline} (${initialProcessData.status})`);

  // Handler de ações (aprovar, rejeitar, marcar entrevista)
  const handleCandidateAction = (candidateId, actionType) => {
    console.log(`Candidato ${candidateId} - Ação: ${actionType}`);
    // Lógica para atualizar o status do candidato no estado
    const newCandidates = processData.candidates.map(c => {
      if (c.id === candidateId) {
        if (actionType === 'aprovar') return { ...c, status: 'Aprovado para Próxima Etapa', action: 'Aprovado' };
        if (actionType === 'rejeitar') return { ...c, status: 'Rejeitado', action: 'Rejeitado' };
        if (actionType === 'marcar_entrevista') return { ...c, status: 'Entrevista Agendada', action: 'Entrevista' };
      }
      return c;
    });
    setProcessData({ ...processData, candidates: newCandidates });
  };

  const handleSave = () => {
    console.log('Dados do processo salvo:', processData);
    alert('Alterações salvas com sucesso!');
  };

  const handleClose = () => {
    console.log('Processo fechado.');
    alert('Processo Seletivo Fechado!');
    // Em um app real, isso redirecionaria ou mudaria o estado global
  };

  return (
    <div className="processo-page-wrapper">
      
      {/* 1. HEADER */}
      <Header /> 

      {/* 2. CONTEÚDO PRINCIPAL (Centralizado) */}
      <main className="processo-main-content"> 
        <div className="processo-card">
          
          <header className="card-header">
            <h1>Sistema de Monitorias</h1>
            <h2>Gerenciar Processo Seletivo</h2>
            
            {/* Abas de Navegação */}
            <nav className="processo-nav-tabs">
              <span className="nav-tab">Requisicões</span>
              <span className="nav-tab">Candidatos</span>
              <span className="nav-tab active">Processo Seletivo</span>
              <span className="nav-tab">Postagens</span>
            </nav>
          </header>

          {/* FILTRO E CRIAÇÃO */}
          <section className="processo-controls">
            <div className="processo-filter">
                <label htmlFor="discipline-filter">Filtrar por Disciplina:</label>
                <select 
                    id="discipline-filter" 
                    className="input-field"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value={filter}>{filter}</option>
                    {/* Mais opções de filtro viriam aqui */}
                </select>
            </div>
            
            <button className="btn-criar-novo">
                + Criar Novo Processo
            </button>
          </section>

          {/* SEÇÃO 1: ETAPAS DO PROCESSO */}
          <section className="processo-etapas">
            <h3>Etapas do Processo: {processData.discipline}</h3>
            <ul className="etapas-list">
              {processData.currentSteps.map((step, index) => (
                <li key={index} className={step.completed ? 'completed' : ''}>
                  {step.completed ? '☑' : '◯'} {step.name}
                </li>
              ))}
            </ul>
          </section>

          {/* SEÇÃO 2: CANDIDATOS EM ANÁLISE */}
          <section className="processo-candidatos">
            <h3>Candidatos em Análise (Etapa: Análise de Histórico)</h3>
            
            <table className="candidato-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {processData.candidates.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.registration}</td>
                    <td className={`status-${c.status.split(' ')[0].toLowerCase()}`}>{c.status}</td>
                    <td>
                      {c.action === 'Aprovar/Rejeitar' ? (
                        <div className="action-buttons">
                          <button 
                            className="btn-aprovar" 
                            onClick={() => handleCandidateAction(c.id, 'aprovar')}
                          >
                            Aprovar
                          </button>
                          <button 
                            className="btn-rejeitar" 
                            onClick={() => handleCandidateAction(c.id, 'rejeitar')}
                          >
                            Rejeitar
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="btn-marcar" 
                          onClick={() => handleCandidateAction(c.id, 'marcar_entrevista')}
                        >
                          {c.action}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* SEÇÃO 3: BOTÕES DE AÇÃO PRINCIPAL */}
          <footer className="processo-actions">
            <button onClick={handleSave} className="btn-salvar-processo">
              Salvar Alterações no Processo
            </button>
            <button onClick={handleClose} className="btn-fechar-processo">
              Fechar Processo
            </button>
          </footer>

        </div>
      </main>

      {/* 3. FOOTER */}
      <Footer /> 

    </div>
  );
};

export default ProcessoSeletivo;
