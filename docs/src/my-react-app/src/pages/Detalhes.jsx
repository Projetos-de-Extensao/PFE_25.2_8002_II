import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Detalhes.css';

// URL base da API real para turmas (Substitua quando o endpoint for definido)
const REAL_API_TURMAS_BASE_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/turmas/'; 

const Detalhes = () => {
    // 1. Captura o ID da turma/disciplina da URL (ex: /detalhes/101)
    // O nome da chave 'idTurma' deve ser o mesmo usado na definição da sua rota (path="/detalhes/:idTurma")
    const { idTurma } = useParams();
    const navigate = useNavigate();

    const [detalheTurma, setDetalheTurma] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Efeito para buscar os dados da turma específica
    useEffect(() => {
        if (!idTurma) {
            setError("ID da turma não especificado na URL.");
            setLoading(false);
            return;
        }

        const url = `${REAL_API_TURMAS_BASE_URL}${idTurma}/`;
        setLoading(true);
        setError(null);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    // Lança um erro se o status for 404, 500, etc.
                    throw new Error(`Erro ${response.status} ao buscar turma ${idTurma}.`);
                }
                return response.json();
            })
            .then(data => {
                setDetalheTurma(data);
            })
            .catch(err => {
                console.error("Erro no fetch de detalhes:", err);
                setError(err.message || "Erro de rede ou na API de Turmas.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idTurma]); // Depende do idTurma, se mudar, busca novamente

    // --- 3. Renderização de Estado (Carregamento / Erro) ---
    if (loading) {
        return (
            <div className="detalhes loading">
                <h1 className="page-title">Carregando Detalhes da Turma...</h1>
                <p>Buscando dados da API externa.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="detalhes error">
                <h1 className="page-title error-title">Erro ao Carregar Detalhes</h1>
                <p className='error-message'>{error}</p>
                <button onClick={() => navigate(-1)} className="button-primary">Voltar</button>
            </div>
        );
    }

    // Se o objeto estiver nulo ou vazio após o carregamento (por ex., 404)
    if (!detalheTurma) {
        return (
            <div className="detalhes not-found">
                <h1 className="page-title">Turma Não Encontrada</h1>
                <p>Nenhum dado foi retornado para o ID {idTurma}.</p>
                <button onClick={() => navigate(-1)} className="button-primary">Voltar</button>
            </div>
        );
    }
    
    // 4. Renderização Final com os Dados (Assumindo campos genéricos)
    return (
        <div className="detalhes">
            <main>
                <h1 className="page-title">Detalhes da Monitoria</h1>
                <h2 className="page-subtitle">{detalheTurma.nome || "Nome da Turma"} - {idTurma}</h2>
                <div className="detail-container">
                    <p><span className="detail-text">Descrição: </span><span className='detail-info'>{detalheTurma.descricao || "N/A"}</span></p>
                    <p><span className="detail-text">Professor: </span><span className='detail-info'>{detalheTurma.professor || "N/A"}</span></p>
                    <p><span className="detail-text">Monitor: </span><span className='detail-info'>{detalheTurma.monitor || "A ser definido"}</span></p>
                    <p><span className="detail-text">Horário: </span><span className='detail-info'>{detalheTurma.horario || "N/A"}</span></p>
                    <p><span className="detail-text">Local (Sala): </span><span className='detail-info'>{detalheTurma.local || "N/A"}</span></p>
                    <p><span className="detail-text">Status: </span><span className='detail-info'>{detalheTurma.status || "N/A"}</span></p>
                </div>
                
                {/* Botão de Ação */}
                <div className="action-area">
                    <button className="button-action">Candidatar-se a esta Turma</button>
                </div>

                {/* Link de Voltar */}
                <div className="voltar-link">
                    <Link to="/aluno" className="button-secondary">
                        Voltar para Vagas
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Detalhes;