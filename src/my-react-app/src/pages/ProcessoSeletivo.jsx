import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProcessoSeletivo.css'; 

// URL da API Real de Inscrições
const REAL_API_INSCRICOES_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/inscricoes/'; 

// --- SIMULAÇÃO DE DADOS MOCKADOS (ETAPAS) ---
const mockEtapas = [
    { id: 'analise', nome: "Análise Currículos" },
    { id: 'entrevista', nome: "Entrevista" },
    { id: 'prova', nome: "Prova Técnica" }
];

// Função auxiliar para extrair o array de forma segura
const extractArray = (data, preferredKey) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data[preferredKey])) return data[preferredKey];
    // Tenta extrair de chaves comuns de APIs de listagem
    return data && Array.isArray(data.results) ? data.results : []; 
};

function ProcessoSeletivo() {
    const [etapas, setEtapas] = useState(mockEtapas);
    const [candidatosBrutos, setCandidatosBrutos] = useState([]);
    
    const [etapaSelecionada, setEtapaSelecionada] = useState(mockEtapas[0]?.id || 'analise'); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. FETCH para Candidatos (Inscrições)
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(REAL_API_INSCRICOES_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao buscar inscrições.`);
                }
                return response.json();
            })
            .then(data => {
                const inscricoesArray = extractArray(data, 'inscricoes');
                
                // Mapeamento e Enriquecimento:
                const candidatosMapeados = inscricoesArray.map((inscricao, index) => ({
                    id: inscricao.id || inscricao.aluno_id || index,
                    // Assume que o nome do candidato está disponível
                    nome: inscricao.aluno_nome || inscricao.nome || `Candidato ${inscricao.id || index}`, 
                    // Assume que o status da etapa está disponível
                    status: inscricao.status_etapa_atual || inscricao.status || 'Pendente',
                    // MOCK DE ETAPA: Para simular o filtro, distribuímos os candidatos em 3 etapas
                    etapa_id: mockEtapas[index % mockEtapas.length].id 
                }));

                setCandidatosBrutos(candidatosMapeados);
            })
            .catch(err => {
                console.error("Erro no fetch de inscrições:", err);
                setError(err.message || "Erro de rede na API Real de Inscrições.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // 2. Lógica de Filtro
    const candidatosFiltrados = candidatosBrutos.filter(cand => 
        cand.etapa_id === etapaSelecionada
    );
    
    // 3. Renderização de Estado (Carregamento / Erro Global)
    const renderTableContent = (data, loading, error, columns) => {
        if (loading) {
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px'}}>Carregando candidatos...</td></tr>;
        }
        if (error) {
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px', color: 'red'}}>Erro: {error}</td></tr>;
        }
        if (!Array.isArray(data) || data.length === 0) {
            return <tr><td colSpan={columns} style={{textAlign: 'center', padding: '20px'}}>Nenhum candidato encontrado nesta etapa.</td></tr>;
        }
        return null;
    };


    return (
        <div className="processo-seletivo-page"> 

            <h1 className="page-title">Professor: Gerenciar Processo Seletivo</h1>

            <div className="admin-panel">

                {/* Cabeçalho do Painel (Links de navegação) */}
                <header className="panel-header">
                    <nav className="panel-nav">
                        <Link to="/professor">Home</Link>
                        <Link to="/professor/processo-seletivo">Processo Seletivo</Link>
                        <Link to="/professor/postagens">Postagens</Link>
                    </nav>
                </header>

                {/* Seção: Filtro de Etapa */}
                <section className="panel-section filter-etapa-bar">
                    <div className="filter-group">
                        <label htmlFor="etapa-select">Filtrar por Etapa:</label>
                        <select
                            id="etapa-select"
                            value={etapaSelecionada}
                            onChange={(e) => setEtapaSelecionada(e.target.value)}
                            className="filter-select"
                        >
                            {etapas.map(etapa => (
                                <option key={etapa.id} value={etapa.id}>{etapa.nome}</option>
                            ))}
                        </select>
                    </div>
                    <button className="button-primary">+ Adicionar Etapa</button>
                </section>

                {/* Seção: Tabela de Candidatos da Etapa */}
                <section className="panel-section">
                    <h3>Candidatos - {etapas.find(e => e.id === etapaSelecionada)?.nome || 'Etapa'}</h3>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Candidato</th>
                                    <th>Status na Etapa</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableContent(candidatosFiltrados, loading, error, 3) ||
                                candidatosFiltrados.map((cand) => (
                                    <tr key={cand.id}>
                                        <td>{cand.nome}</td>
                                        <td>
                                            {/* Badge de status dinâmica */}
                                            <span className={`status-badge ${
                                                cand.status === 'Aprovado' ? 'status-aprovado' :
                                                cand.status === 'Reprovado' ? 'status-rejeitado' :
                                                'status-pendente' // Pendente ou outro
                                            }`}>
                                                {cand.status}
                                            </span>
                                        </td>
                                        <td className="action-buttons-cell-radio">
                                            {/* Botões de rádio para Aprovar/Reprovar */}
                                            <label className="radio-label radio-aprovado">
                                                <input type="radio" name={`status-${cand.id}`} value="aprovado" defaultChecked={cand.status === 'Aprovado'}/> Aprovar
                                            </label>
                                            <label className="radio-label radio-reprovado">
                                                <input type="radio" name={`status-${cand.id}`} value="reprovado" defaultChecked={cand.status === 'Reprovado'}/> Reprovar
                                            </label>
                                            <Link to={`/professor/detalhes-candidato/${cand.id}`} className="button-table-action button-view-details">Detalhes</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="salvar-etapa-link">
                        <button className="button-primary button-save">Salvar Alterações da Etapa</button>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default ProcessoSeletivo;