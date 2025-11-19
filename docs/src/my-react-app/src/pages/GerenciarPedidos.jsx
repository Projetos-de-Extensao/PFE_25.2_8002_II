import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GerenciarPedidos.css'; 

const REAL_API_DISCIPLINAS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/disciplinas/'; 
const REAL_API_ALUNOS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/alunos/'; 
const REAL_API_SALAS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/salas/'; 


// Função para buscar dados e tratar erros
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar dados de ${url}`);
    }
    return response.json();
};

// Função auxiliar para extrair o array de forma segura
const extractArray = (data, preferredKey) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data[preferredKey])) return data[preferredKey];
    return data && Array.isArray(data.results) ? data.results : [];
};

function GerenciarPedidos() { 
    const [pedidosUnificados, setPedidosUnificados] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState("Todos"); 
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    // Efeito para buscar todos os dados de diferentes fontes
    useEffect(() => {
        const loadAllRequests = async () => {
            setLoading(true);
            setErro(null);

            try {
                // 1. Buscando dados de 3 APIs Reais diferentes
                const [disciplinas, salas, alunos] = await Promise.all([
                    fetchData(REAL_API_DISCIPLINAS_URL).catch(e => { console.error("Erro Disciplinas:", e); return []; }),
                    fetchData(REAL_API_SALAS_URL).catch(e => { console.error("Erro Salas:", e); return []; }), // AGORA USA A API REAL
                    fetchData(REAL_API_ALUNOS_URL).catch(e => { console.error("Erro Alunos:", e); return []; })
                ]);
                
                // 2. Extraindo e Padronizando (Mock de Dados Reais)
                
                // Pedidos de Monitoria (vindo de /disciplinas/)
                const pedidosMonitoria = extractArray(disciplinas, 'disciplinas').slice(0, 3).map((item, index) => ({
                    id: `MON-${item.codigo || index}`,
                    tipo: "Monitoria",
                    solicitante: item.professor || "Prof. Marcos Pereira",
                    detalhe: item.nome || item.disciplina || "Disciplina N/A",
                    data: "25/11/25", // Mock de data
                    status: index === 0 ? "Pendente" : "Aprovado",
                    linkDetalhe: `/professor/pedido/monitoria/${item.codigo || index}`
                }));

                // Pedidos de Reserva de Sala (vindo de /salas/)
                const pedidosSala = extractArray(salas, 'salas').slice(0, 2).map((item, index) => ({
                    id: `SALA-${item.id || index}`,
                    tipo: "Reserva Sala",
                    solicitante: item.solicitante || "João Silva",
                    detalhe: `${item.numero}` || "Sala N/A",
                    data: "24/11/25",
                    status: "Pendente",
                    linkDetalhe: `/professor/pedido/sala/${item.id || index}`
                }));

                // Pedidos de Cadastro (vindo de /alunos/)
                const pedidosCadastro = extractArray(alunos, 'alunos').slice(0, 2).map((item, index) => ({
                    id: `CAD-${item.matricula || index}`,
                    tipo: "Cadastro",
                    solicitante: item.nome || "Novo Aluno",
                    detalhe: item.curso || "Monitoria Nova",
                    data: "22/11/25",
                    status: index === 0 ? "Pendente" : "Rejeitado",
                    linkDetalhe: `/professor/pedido/cadastro/${item.matricula || index}`
                }));

                // 3. Unindo e Armazenando
                const todosPedidos = [...pedidosMonitoria, ...pedidosSala, ...pedidosCadastro];
                setPedidosUnificados(todosPedidos);

            } catch (err) {
                // Captura erro de rede ou falha crítica em fetchData
                console.error("Erro crítico ao carregar pedidos:", err);
                setErro("Erro ao carregar dados. Alguma API Real pode estar offline.");
            } finally {
                setLoading(false);
            }
        };

        loadAllRequests();
    }, []); 

    // 4. Lógica de Filtro
    const pedidosFiltrados = pedidosUnificados.filter(pedido => 
        filtroTipo === "Todos" || pedido.tipo === filtroTipo
    );

    const getActionButtons = (pedido) => {
        // Link para a página de detalhes, usando o ID e o tipo para direcionar
        const detailUrl = pedido.linkDetalhe || `/professor/pedido/detalhe/${pedido.id}`;

        switch (pedido.status) {
            case 'Pendente':
                return (
                    <>
                        <Link to={detailUrl} className="action-button-link button-view">Ver Detalhes</Link> |
                        <button className="action-button-link button-success">Aprovar</button> 
                    </>
                );
            case 'Aprovado':
            case 'Rejeitado':
                return (
                    <Link to={detailUrl} className="button-table-action button-view">Ver</Link>
                );
            default:
                return null;
        }
    };

    // --- Renderização de Estado (Carregamento / Erro Global) ---
    if (loading) {
        return (
            <div className="gerenciar-pedidos-page loading">
                <h1 className="page-title">Carregando Pedidos (Monitoria, Salas, Cadastro)...</h1>
                <p>Aguardando resposta de 3 diferentes fontes de dados.</p>
            </div>
        );
    }

    return (
        <div className="gerenciar-pedidos-page">
            <h1 className="page-title">Administrador: Gerenciar Todos os Pedidos</h1>

            <div className="admin-panel">
                <header className="panel-header">
                    <nav className="panel-nav">
                        <Link to="/administrador/postagens">Postagens</Link>
                        <Link to="/administrador/oportunidades">Oportunidades</Link>
                        <Link to="/administrador/gerenciarsalas">Salas</Link>
                        <Link to="/administrador/gerenciarpedidos">Pedidos</Link>
                    </nav>
                </header>

                <section className="panel-section filter-bar pedidos-filter">
                    
                    <div className="filter-group">
                        <label htmlFor="filtro-tipo">Filtrar por Tipo:</label> 
                        <select 
                            id="filtro-tipo" 
                            className="filter-select" 
                            value={filtroTipo} 
                            onChange={(e) => setFiltroTipo(e.target.value)} 
                        >
                            <option value="Todos">Todos ({pedidosUnificados.length})</option>
                            <option value="Monitoria">Monitoria</option>
                            <option value="Reserva Sala">Reserva Sala</option>
                            <option value="Cadastro">Cadastro de Monitor</option> 
                        </select>
                    </div>

                    {erro && (
                        <span className='error-message-inline'>
                            Erro na API: {erro}
                        </span>
                    )}

                    <div className="filter-group">
                        <button className="button-secondary">Aplicar Filtros</button> 
                    </div>
                </section>

                <section className="panel-section">
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Solicitante</th>
                                    <th>Detalhe</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidosFiltrados.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>
                                            Nenhum pedido encontrado com o filtro atual.
                                        </td>
                                    </tr>
                                )}
                                {pedidosFiltrados.map((pedido) => (
                                    <tr key={pedido.id}>
                                        <td>{pedido.tipo}</td>
                                        <td>{pedido.solicitante}</td>
                                        <td>{pedido.detalhe}</td>
                                        <td>{pedido.data}</td>
                                        <td>
                                            {/* Adaptando as classes para o CSS */}
                                            <span className={`status-badge status-${pedido.status.toLowerCase().replace(' ', '-')}`}>
                                                {pedido.status}
                                            </span>
                                        </td>
                                        <td className="action-links"> 
                                            {getActionButtons(pedido)}
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

export default GerenciarPedidos;