import React, { useState, useEffect } from 'react'; // 1. Importe o useEffect
import { Link } from 'react-router-dom';
import './ProfessorPage.css';

const mockCandidatos = [
  { id: 1, nome: "Ana B.", matricula: "202301", email: "ana.b@aluno.br" },
  { id: 2, nome: "Carlos D.", matricula: "202305", email: "carlos.d@aluno.br" },
];

function ProfessorPage() {
  
  // 2. Estados
  const [requisicoes, setRequisicoes] = useState([]); // Começa vazio
  const [candidatos, setCandidatos] = useState(mockCandidatos);
  
  const [isLoading, setIsLoading] = useState(true); // Começa carregando
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequisicoes = async () => {
      try {

        const API_BASE_URL = "https://plataformacasa-a2a3d2abfd5e.herokuapp.com/redoc/#tag/alunos";
        const ENDPOINT = "/api/requisicoes/"; 
        const response = await fetch(API_BASE_URL + ENDPOINT);

        if (!response.ok) {
          throw new Error(`Falha na rede: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Dados recebidos da API:", data);
        setRequisicoes(data.results || data); 

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Para de carregar
      }
    };

    fetchRequisicoes(); 
  }, []);

  if (isLoading) {
    return <div className="page-title">Carregando requisições...</div>;
  }
  if (error) {
    return <div className="page-title">Erro ao carregar dados: {error}</div>;
  }

  // 5. JSX normal (renderiza quando os dados estão prontos)
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

        {/* === SEÇÃO REQUISIÇÕES (Dados da API) === */}
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
                {/* 6. VERIFICAÇÃO: Se não houver dados */}
                {requisicoes.length === 0 ? (
                  <tr>
                    <td colSpan="3">Nenhuma requisição encontrada.</td>
                  </tr>
                ) : (
                  // 7. Mapeia os dados da API
                  requisicoes.map((req) => (
                    <tr key={req.id}>
                      {
                      }
                      <td>{req.disciplina}</td> 
                      <td>
                        {}
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

        {}
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

export default ProfessorPage;