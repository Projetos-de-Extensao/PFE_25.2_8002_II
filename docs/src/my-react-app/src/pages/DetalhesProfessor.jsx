import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './DetalhesProfessor.css';

// URL base da API real para alunos (Ajuste conforme o endpoint correto)
const REAL_API_ALUNOS_BASE_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/alunos/'; 

const DetalhesProfessor = () => {
    // 1. Captura o ID do aluno da URL (ex: /candidato/202207348295)
    // O nome da chave 'idAluno' deve ser o mesmo usado na definição da sua rota (path="/detalhes-candidato/:idAluno")
    const { idAluno } = useParams();
    const navigate = useNavigate();

    const [aluno, setAluno] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Efeito para buscar os dados do aluno específico
    useEffect(() => {
        if (!idAluno) {
            setError("ID do candidato não especificado na URL. Verifique o link de origem.");
            setLoading(false);
            return;
        }

        const url = `${REAL_API_ALUNOS_BASE_URL}${idAluno}/`;
        setLoading(true);
        setError(null);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao buscar candidato ${idAluno}.`);
                }
                return response.json();
            })
            .then(data => {
                // Se a API retornar um objeto aninhado (ex: {aluno: {...}}), você precisará ajustar esta linha
                setAluno(data); 
            })
            .catch(err => {
                console.error("Erro no fetch de detalhes do aluno:", err);
                setError(err.message || "Erro de rede ou na API de Alunos.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idAluno]); // Depende do idAluno

    // --- 3. Renderização de Estado (Carregamento / Erro) ---
    if (loading) {
        return (
            <div className="detalhes-professor loading">
                <h1 className="page-title">Carregando Detalhes do Candidato...</h1>
                <p>Buscando dados na API externa ({idAluno}).</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="detalhes-professor error">
                <h1 className="page-title error-title">Erro ao Carregar Candidato</h1>
                <p className='error-message'>{error}</p>
                {/* Botão para voltar à página anterior */}
                <button onClick={() => navigate(-1)} className="button-back">Voltar</button>
            </div>
        );
    }

    if (!aluno) {
        return (
            <div className="detalhes-professor not-found">
                <h1 className="page-title">Candidato Não Encontrado</h1>
                <p>Nenhum dado foi retornado para o ID {idAluno}.</p>
                <button onClick={() => navigate(-1)} className="button-back">Voltar</button>
            </div>
        );
    }
    
    // 4. Renderização Final com os Dados
    return (
        <div className="detalhes-professor">
            <main>
                {/* O título da página pode ser dinâmico, dependendo da informação da monitoria */}
                <h1 className="page-title">Monitoria de Cálculo I </h1>
                <h2 className="page-subtitle">Detalhes do Candidato</h2>
                
                <div className="detail-container">
                    {/* Aqui assumimos que a API retorna campos como nome, matricula, curso, etc. */}
                    <p><span className="detail-text">Nome: </span><span className='detail-info'>{aluno.nome || "N/A"}</span></p>
                    <p><span className="detail-text">Matrícula: </span><span className='detail-info'>{aluno.matricula || "N/A"}</span></p>
                    <p><span className="detail-text">Curso: </span><span className='detail-info'>{aluno.curso_nome || "N/A"}</span></p>
                    <p><span className="detail-text">CR (Coeficiente de Rendimento): </span><span className='detail-info'>{aluno.cr_geral || "N/A"}</span></p>
                    <p className="motivation-text-wrapper"><span className="detail-text motivation-label">Carta de Motivação: </span><span className='detail-info motivation-info'>{aluno.carta_motivacao || "Nenhuma carta fornecida."}</span></p>
                </div>
                
                {/* Botões de Ação */}
                <div className="action-button-group">
                    <Link to={`/professor/marcar-entrevista/${idAluno}`} className="button-primary-green">
                        Marcar Entrevista
                    </Link>
                    <Link to={`/professor/rejeitar-aluno/${idAluno}`} className="button-primary-red">
                        Rejeitar Candidato
                    </Link>
                </div>
                
                {/* Botão Voltar */}
                <div className="voltar-link">
                    <Link to="/HomePage" className="button-secondary-gray">
                        Voltar (Listagem de Candidatos)
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default DetalhesProfessor;