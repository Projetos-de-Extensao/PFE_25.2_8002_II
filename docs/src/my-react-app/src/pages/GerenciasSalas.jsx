import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GerenciarSalas.css'; 

// URL da API Real de Salas (Reutilizando a base da Heroku)
const REAL_API_SALAS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/salas/'; 

// Função auxiliar para extrair o array de forma segura
const extractArray = (data, preferredKey) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data[preferredKey])) return data[preferredKey];
    return data && Array.isArray(data.results) ? data.results : [];
};

function GerenciarSalas() {
    const [salas, setSalas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efeito para buscar os dados de salas
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(REAL_API_SALAS_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API Salas: Erro ${response.status} ao buscar salas.`);
                }
                return response.json();
            })
            .then(data => {
                // Assume que a API real retorna a lista de salas
                setSalas(extractArray(data, 'salas')); 
            })
            .catch(err => {
                console.error("Erro no fetch de salas:", err);
                setError(err.message || "Erro de rede na API de Salas.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Função para determinar os botões de ação com base no status
    const getActionButtons = (sala) => {
        // Assume que a API real retorna o campo 'status' como 'Livre', 'Ocupada', etc.
        const status = sala.status || 'Desconhecido'; 

        switch (status) {
            case 'Livre':
                return (
                    <>
                        <button className="button-table-action button-reserve">Reservar</button>
                        <button className="button-table-action button-view-agenda">Ver Agenda</button>
                    </>
                );
            case 'Ocupada':
                return (
                    <>
                        <button className="button-table-action button-view-agenda">Ver Agenda</button>
                        <button className="button-table-action button-liberar">Liberar</button>
                    </>
                );
            case 'Manutenção':
                return (
                    <>
                        <button className="button-table-action button-edit">Editar</button>
                    </>
                );
            default:
                return null;
        }
    };
    
    // --- Renderização de Estado (Carregamento / Erro) ---
    if (loading) {
        return (
            <div className="gerenciar-salas-page loading">
                <h1 className="page-title">Carregando Salas...</h1>
                <p>Buscando dados da API Real de Salas.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="gerenciar-salas-page error">
                <h1 className="page-title error-title">Erro ao Carregar Salas</h1>
                <p className='error-message'>{error}</p>
            </div>
        );
    }

    return (
        <div className="gerenciar-salas-page">
            
            <h1 className="page-title">Administrador: Gerenciar Salas de Estudo</h1>

            <div className="admin-panel">

                <header className="panel-header">
                    <nav className="panel-nav">
                        <Link to="/administrador/postagens">Postagens</Link>
                        <Link to="/administrador/oportunidades">Oportunidades</Link>
                        <Link to="/administrador/gerenciarsalas">Salas</Link>
                        <Link to="/administrador/gerenciarpedidos">Pedidos</Link>
                    </nav>
                </header>

                {/* Seção: Botão Adicionar Sala */}
                <section className="panel-section add-button-bar">
                    <button className="button-primary">+ Adicionar Sala</button>
                </section>

                {/* Seção: Tabela de Salas */}
                <section className="panel-section">
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sala</th>
                                    <th>Capacidade</th>
                                    <th>Status Atual</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salas.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                                            Nenhuma sala encontrada na API.
                                        </td>
                                    </tr>
                                ) : (
                                    salas.map((sala) => (
                                        <tr key={sala.id}>
                                            <td>{sala.nome || sala.codigo || 'N/A'}</td>
                                            <td>{sala.capacidade || 'N/A'}</td>
                                            <td>
                                                {/* Badge de status dinâmica */}
                                                <span className={`status-badge status-${(sala.status || 'Desconhecido').toLowerCase().replace(' ', '-')}`}>
                                                    {sala.status || 'Desconhecido'}
                                                </span>
                                            </td>
                                            <td className="action-buttons-cell">
                                                {/* Botões de ação dinâmicos */}
                                                {getActionButtons(sala)}
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

export default GerenciarSalas;