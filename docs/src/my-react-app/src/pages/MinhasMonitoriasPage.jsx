import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MinhasMonitoriasPage.css'; 

// URL da API Real de Turmas (Principal)
const REAL_API_TURMAS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/turmas/'; 
// URL do Mock Server (Json-Server) para Professores e Calendário
const MOCK_API_BASE_URL = 'http://localhost:8000';
const MOCK_API_PROFESSORES_URL = `${MOCK_API_BASE_URL}/professores/`; 
const MOCK_API_CALENDARIO_URL = `${MOCK_API_BASE_URL}/calendario/`;

// URL da API Real de Salas
const REAL_API_SALAS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/salas/'; 

// --- MOCKS FIXOS PARA FALLBACKS (Cobrem as turmas sem dados na API Real) ---
const MOCK_PROFESSOR_FALLBACK = { 
    'Turma Banco de Dados - 2024.2': 'Prof. Mário Andrade',
    'Turma Programação I - 2024.2': 'Prof. Ana Silva'
};
const MOCK_HORARIO_FALLBACK = { 
    'Turma Banco de Dados - 2024.2': { horario: '14:00-16:00', dia: 'Terça', sala: '1' }, // Adicionado sala p/ fallback
    'Turma Programação I - 2024.2': { horario: '10:00-12:00', dia: 'Quarta', sala: '2' } // Adicionado sala p/ fallback
};
const MOCK_SALAS_FALLBACK = {
    // Estas chaves devem casar com o ID ou NUMERO retornado pela API
    '1': { nome: 'A-101 (Lab)', capacidade: 20 },
    '2': { nome: 'B-205', capacidade: 10 },
    '3': { nome: 'C-309', capacidade: 35 },
};
// -------------------------------------------------------------------


// Função auxiliar para extrair o array de forma segura
const extractArray = (data, preferredKey) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data[preferredKey])) return data[preferredKey];
    return data && Array.isArray(data.results) ? data.results : []; 
};

// Função para converter lista de objetos em um mapa chave-valor (para busca rápida)
const arrayToObjectMap = (array, keyField, valueField) => {
    return array.reduce((acc, item) => {
        if (item[keyField] !== undefined && item[valueField] !== undefined) {
            // Garante que a chave (ID) é uma string para busca consistente
            const key = String(item[keyField]); 
            // Usa o campo de valor especificado (e.g., 'nome')
            acc[key] = item[valueField]; 
        }
        return acc;
    }, {});
};


// Função para ENRIQUECER os dados
const enrichMonitorias = (turmas, professoresMap, salasMap, calendarioArray) => {
    
    // Cria mapas de Calendário (Horário -> Dia)
    const calendarioMap = arrayToObjectMap(calendarioArray, 'horario', 'dia');
    
    // Mapeia Horário -> Sala ID (usando o campo 'sala' do mock de calendário)
    const salasIdMap = calendarioArray.reduce((acc, item) => {
        if (item.horario && (item.sala_id || item.sala)) {
             // Garante que o ID da sala (o valor) é uma string consistente
             acc[String(item.horario)] = String(item.sala_id || item.sala); 
        }
        return acc;
    }, {});


    return turmas.map(turma => {
        
        const turmaNomeKey = turma.nome || '';

        // --- 1. ENRIQUECIMENTO DE PROFESSOR (Usa Mock Fallback) ---
        const professorIdLookup = String(turma.professor_id || turma.professor_fk || turma.prof_id || turma.professor || turma.professor_nome || ''); 
        const professorNome = professoresMap[professorIdLookup] || MOCK_PROFESSOR_FALLBACK[turmaNomeKey] || 'Professor não listado';

        // --- 2. ENRIQUECIMENTO DE HORÁRIO/DATA (Usa Mock Fallback) ---
        const horarioTurma = turma.horario || turma.horario_aula || turma.hora_inicio || turma.hora || turma.data_aula || MOCK_HORARIO_FALLBACK[turmaNomeKey]?.horario || '';
        const diaMonitoria = calendarioMap[horarioTurma] || MOCK_HORARIO_FALLBACK[turmaNomeKey]?.dia || 'N/A';
        
        // --- 3. ENRIQUECIMENTO DE SALA (INTEGRAÇÃO API REAL) ---
        
        // 1. Tenta buscar o ID da Sala pelo Mock Calendário (que usa o horário da turma)
        const salaIdFromHorario = salasIdMap[horarioTurma] || '';
        
        // 2. O ID de lookup será o que veio do horário, ou o que a própria turma deveria ter.
        const salaIdLookup = salaIdFromHorario || turma.sala_id || turma.sala || turma.numero || '';

        // 3. Busca o nome na API REAL de Salas (salasMap), ou usa o MOCK FALLBACK.
        const salaIdKey = String(salaIdLookup); // Garante string para consulta
        
        // Se a API Real de Salas não encontrou, tenta o Fallback MOCK
        const salaNome = salasMap[salaIdKey] || MOCK_SALAS_FALLBACK[salaIdKey]?.nome || 'Sala Indefinida';


        const tipoMonitoria = turma.monitor_id ? 'inscrito' : 'responsavel'; 

        return {
            ...turma,
            professor_nome_completo: professorNome, 
            dia_monitoria: diaMonitoria,
            sala_nome_completo: salaNome, 
            horario: horarioTurma, 
            tipo_monitoria: tipoMonitoria 
        };
    });
};


