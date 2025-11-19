import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './MarcarEntrevista.css'; 

// URLs das APIs Reais (Heroku)
const REAL_API_ALUNOS_BASE_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/alunos/'; 
const REAL_API_SALAS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/salas/'; 

// Função auxiliar para extrair o array de forma segura
const extractArray = (data, preferredKey) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data[preferredKey])) return data[preferredKey];
    return data && Array.isArray(data.results) ? data.results : [];
};


const MarcarEntrevista = () => {
    // Captura o ID do aluno da URL (usado na rota: /professor/marcar-entrevista/:idAluno)
    const { idAluno } = useParams();
    const navigate = useNavigate();

    const [aluno, setAluno] = useState(null);
    const [salasDisponiveis, setSalasDisponiveis] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
      data: '',
      horario: '',
      sala: '' // ID ou nome da sala selecionada
    });

    // 1. FETCH para Aluno e Salas
    useEffect(() => {
        if (!idAluno) {
            setError("ID do candidato não especificado na URL.");
            setLoading(false);
            return;
        }

        const alunoUrl = `${REAL_API_ALUNOS_BASE_URL}${idAluno}/`;
        const salasUrl = REAL_API_SALAS_URL;
        
        setLoading(true);
        setError(null);

        // Busca paralela para eficiência
        Promise.all([
            fetch(alunoUrl).then(res => res.ok ? res.json() : Promise.reject(new Error(`Erro ${res.status} Aluno`))),
            fetch(salasUrl).then(res => res.ok ? res.json() : Promise.reject(new Error(`Erro ${res.status} Salas`)))
        ])
        .then(([alunoData, salasData]) => {
            setAluno(alunoData);
            setSalasDisponiveis(extractArray(salasData, 'salas'));
            setLoading(false);
        })
        .catch(err => {
            console.error("Erro no fetch de dados:", err);
            setError("Não foi possível carregar os detalhes do aluno ou a lista de salas. Erro: " + err.message);
            setLoading(false);
        });
    }, [idAluno]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSolicitarEntrevista = (e) => {
      e.preventDefault();
      
      if (!formData.data || !formData.horario || !formData.sala) {
        setError('Por favor, preencha todos os campos para solicitar a entrevista');
        return;
      }

      // 2. Lógica de Envio da Entrevista
      console.log('--- ENVIANDO SOLICITAÇÃO DE ENTREVISTA ---');
      console.log('Aluno:', aluno.nome);
      console.log('Matrícula:', aluno.matricula);
      console.log('Dados da Entrevista:', {
          ...formData,
          materia: aluno.monitoria_ativa || 'Cálculo III' // Mock da matéria, deve vir do contexto
      });
      // Aqui você faria o fetch(POST) para a API de agendamento de entrevistas
      // Ex: fetch('URL_DA_API_AGENDAMENTO', { method: 'POST', body: JSON.stringify({...}) })
      
      alert('Entrevista solicitada com sucesso!'); // Mantendo o alert conforme seu código (mas console.log é melhor!)
      
      setFormData({ data: '', horario: '', sala: '' });
    };

    const handleRecusarCandidatura = () => {
      // Aqui você faria o fetch(POST/PUT) para a API de candidaturas para mudar o status
      console.log('Candidatura recusada para:', aluno.nome);
      alert('Candidatura recusada!');
      navigate(`/DetalhesProfessor/${aluno.matricula}`); // Volta para os detalhes do candidato
    };

    const handleVoltar = () => {
      navigate(-1); // Volta para a página anterior (DetalhesProfessor)
    };

    // --- Renderização de Estado (Carregamento / Erro) ---
    if (loading) {
        return <div className="entrevista-page loading">Carregando dados do candidato e salas...</div>;
    }

    if (error) {
        return <div className="entrevista-page error">Erro: {error}<button onClick={() => navigate(-1)} className="btn btn-voltar">Voltar</button></div>;
    }

    if (!aluno) {
        return <div className="entrevista-page not-found">Aluno não encontrado para o ID {idAluno}.</div>;
    }

    return (
      <div className="marcar-entrevista-page">
        <header className="entrevista-header">
            <h1>Professor: Marcar Entrevista</h1>
            {/* O título da matéria deve vir do contexto/estado, mas usamos um mock por enquanto */}
            <h2>Monitoria de {aluno.monitoria_ativa || 'Cálculo III'}</h2> 
        </header>

        <div className="entrevista-card">
          
          <div className="aluno-info">
            <div className="info-item">
              <strong>Aluno:</strong>
              <span>{aluno.nome || 'N/A'}</span>
            </div>
            <div className="info-item">
              <strong>Matrícula:</strong>
              <span>{aluno.matricula || idAluno}</span>
            </div>
          </div>
          
          {error && <p className="form-error-message">{error}</p>} {/* Exibe erro do formulário */}

          <form className="entrevista-form" onSubmit={handleSolicitarEntrevista}>
            
            <div className="form-group">
              <label htmlFor="data">Data:</label>
              <input
                type="date"
                id="data"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="horario">Horário:</label>
              <input
                type="time"
                id="horario"
                name="horario"
                value={formData.horario}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sala">Sala Disponível:</label>
              <select
                id="sala"
                name="sala"
                value={formData.sala}
                onChange={handleInputChange}
                className="form-input form-select"
              >
                <option value="" disabled>Selecione a Sala</option>
                {/* Populado com dados da API /salas/ */}
                {salasDisponiveis.map(sala => (
                    <option key={sala.numero} value={sala.numero}>
                        {sala.numero || `Sala ID: ${sala.id}`} ({sala.total_turmas || 'N/A'})
                    </option>
                ))}
              </select>
              {salasDisponiveis.length === 0 && (
                  <p className="no-data-message">Nenhuma sala carregada da API.</p>
              )}
            </div>

            <div className="botoes-acao">
              <button 
                type="submit" 
                className="btn btn-solicitar"
              >
                Solicitar Entrevista
              </button>
              
              <button 
                type="button" 
                onClick={handleRecusarCandidatura}
                className="btn btn-recusar"
              >
                Recusar Candidatura
              </button>
              
              <button 
                type="button" 
                onClick={handleVoltar}
                className="btn btn-voltar"
              >
                Voltar
              </button>
              <Link to={`/professor/detalhesprofessor/${aluno.id}`} className="btn btn-dashboard">Voltar</Link>
            </div>
          </form>
        </div>
      </div>
    );
};

export default MarcarEntrevista;