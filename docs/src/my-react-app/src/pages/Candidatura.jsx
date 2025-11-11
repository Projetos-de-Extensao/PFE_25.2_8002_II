import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Candidatura.css';

const MOCK_DISCIPLINAS = [
    { value: 'Calculo I', label: 'Cálculo I' },
    { value: 'Calculo II', label: 'Cálculo II' },
    { value: 'Algoritmos', label: 'Algoritmos e Estruturas de Dados' },
    { value: 'EngenhariaSoftware', label: 'Engenharia de Software' },
    { value: 'MatemáticaDiscreta', label: 'Matemática discreta' },
    { value: 'ProgramacaoEstruturada', label: 'Programação Estruturada' },
];

const MOCK_CURSOS = [
    { value: 'EngenhariaComputacao', label: 'Engenharia da Computação' },
    { value: 'CienciadeDados', label: 'Ciência de dados e inteligência artificial' },
    { value: 'EngenhariaSoftware', label: 'Engenharia de Software' },
    { value: 'EngenhariaProducao', label: 'Engenheria de produção' },
    { value: 'EngenhariaCivil', label: 'Engenharia Civil' },
];

const MOCK_PERIODOS = [
    { value: '1Periodo', label: '1º Período' },
    { value: '2Periodo', label: '2º Período' },
    { value: '3Periodo', label: '3º Período' },
    { value: '4Periodo', label: '4º Período' },
    { value: '5Periodo', label: '5º Período' },
    { value: '6Periodo', label: '6º Período' },
    { value: '7Periodo', label: '7º Período' },
    { value: '8Periodo', label: '8º Período' },
    { value: '9Periodo', label: '9º Período' },
    { value: '10Periodo', label: '10º Período' },
]
// 1. O COMPONENTE FUNCIONAL
function Candidatura() {
    
    // ATUALIZAÇÃO DO USESTATE: Adicionamos a nova chave 'cursoCandidato'
    const [dadosCandidato, setDadosCandidato] = useState({
        nomeCompleto: '',
        matricula: '',
        email: '',
        periodoCandidato: '', 
        cursoCandidato: '', 
        disciplinaMonitoria: '',
        justificativa: ''
    });

    const handleChange = (event) => {
        setDadosCandidato({
            ...dadosCandidato,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Simulação do envio (usando o mock)
        console.log("Dados da Candidatura (MOCK):", dadosCandidato);
        
        alert(`Candidatura de ${dadosCandidato.nomeCompleto} para monitoria de ${dadosCandidato.disciplinaMonitoria} enviada com sucesso! (Simulação)`);
        
        // Limpa o formulário
        setDadosCandidato({
            nomeCompleto: '',
            matricula: '',
            email: '',
            periodoCandidato: '',
            cursoCandidato: '',
            disciplinaMonitoria: '',
            justificativa: ''
        });
    };

    return (
        <div className="container-candidatura">
            <h1>Formulário de Candidatura a Monitoria</h1>
            <form onSubmit={handleSubmit} className="formulario">
                
                {/* CAMPO NOME COMPLETO */}
                <div className="form-grupo">
                    <label htmlFor="nomeCompleto">Nome Completo</label>
                    <input
                        type="text"
                        id="nomeCompleto"
                        name="nomeCompleto" // ESSENCIAL: Liga este input à chave no estado
                        value={dadosCandidato.nomeCompleto} // O valor exibido é o que está no estado
                        onChange={handleChange} // O que acontece quando o valor muda
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
                        {/* Primeira opção em branco, desabilitada e selecionada inicialmente */}
                        <option value="" disabled>Selecione seu período</option>
                        
                        {/* ✅ CORREÇÃO: Iteração movida para DENTRO do select */}
                        {MOCK_PERIODOS.map((periodo) => (
                            <option key={periodo.value} value={periodo.value}>
                                {periodo.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/*CAMPO: SELECIONAR CURSO DO CANDIDATO */}
                <div className="form-grupo">
                    <label htmlFor="cursoCandidato">Seu Curso</label>
                    <select
                        id="cursoCandidato"
                        name="cursoCandidato"
                        value={dadosCandidato.cursoCandidato}
                        onChange={handleChange}
                        required
                    >
                        {/* Primeira opção em branco, desabilitada e selecionada inicialmente */}
                        <option value="" disabled>Selecione seu curso</option> 
                        
                        {/* Iterando sobre o MOCK_CURSOS para criar as opções */}
                        {MOCK_CURSOS.map((curso) => (
                            <option key={curso.value} value={curso.value}>
                                {curso.label}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* CAMPO: DISCIPLINA DESEJADA (AGORA COM OPÇÕES) */}
                <div className="form-grupo">
                    <label htmlFor="disciplinaMonitoria">Disciplina Desejada para Monitoria</label>
                    <select
                        id="disciplinaMonitoria"
                        name="disciplinaMonitoria"
                        value={dadosCandidato.disciplinaMonitoria}
                        onChange={handleChange}
                        required
                    >
                        {/* Primeira opção em branco, desabilitada e selecionada inicialmente */}
                        <option value="" disabled>Selecione uma disciplina</option>
                        
                        {/* Iterando sobre o MOCK_DISCIPLINAS para criar as opções */}
                        {MOCK_DISCIPLINAS.map((disciplina) => (
                            <option key={disciplina.value} value={disciplina.value}>
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

                {/* CAMPO JUSTIFICATIVA (permanece igual) */}
                {/* ... (código omitido para brevidade) ... */}

                <button type="submit" className="botao-enviar">Enviar Candidatura</button>
            </form>
        </div>
    );
}

export default Candidatura;