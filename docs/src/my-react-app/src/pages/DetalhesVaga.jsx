import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './DetalhesVaga.css';

// URL base da API mockada (Json-Server) para vagas
const MOCK_API_VAGAS_BASE_URL = 'http://localhost:8000/vagas/'; 

const DetalhesVaga = () => {
    // 1. Captura o ID da vaga da URL (ex: /detalhesvaga/101)
    const { idVaga } = useParams();
    const navigate = useNavigate();

    const [vaga, setVaga] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Efeito para buscar os dados da vaga específica no Json-Server
    useEffect(() => {
        if (!idVaga) {
            setError("ID da vaga não especificado na URL. Verifique o link de origem.");
            setLoading(false);
            return;
        }

        const url = `${MOCK_API_VAGAS_BASE_URL}${idVaga}`;
        setLoading(true);
        setError(null);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    // Se o json-server não encontrar, ele retorna 404
                    throw new Error(`Erro ${response.status} ao buscar vaga ${idVaga}.`);
                }
                return response.json();
            })
            .then(data => {
                // A API mockada deve retornar o objeto da vaga diretamente
                setVaga(data); 
            })
            .catch(err => {
                console.error("Erro no fetch de detalhes da vaga:", err);
                setError(err.message || "Erro de rede no Json-Server (Porta 8000?).");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idVaga]);

    // --- 3. Renderização de Estado (Carregamento / Erro) ---
    if (loading) {
        return (
            <div className="detalhes-vaga loading">
                <h1 className="page-title">Carregando Detalhes da Vaga...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="detalhes-vaga error">
                <h1 className="page-title error-title">Erro ao Carregar Detalhes</h1>
                <p className='error-message'>{error}</p>
                <button onClick={() => navigate(-1)} className="button-secondary">Voltar</button>
            </div>
        );
    }

    if (!vaga || vaga.ativo === false) {
        return (
            <div className="detalhes-vaga not-found">
                <h1 className="page-title">Vaga Não Encontrada ou Inativa</h1>
                <p>Nenhum dado válido foi retornado para o ID {idVaga}.</p>
                <button onClick={() => navigate(-1)} className="button-secondary">Voltar</button>
            </div>
        );
    }
    
    // 4. Renderização Final com os Dados
    return (
        <div className="detalhes-vaga">
            <main>
                <h1 className="page-title">Detalhes da Vaga</h1>
                {/* Usa o nome da vaga do JSON */}
                <h2 className="page-subtitle">{vaga.nome || "Vaga de Monitoria"}</h2>
                
                <div className="detail-container">
                    <p><span className="detail-text">Disciplina (Código): </span><span className='detail-info'>{vaga.disciplina || "N/A"}</span></p>
                    {/* Aqui, o professor é extraído do array 'professores' no db.json, assumindo o primeiro */}
                    <p><span className="detail-text">Professor: </span><span className='detail-info'>{vaga.professores && vaga.professores.length > 0 ? vaga.professores[0] : "A ser definido"}</span></p>
                    <p><span className="detail-text">Vagas Abertas: </span><span className='detail-info'>{vaga.numero_vagas || 0}</span></p>
                    <p><span className="detail-text">Bolsa: </span><span className='detail-info'>{vaga.valor_bolsa || "N/A"}</span></p>
                    
                    {/* Mapeando os campos que você tinha no seu mock, mas usando os do JSON */}
                    <p className="detail-text-full"><span className="detail-text">Requisitos: </span></p>
                    <p className='detail-info detail-block'>{vaga.requisitos || "Não especificado."}</p>
                    
                    <p className="detail-text-full"><span className="detail-text">Responsabilidades: </span></p>
                    <p className='detail-info detail-block'>{vaga.responsabilidades || "Não especificado."}</p>
                </div>
                
                {/* Botões de Ação */}
                <div className="action-button-group">
                    <Link to="/aluno/candidaturas" className="button-primary-green">
                        Candidatar-se à vaga
                    </Link>
                </div>

                {/* Link de Voltar */}
                <div className="voltar-link">
                    <Link to="/Aluno" className="button-secondary-gray">
                        Voltar para Vagas
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default DetalhesVaga;