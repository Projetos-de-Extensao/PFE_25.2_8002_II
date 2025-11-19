import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AlunoPage.css'; 

const MOCK_API_BASE_URL = 'http://localhost:8000';
const REAL_API_DISCIPLINAS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/disciplinas/'; 

const extractArray = (data, preferredKey) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data[preferredKey])) return data[preferredKey];
    if (data && Array.isArray(data.results)) return data.results;
    if (data && Array.isArray(data.vagas)) return data.vagas;
    
    return [];
};

function AlunoPage() {
  const [vagas, setVagas] = useState([]);
  const [disciplinasCandidaturas, setDisciplinasCandidaturas] = useState([]); 
  const [calendario, setCalendario] = useState([]);
  const [loadingVagas, setLoadingVagas] = useState(true);
  const [loadingDisciplinas, setLoadingDisciplinas] = useState(true);
  const [loadingCalendario, setLoadingCalendario] = useState(true);
  const [erroVagas, setErroVagas] = useState(null);
  const [erroDisciplinas, setErroDisciplinas] = useState(null);
  const [erroCalendario, setErroCalendario] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('vagasFavoritas');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vagasFavoritas', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (disciplinaId) => {
    setFavorites((prev) =>
      prev.includes(disciplinaId)
        ? prev.filter((id) => id !== disciplinaId)
        : [...prev, disciplinaId]
    );
  };
  const isFavorite = (disciplinaId) => favorites.includes(disciplinaId);
  useEffect(() => {
    setLoadingVagas(true);
    fetch(`${MOCK_API_BASE_URL}/vagas`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Servidor Local: Erro ${response.status} ao buscar vagas.`);
        }
        return response.json();
      })
      .then(data => {
        setVagas(extractArray(data, 'vagas'));
        setErroVagas(null);
      })
      .catch(error => {
        setErroVagas(error.message || "Erro de rede no json-server (porta 8000?).");
      })
      .finally(() => setLoadingVagas(false));
  }, []); 

  
  useEffect(() => {
    setLoadingCalendario(true);
    fetch(`${MOCK_API_BASE_URL}/calendario`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Servidor Local: Erro ${response.status} ao buscar calendário.`);
        }
        return response.json();
      })
      .then(data => {
        setCalendario(extractArray(data, 'calendario'));
        setErroCalendario(null);
      })
      .catch(error => {
        setErroCalendario(error.message || "Erro de rede no json-server (porta 8000?).");
      })
      .finally(() => setLoadingCalendario(false));
  }, []); 
  
 
  useEffect(() => {
    setLoadingDisciplinas(true);
    fetch(REAL_API_DISCIPLINAS_URL)
      .then(response => {
        if (!response.ok) {
      
          throw new Error(`API Real: Erro ${response.status} ao buscar disciplinas.`);
        }
        return response.json();
      })
      .then(data => {
      
        setDisciplinasCandidaturas(extractArray(data, 'disciplinas')); 
        setErroDisciplinas(null);
      })
      .catch(error => {
        setErroDisciplinas(error.message || `Erro de rede na API Real (${REAL_API_DISCIPLINAS_URL}).`);
      })
      .finally(() => setLoadingDisciplinas(false));
  }, []); 

  const renderTableContent = (data, loading, error, columns) => {
    if (loading) {
        return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px'}}>Carregando dados...</td></tr>;
    }
    if (error) {
        return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px', color: 'red'}}>Erro: {error}</td></tr>;
    }
    
    if (!Array.isArray(data) || data.length === 0) {
        return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px'}}>Nenhum item encontrado.</td></tr>;
    }
    return null;
  };
  
  return (
    <div className="aluno-page">
      <h1 className="page-title">Portal do Aluno</h1>

      <div className="admin-panel">

        <header className="panel-header">
          <nav className="panel-nav">
            <Link to="/aluno/vagas">Vagas Abertas</Link>
            <Link to="/aluno/candidaturas">Minhas Candidaturas</Link>
            <Link to="/aluno/calendario">Calendário</Link>
          </nav>
        </header>

        <section className="panel-section">
          <h3>Vagas de Monitoria Abertas</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Vaga / Nome</th>
                  <th>Tipo</th>
                  <th>Vagas</th>
                  <th>Bolsa</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {renderTableContent(vagas, loadingVagas, erroVagas, 5) || 
                  vagas.map((vaga) => (
                    <tr key={vaga.nome}>
                      <td>{vaga.nome} ({vaga.disciplina})</td> 
                      <td>{vaga.tipo_vaga}</td>
                      <td>{vaga.numero_vagas}</td>
                      <td>{vaga.valor_bolsa}</td>
                      <td>
                        <Link to={`/detalhesvaga/${vaga.id}`} className="button-table-action">
                          Ver Detalhes e Candidatar
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(vaga.disciplina)}
                          className="button-favorito"
                        >
                          {isFavorite(vaga.disciplina) ? '★ Favorita' : '☆ Favoritar'}
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </section>

      
        <section className="panel-section">
          <h3>Minhas Candidaturas</h3>
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
                {renderTableContent(disciplinasCandidaturas, loadingDisciplinas, erroDisciplinas, 3) || 
                  disciplinasCandidaturas.map((item, index) => (
                    <tr key={index}>
                      
                      <td>{item.nome || item.disciplina || item.codigo}</td> 
                      <td>
                        <span
                          className={`status-badge ${
                            item.status && item.status.includes('Análise') ? 'status-analise' :
                            item.status === 'Selecionado' ? 'status-aprovado' : 'status-rejeitado'
                          }`}
                        >
                          {item.status || "Pendente"}
                        </span>
                      </td>
                      <td>
                          <button className="button-table-action-small">Cancelar</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </section>

       
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
                {renderTableContent(calendario, loadingCalendario, erroCalendario, 4) || 
                  calendario.map((cal, index) => (
                    <tr key={index}>
                      <td>{cal.dia}</td>
                      <td>{cal.horario}</td>
                      <td>{cal.disciplina}</td>
                      <td>{cal.sala}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AlunoPage;