function MinhasMonitoriasPage() {
    const [monitorias, setMonitorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efeito para buscar os dados de todas as APIs em paralelo
    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchData = async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                const errorMessage = `Erro ${response.status} ao buscar ${url}`;
                console.error(`[ERRO DE FETCH] ${errorMessage}`);
                return { error: errorMessage, data: [] };
            }
            const data = await response.json();
            return { error: null, data };
        };

        const loadData = async () => {
            // Buscando as 4 fontes de dados em paralelo
            const [turmasResponse, professoresResponse, salasResponse, calendarioResponse] = await Promise.all([
                fetchData(REAL_API_TURMAS_URL),
                fetchData(MOCK_API_PROFESSORES_URL),
                fetchData(REAL_API_SALAS_URL), 
                fetchData(MOCK_API_CALENDARIO_URL) 
            ]);

            const turmas = extractArray(turmasResponse.data, 'turmas');

            if (turmasResponse.error && turmas.length === 0) {
                setError(turmasResponse.error);
                setLoading(false);
                return;
            }
            
            // 1. Processa Mocks/APIs de Enriquecimento
            const professoresArray = extractArray(professoresResponse.data, 'professores');
            const professoresMap = arrayToObjectMap(professoresArray, 'id', 'nome_completo');

            const salasArray = extractArray(salasResponse.data, 'salas');
            // Mapeamento CRÍTICO: Usa 'numero' como chave e 'nome' como valor, conforme a sua API REAL.
            const salasMap = arrayToObjectMap(salasArray, 'numero', 'nome'); 
            
            const calendarioArray = extractArray(calendarioResponse.data, 'calendario');

            // 2. Enriquecimento
            const turmasEnriquecidas = enrichMonitorias(turmas, professoresMap, salasMap, calendarioArray);
            
            setMonitorias(turmasEnriquecidas);
            setLoading(false);
        };

        loadData();
    }, []);

    // --- Renderização de Estado (Carregamento / Erro) ---
    if (loading) {
        return (
            <div className="minhas-monitorias-page loading">
                <h1 className="page-title">Carregando Minhas Monitorias...</h1>
                <p>Buscando dados de 4 diferentes fontes (APIs Turmas, Salas e Mock Professores, Calendário).</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="minhas-monitorias-page error">
                <h1 className="page-title error-title">Erro ao Carregar Monitorias</h1>
                <p className='error-message'>{error}</p>
                <p>Verifique o status do seu Json-Server (Porta 8000) e o acesso às APIs Heroku.</p>
            </div>
        );
    }

    return (
        <div className="minhas-monitorias-page">
            <h1 className="page-title">Minhas Monitorias</h1>

            <section className="card-grid monitorias-grid"> 
                
                {monitorias.length > 0 ? (
                    monitorias.map((monitoria) => {
                        const tipoMonitoria = monitoria.tipo_monitoria || (monitoria.monitor_id ? 'inscrito' : 'responsavel'); 
                        
                        return (
                            <article key={monitoria.id} className={`card-disciplina monitoria-card card-${tipoMonitoria}`}> 
                                <header>
                                    <Link to={`/monitoria/${monitoria.id}`}>
                                        <h3>{monitoria.vaga_nome || monitoria.nome || "Turma N/A"}</h3>
                                    </Link>
                                    <span className={`status-tag status-${tipoMonitoria}`}>{tipoMonitoria === 'responsavel' ? 'Monitor' : 'Aluno'}</span>
                                </header>
                                <div className="disciplina-info">
                                    {/* DADOS ENRIQUECIDOS E ORGANIZADOS */}
                                    <span className="info-row">
                                        <strong className="info-label">Professor(a):</strong> {monitoria.professor_nome_completo || "N/A"}
                                    </span>
                                    <span className="info-row">
                                        <strong className="info-label">Monitor(a):</strong> {monitoria.monitor_nome || (tipoMonitoria === 'responsavel' ? 'Você' : "A ser definido")}
                                    </span>
                                    
                                    <span className="info-row separator"></span> 

                                    <span className="info-row">
                                        <strong className="info-label">Dia:</strong> {monitoria.dia_monitoria || "N/A"}
                                    </span>
                                    <span className="info-row">
                                        <strong className="info-label">Horário:</strong> {monitoria.horario || "N/A"}
                                    </span>
                                    <span className="info-row">
                                        <strong className="info-label">Sala:</strong> {monitoria.sala_nome_completo || "N/A"}
                                    </span>
                                </div>
                                <footer className="monitoria-actions">
                                    {/* Links/Botões de ação */}
                                    <Link to={`/mensagens/${monitoria.id}`} className="button-table-action button-chat">
                                        Chat
                                    </Link>
                                    <Link to={`/monitoria/${monitoria.id}/detalhes`} className="button-table-action button-details">
                                        Ver Detalhes
                                    </Link>
                                    {tipoMonitoria === 'responsavel' && (
                                        <Link to={`/monitoria/${monitoria.id}/gerenciar`} className="button-table-action button-primary-small">
                                            Gerenciar
                                        </Link>
                                    )}
                                </footer>
                            </article>
                        );
                    })
                ) : (
                    // Mensagem caso não haja monitorias
                    <div className="admin-panel empty-state"> 
                        <p>Você ainda não está participando de nenhuma monitoria.</p>
                        <Link to="/aluno/vagas" className="button-primary-large">Buscar Vagas</Link> 
                    </div>
                )}

            </section>
        </div>
    );
}

export default MinhasMonitoriasPage;