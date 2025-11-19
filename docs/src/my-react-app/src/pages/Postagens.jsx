import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Postagens.css'; 

// URL do Json-Server para postagens (continua no plural, pois é a regra do json-server)
const MOCK_API_POSTAGENS_URL = 'http://localhost:8000/postagem/';

// Função auxiliar para extrair o array de forma segura
const extractArray = (data) => {
    if (Array.isArray(data)) return data;
    
    // Tenta extrair da chave singular 'postagem' primeiro, conforme a coleção do db.json
    if (data && Array.isArray(data.postagem)) return data.postagem;

    // Tenta extrair da chave plural padrão do json-server
    if (data && Array.isArray(data.postagens)) return data.postagens;
    
    // Retorna array vazio em caso de estrutura desconhecida
    return [];
};

function Postagens() {
    const [postagens, setPostagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efeito para buscar os dados das postagens
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(MOCK_API_POSTAGENS_URL)
            .then(response => {
                if (!response.ok) {
                    // Lança um erro se o status for 404 (provavelmente o servidor)
                    throw new Error(`Erro ${response.status} ao buscar postagens. Verifique o Json-Server.`);
                }
                return response.json();
            })
            .then(data => {
                // Usa a função atualizada para extrair o array (priorizando 'postagem' singular)
                const postagensArray = extractArray(data);
                
                // Mapeamento: Garantindo que os campos 'autor' e 'status' sejam usados
                const postagensFormatadas = postagensArray.map(post => ({
                    id: post.id,
                    titulo: post.titulo || post.nome || "Postagem sem Título",
                    // ATUALIZADO: Usando 'autor' diretamente com fallback
                    autor: post.autor || post.usuario || "Admin", 
                    // Prioriza data_publicacao se existir no mock
                    data: post.data_publicacao || post.data || "N/A", 
                    // ATUALIZADO: Usando 'status' diretamente com fallback
                    status: post.status || (post.publicado ? "Publicado" : "Rascunho") 
                }));

                setPostagens(postagensFormatadas);
            })
            .catch(err => {
                console.error("Erro no fetch de postagens:", err);
                // Mensagem de erro ajustada para incluir o diagnóstico singular/plural
                setError(err.message || "Erro de rede no Json-Server (Porta 8000). Verifique se a coleção 'postagem' existe no db.json.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); 


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
                <button className="button-table-action button-danger">Excluir</button>
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
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px'}}>Nenhuma postagem encontrada.</td></tr>;
        }
        return null;
    };


    return (
        <div className="postagens-page"> 

            {/* Título da Página */}
            <h1 className="page-title">Administrador: Gerenciar Postagens</h1>

            {/* O Painel Principal */}
            <div className="admin-panel">

                {/* Cabeçalho do Painel (Links de navegação) */}
                <header className="panel-header">
                    <nav className="panel-nav">
                        {/* Mantendo os links consistentes com o Admfeed */}
                        <Link to="/administrador/postagens">Postagens</Link>
                        <Link to="/administrador/oportunidades">Oportunidades</Link>
                        <Link to="/administrador/gerenciarsalas">Salas</Link>
                        <Link to="/administrador/gerenciarpedidos">Pedidos</Link> 
                    </nav>
                </header>

                {/* Seção: Barra de Busca e Ação */}
                <section className="panel-section filter-bar">
                    <div className="search-group">
                        <label htmlFor="search-postagem">Buscar Postagem:</label>
                        <input type="text" id="search-postagem" className="form-input-inline" placeholder="Digite o título..." />
                        <button className="button-secondary">Buscar</button>
                    </div>
                    <button className="button-primary">+ Nova Postagem</button>
                </section>

                {/* Seção: Tabela de Postagens */}
                <section className="panel-section">
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Título da Postagem</th>
                                    <th>Autor</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableContent(postagens, loading, error, 5) || 
                                postagens.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.titulo}</td>
                                        <td>{post.autor}</td>
                                        <td>{post.data}</td>
                                        <td>
                                            {/* Badge de status dinâmica */}
                                            <span className={`status-badge ${
                                                post.status === 'Publicado' ? 'status-aprovado' : 'status-rascunho'
                                            }`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="action-buttons-cell action-links">
                                            {getActionButtons(post)}
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

export default Postagens;