import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfessorPostagens.css'; 

// URL do Json-Server para postagens (continua no plural, pois é a regra do json-server)
const MOCK_API_POSTAGENS_URL = 'http://localhost:8000/postagem/';

// Função auxiliar para extrair o array de forma segura
const extractArray = (data) => {
    if (Array.isArray(data)) return data;
    
    // Prioriza a chave singular 'postagem' e a plural 'postagens'
    if (data && Array.isArray(data.postagem)) return data.postagem;
    if (data && Array.isArray(data.postagens)) return data.postagens;
    
    return [];
};

function ProfessorPostagens() {
    const [postagensBrutas, setPostagensBrutas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('Todas');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efeito para buscar os dados das postagens
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(MOCK_API_POSTAGENS_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao buscar postagens. Verifique o Json-Server.`);
                }
                return response.json();
            })
            .then(data => {
                const postagensArray = extractArray(data);
                
                // Mapeamento: Adiciona campos de MOCK para simular Tipo e Disciplina,
                // já que o endpoint /postagens/ não os envia por padrão.
                const postagensFormatadas = postagensArray.map((post, index) => ({
                    id: post.id,
                    titulo: post.titulo || post.nome || "Postagem sem Título",
                    autor: post.autor || post.usuario || "Professor",
                    data: post.data_publicacao || post.data || "N/A", 
                    status: post.status || (post.publicado ? "Publicado" : "Rascunho"),
                    
                    // MOCK DE ENRIQUECIMENTO (Para funcionalidade de filtro e exibição na tabela):
                    tipo: index % 3 === 0 ? "Oportunidade" : "Aviso",
                    disciplina: index % 2 === 0 ? "Cálculo I" : "Programação I"
                }));

                setPostagensBrutas(postagensFormatadas);
            })
            .catch(err => {
                console.error("Erro no fetch de postagens:", err);
                setError(err.message || "Erro de rede no Json-Server (Porta 8000).");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); 

    // Lógica de Filtro e Busca
    const postagensFiltradas = postagensBrutas
        // Filtra por termo de busca
        .filter(post => post.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
        // Filtra por tipo (Oportunidade, Aviso, Todas)
        .filter(post => filtroTipo === 'Todas' || post.tipo === filtroTipo);


    // Função para determinar os botões de ação com base no status
    const getActionButtons = (post) => {
        const isPublicado = post.status === 'Publicado';

        return (
            <>
                <button className="button-table-action button-edit">Editar</button>
                <button className="button-table-action button-view">Ver</button>
                <button className={`button-table-action ${isPublicado ? 'button-secondary' : 'button-success'}`}>
                    {isPublicado ? 'Despublicar' : 'Publicar'}
                </button>
            </>
        );
    };

    // --- Renderização de Estado (Carregamento / Erro Global) ---
    const renderTableContent = (data, loading, error, columns) => {
        if (loading) {
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px'}}>Carregando postagens...</td></tr>;
        }
        if (error) {
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px', color: 'red'}}>Erro: {error}</td></tr>;
        }
        if (!Array.isArray(data) || data.length === 0) {
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px'}}>Nenhuma postagem encontrada com o filtro atual.</td></tr>;
        }
        return null;
    };


    return (
        <div className="professor-postagens-page"> 

            <h1 className="page-title">Professor: Gerenciar Postagens</h1>

            <div className="admin-panel">

                <header className="panel-header">
                    <nav className="panel-nav">
                        <Link to="/professor">Home</Link>
                        <Link to="/professor/processo-seletivo">Processo Seletivo</Link>
                        <Link to="/professor/postagens">Postagens</Link> {/* Link Ativo */}
                    </nav>
                </header>

                {/* Seção: Barra de Busca e Ações */}
                <section className="panel-section header-section">
                    <h2>Minhas Postagens e Oportunidades</h2>
                    <div className="action-bar">
                        <div className="search-group">
                            <label htmlFor="search-input">Buscar Postagem:</label>
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Digite o título..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input form-input-inline"
                            />
                            <button className="button-secondary search-button">Buscar</button>
                        </div>
                        <Link to="/professor/nova-postagem" className="button-primary">+ Nova Postagem/Oportunidade</Link>
                    </div>
                </section>


                {/* Seção: Filtro de Tipo */}
                <section className="panel-section filter-bar-simple">
                    <label>Filtrar por Tipo:</label>
                    <button 
                        className={`filter-button ${filtroTipo === 'Todas' ? 'filter-active' : ''}`} 
                        onClick={() => setFiltroTipo('Todas')}
                    >
                        Todas
                    </button>
                    <button 
                        className={`filter-button ${filtroTipo === 'Oportunidade' ? 'filter-active' : ''}`} 
                        onClick={() => setFiltroTipo('Oportunidade')}
                    >
                        Oportunidades
                    </button>
                    <button 
                        className={`filter-button ${filtroTipo === 'Aviso' ? 'filter-active' : ''}`} 
                        onClick={() => setFiltroTipo('Aviso')}
                    >
                        Avisos
                    </button>
                </section>

                {/* Seção: Tabela de Postagens */}
                <section className="panel-section">
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Título da Postagem</th>
                                    <th>Tipo</th>
                                    <th>Disciplina</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableContent(postagensFiltradas, loading, error, 6) ||
                                postagensFiltradas.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.titulo}</td>
                                        <td>{post.tipo}</td>
                                        <td>{post.disciplina}</td>
                                        <td>{post.data}</td>
                                        <td>
                                            {/* Badge de status dinâmica */}
                                            <span className={`status-badge ${
                                                post.status === 'Publicado' ? 'status-aprovado' : 
                                                'status-rascunho'
                                            }`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="action-buttons-cell">
                                            {getActionButtons(post)}
                                            <button className="button-table-action button-danger">Excluir</button>
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

export default ProfessorPostagens;