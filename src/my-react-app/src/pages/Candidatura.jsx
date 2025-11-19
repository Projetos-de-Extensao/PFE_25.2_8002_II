import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Candidatura.css';

// URL base para buscar as opções dos selects (Json-Server)
const MOCK_API_BASE_URL = 'http://localhost:8000';
// URL para enviar a candidatura (API Real)
const REAL_API_CANDIDATURAS_URL = 'https://plataformacasa-a2a3d2abfd5e.herokuapp.com/api/candidaturas/'; 

// Função para extrair arrays de respostas da API
const extractArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.results)) return data.results;
    // Tenta chaves plurais comuns
    if (data && Array.isArray(data.disciplinas)) return data.disciplinas;
    if (data && Array.isArray(data.cursos)) return data.cursos;
    if (data && Array.isArray(data.periodos)) return data.periodos;
    return []; 
};

function Candidatura() {
    const navigate = useNavigate();
    
    // Estados para armazenar as listas vindas da API (substituindo os MOCKS constantes)
    const [disciplinasOptions, setDisciplinasOptions] = useState([]);
    const [cursosOptions, setCursosOptions] = useState([]);
    const [periodosOptions, setPeriodosOptions] = useState([]);

    // Estado do formulário
    const [dadosCandidato, setDadosCandidato] = useState({
        nomeCompleto: '',
        matricula: '',
        email: '',
        periodoCandidato: '', 
        cursoCandidato: '', 
        disciplinaMonitoria: '',
        justificativa: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. useEffect: Carrega as opções dos Selects ao abrir a página
    useEffect(() => {
        const loadOptions = async () => {
            setLoading(true);
            try {
                // Busca as 3 listas em paralelo no Json-Server
                const [resDisciplinas, resCursos, resPeriodos] = await Promise.all([
                    fetch(`${MOCK_API_BASE_URL}/disciplinas`).then(r => r.json()),
                    fetch(`${MOCK_API_BASE_URL}/cursos`).then(r => r.json()),
                    fetch(`${MOCK_API_BASE_URL}/periodos`).then(r => r.json())
                ]);

                setDisciplinasOptions(extractArray(resDisciplinas));
                setCursosOptions(extractArray(resCursos));
                setPeriodosOptions(extractArray(resPeriodos));
            } catch (err) {
                console.error("Erro ao carregar opções:", err);
                setError("Não foi possível carregar as listas de opções. Verifique se o Json-Server está rodando.");
            } finally {
                setLoading(false);
            }
        };
        loadOptions();
    }, []);

    const handleChange = (event) => {
        setDadosCandidato({
            ...dadosCandidato,
            [event.target.name]: event.target.value,
        });
    };

    // 2. Envio do Formulário
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Adapta os dados para o formato da API Real
        const payload = {
            aluno_nome: dadosCandidato.nomeCompleto,
            matricula: dadosCandidato.matricula,
            email: dadosCandidato.email,
            periodo_atual: dadosCandidato.periodoCandidato,
            curso: dadosCandidato.cursoCandidato,
            disciplina_id: dadosCandidato.disciplinaMonitoria, // Manda o value do select (ex: "Calculo I" ou ID)
            carta_motivacao: dadosCandidato.justificativa
        };

        try {
            const response = await fetch(REAL_API_CANDIDATURAS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Erro ${response.status} ao enviar.`);
            }

            alert(`Sucesso! Candidatura de ${dadosCandidato.nomeCompleto} enviada.`);
            
            // Limpa o formulário
            setDadosCandidato({
                nomeCompleto: '', matricula: '', email: '',
                periodoCandidato: '', cursoCandidato: '', 
                disciplinaMonitoria: '', justificativa: ''
            });
            
            // Redireciona para Minhas Candidaturas
            navigate('/aluno/candidaturas');

        } catch (err) {
            console.error("Erro no envio:", err);
            alert("Erro ao enviar candidatura. Tente novamente.");
        }
    };

    if (loading && disciplinasOptions.length === 0) {
        return <div className="container-candidatura" style={{textAlign:'center'}}>Carregando formulário...</div>;
    }

    return (
        <div className="container-candidatura">
            <h1>Formulário de Candidatura a Monitoria</h1>
            
            {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

            <form onSubmit={handleSubmit} className="formulario">
                
                {/* CAMPO NOME COMPLETO */}
                <div className="form-grupo">
                    <label htmlFor="nomeCompleto">Nome Completo</label>
                    <input
                        type="text"
                        id="nomeCompleto"
                        name="nomeCompleto"
                        value={dadosCandidato.nomeCompleto}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* CAMPO MATRÍCULA */}
                <div className="form-grupo">
                    <label htmlFor="matricula">Matrícula</label>
                    <input
                        type="text"
                        id="matricula"
                        name="matricula"
                        value={dadosCandidato.matricula}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                {/* CAMPO EMAIL */} 
                <div className="form-grupo">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dadosCandidato.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* CAMPO: SELECIONAR PERÍODO DO CANDIDATO */}
                <div className="form-grupo">
                    <label htmlFor="periodoCandidato">Seu Período</label>
                    <select
                        id="periodoCandidato"
                        name="periodoCandidato"
                        value={dadosCandidato.periodoCandidato}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione seu período</option>
                        {/* Usa o estado periodosOptions vindo da API */}
                        {periodosOptions.map((periodo) => (
                            <option key={periodo.value || periodo.id} value={periodo.value}>
                                {periodo.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* CAMPO: SELECIONAR CURSO DO CANDIDATO */}
                <div className="form-grupo">
                    <label htmlFor="cursoCandidato">Seu Curso</label>
                    <select
                        id="cursoCandidato"
                        name="cursoCandidato"
                        value={dadosCandidato.cursoCandidato}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione seu curso</option> 
                        {/* Usa o estado cursosOptions vindo da API */}
                        {cursosOptions.map((curso) => (
                            <option key={curso.value || curso.id} value={curso.value}>
                                {curso.label}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* CAMPO: DISCIPLINA DESEJADA (RESTIDUÍDO) */}
                <div className="form-grupo">
                    <label htmlFor="disciplinaMonitoria">Disciplina Desejada para Monitoria</label>
                    <select
                        id="disciplinaMonitoria"
                        name="disciplinaMonitoria"
                        value={dadosCandidato.disciplinaMonitoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione uma disciplina</option>
                        {/* Usa o estado disciplinasOptions vindo da API */}
                        {disciplinasOptions.map((disciplina) => (
                            <option key={disciplina.value || disciplina.id} value={disciplina.value}>
                                {disciplina.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* CAMPO JUSTIFICATIVA */}
                <div className="form-grupo">
                    <label htmlFor="justificativa">Por que você quer ser monitor?</label>
                    <textarea
                        id="justificativa"
                        name="justificativa"
                        value={dadosCandidato.justificativa}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="botao-enviar">Enviar Candidatura</button>
            </form>
        </div>
    );
}

export default Candidatura;