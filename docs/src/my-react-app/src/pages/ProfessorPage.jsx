import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfessorPage.css';

const mockStatuses = ["Aprovado", "Pendente", "Rejeitado"];

function ProfessorPage() {
  const [requisicoes, setRequisicoes] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDadosDoPainel = async () => {
      try {
        const API_BASE_URL = "https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api";
        const CANDIDATOS_ENDPOINT = "/inscricoes/";
        const REQUISICOES_ENDPOINT = "/disciplinas/";

        const [resCandidatos, resRequisicoes] = await Promise.all([
          fetch(API_BASE_URL + CANDIDATOS_ENDPOINT),
          fetch(API_BASE_URL + REQUISICOES_ENDPOINT)
        ]);

        if (!resCandidatos.ok) throw new Error(`Falha ao buscar Candidatos: ${resCandidatos.statusText}`);
        if (!resRequisicoes.ok) throw new Error(`Falha ao buscar Requisições: ${resRequisicoes.statusText}`);

        const dataCandidatos = await resCandidatos.json();
        const dataRequisicoes = await resRequisicoes.json();

        const getArrayFromResponse = (data) => Array.isArray(data) ? data : data?.results || [];

        const dadosCand = getArrayFromResponse(dataCandidatos);
        setCandidatos(dadosCand);

        const dadosReq = getArrayFromResponse(dataRequisicoes);
        const requisicoesComMockStatus = dadosReq.map((req, index) => ({
          ...req,
          status: mockStatuses[index % mockStatuses.length]
        }));

        setRequisicoes(requisicoesComMockStatus);

      } catch (err) {
        console.error("Erro no fetch de dados:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDadosDoPainel();

  }, []);

  if (isLoading) {
    return <div className="page-title">Carregando dados...</div>;
  }
  if (error) {
    return <div className="page-title">Erro ao carregar dados: {error}</div>;
  }

  return (
    <div className="professor-page">
      <h1 className="page-title">Painel do Professor</h1>

      <div className="admin-panel">
        <header className="panel-header">
          <nav className="panel-nav">
            <Link to="/professor/requisicoes">"Requisições"</Link>
            <Link to="/professor/candidatos">"Candidatos"</Link>
            <Link to="/professor/processo-seletivo">"Processo Seletivo"</Link>
            <Link to="/professor/postagens">"Postagens"</Link>
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
                {requisicoes.length === 0 ? (
                  <tr>
                    <td colSpan="3">Nenhuma requisição encontrada.</td>
                  </tr>
                ) : (
                  requisicoes.map((req) => (
                    <tr key={req.id}>
                      <td>{req.disciplina || req.nome || req.title || 'N/A'}</td>
                      <td>
                        <span className={`status-badge status-${String(req.status).toLowerCase()}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="action-links">
                        <button className="action-button-link">Ver Detalhes</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="nova-requisicao-link">
            <Link to="/novamonitoria" className="button-primary">
              + Requisitar monitoria para o CASA
            </Link>
          </div>
        </section>

        {/* === SEÇÃO CANDIDATOS (AGORA CORRIGIDA) === */}
        <section className="panel-section">
          <h3>Candidaturas por Vaga</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nome do Aluno</th>
                  <th>Vaga/Monitoria</th>
                  <th>Status</th> {/* Alterei para Status, pois é um campo existente */}
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {candidatos.length === 0 ? (
                  <tr>
                    <td colSpan="4">Nenhum candidato encontrado.</td>
                  </tr>
                ) : (
                  candidatos.map((candidato) => (
                    <tr key={candidato.id}>
                      {/* Corrigido para usar a chave da API: aluno_nome */}
                      <td>{candidato.aluno_nome}</td>
                      {/* Corrigido para usar a chave da API: vaga_nome */}
                      <td>{candidato.vaga_nome || 'N/A'}</td>
                      {/* Usando o campo status da própria API de Inscrições */}
                      <td>
                        <span className={`status-badge status-${String(candidato.status).toLowerCase()}`}>
                            {candidato.status}
                        </span>
                      </td>
                      <td className="action-links">
                        <button className="action-button-link">Ver Info</button> |
                        <button className="action-button-link">Notificar Seleção</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

export default ProfessorPage;