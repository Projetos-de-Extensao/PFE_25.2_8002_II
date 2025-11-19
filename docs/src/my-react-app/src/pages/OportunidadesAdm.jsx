import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OportunidadesAdm.css';

// URL do Json-Server para vagas
const MOCK_API_VAGAS_URL = 'http://localhost:8000/vagas/';

// Função auxiliar para extrair o array de forma segura
const extractArray = (data, preferredKey) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data[preferredKey])) return data[preferredKey];
    return data && Array.isArray(data.vagas) ? data.vagas : [];
};

function OportunidadesAdm() {
    const navigate = useNavigate();
    const [oportunidades, setOportunidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para filtros
    const [filtroStatus, setFiltroStatus] = useState("Abertas");

    // Efeito para buscar os dados das vagas
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(MOCK_API_VAGAS_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao buscar vagas. Servidor local offline?`);
                }
                return response.json();
            })
            .then(data => {
                const vagasArray = extractArray(data, 'vagas');

                // ENRIQUECIMENTO: Adiciona o campo 'status' para facilitar o JSX.
                // Usamos 'ativo' (boolean) para determinar o Status.
                const oportunidadesEnriquecidas = vagasArray.map(vaga => ({
                    ...vaga,
                    // Garante que o status seja "Aberta" ou "Fechada"
                    status: vaga.ativo ? "Aberta" : "Fechada",
                    // Assume que o campo 'professor' que você adicionou é uma string
                    professor_nome: vaga.professor || vaga.professores?.[0] || "Professor N/A" 
                }));

                setOportunidades(oportunidadesEnriquecidas);
            })
            .catch(err => {
                console.error("Erro no fetch de vagas:", err);
                setError(err.message || "Erro de rede no Json-Server (Porta 8000?).");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // 4. Lógica de Filtro
    const oportunidadesFiltradas = oportunidades.filter(op => 
        filtroStatus === "Todas" || op.status === filtroStatus
    );

    // Função para mudar o status (simulado)
    const handleToggleStatus = (id, currentStatus) => {
        // Log de simulação de alteração
        console.log(`Simulação: Mudando status da vaga ${id} de ${currentStatus}.`);
        
        // Em um app real, você faria um PATCH/PUT para a API aqui
        
        // Atualiza o estado localmente para refletir a mudança
        setOportunidades(prev => prev.map(op => 
            op.id === id ? { ...op, status: currentStatus === 'Aberta' ? 'Fechada' : 'Aberta', ativo: !op.ativo } : op
        ));
    };


    // --- Renderização de Estado (Carregamento / Erro Global) ---
    const renderTableContent = (data, loading, error, columns) => {
        if (loading) {
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px'}}>Carregando vagas...</td></tr>;
        }
        if (error) {
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px', color: 'red'}}>Erro: {error}</td></tr>;
        }
        if (!Array.isArray(data) || data.length === 0) {
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px'}}>Nenhuma vaga encontrada.</td></tr>;
        }
        return null;
    };
    
    return (
        <div className="oportunidades-page">
            
            <h1 className="page-title">Administrador: Gerenciar Oportunidades</h1>

            <div className="admin-panel">
                <header className="panel-header">
                    <nav className="panel-nav">
                        <Link to="/administrador/postagens">Postagens</Link>
                        <Link to="/administrador/oportunidades">Oportunidades</Link>
                        <Link to="/administrador/gerenciarsalas">Salas</Link>
                        <Link to="/administrador/gerenciarpedidos">Pedidos</Link> 
                    </nav>
                </header>

                {/* --- Seção de Filtros e Ação --- */}
                <section className="panel-section filter-bar">
                    <div className="filter-group">
                        <label htmlFor="filtro-status">Filtrar por Status:</label>
                        <select 
                            id="filtro-status" 
                            className="filter-select"
                            value={filtroStatus}
                            onChange={(e) => setFiltroStatus(e.target.value)}
                        >
                            <option value="Todas">Todas</option>
                            <option value="Aberta">Abertas</option>
                            <option value="Fechada">Fechadas</option>
                        </select>
                    </div>
                    <button className="button-primary" onClick={() => navigate('/administrador/nova-vaga')}>
                        + Nova Oportunidade
                    </button>
                </section>

                {/* --- Seção: Tabela de Oportunidades --- */}
                <section className="panel-section">
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Vaga (Disciplina)</th>
                                    <th>Professor</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableContent(oportunidades, loading, error, 4) || 
                                    oportunidadesFiltradas.map((op) => (
                                        <tr key={op.id}>
                                            <td>{op.nome || op.disciplina}</td>
                                            <td>{op.professor_nome}</td>
                                            <td>
                                                <span className={`status-badge ${
                                                    op.status === 'Aberta' ? 'status-aprovado' : 'status-rejeitado' /* Reutilizando classes de badge */
                                                }`}>
                                                    {op.status}
                                                </span>
                                            </td>
                                            <td className="action-buttons-cell action-links">
                                                <Link to={`/administrador/editar-vaga/${op.id}`} className="button-table-action button-view">Ver/Editar</Link>
                                                
                                                <button 
                                                    className="button-table-action button-danger"
                                                    onClick={() => handleToggleStatus(op.id, op.status)}
                                                >
                                                    {op.status === 'Aberta' ? 'Fechar' : 'Reabrir'}
                                                </button>
                                            </td>
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

export default OportunidadesAdm;