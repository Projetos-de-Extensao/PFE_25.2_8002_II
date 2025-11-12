import React, { useState } from 'react';
import './MarcarEntrevista.css';
import { useNavigate } from 'react-router-dom';

const MarcarEntrevista = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    data: '',
    horario: '',
    sala: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSolicitarEntrevista = (e) => {
    e.preventDefault();
    
    if (!formData.data || !formData.horario || !formData.sala) {
      alert('Por favor, preencha todos os campos para solicitar a entrevista');
      return;
    }

    console.log('Entrevista solicitada:', {
      aluno: 'Ana Beatriz Silva',
      matricula: '0000000001',
      materia: 'Cálculo III',
      ...formData
    });
    alert('Entrevista solicitada com sucesso!');
    
    // Limpar formulário
    setFormData({ data: '', horario: '', sala: '' });
  };

  const handleRecusarCandidatura = () => {
    console.log('Candidatura recusada para:', 'Ana Beatriz Silva');
    alert('Candidatura recusada!');
    
    // Limpar formulário
    setFormData({ data: '', horario: '', sala: '' });
  };

  const handleVoltar = () => {
    console.log('Voltando...');
    navigate('/DetalhesProfessor');
    // Navegação para voltar seria implementada aqui
    // Exemplo: navigate(-1) se estiver usando React Router
  };

  return (
    <div>
      <header className="entrevista-header">
          <h1>Professor: Marcar entrevista</h1>
          <h2>Monitoria de Cálculo III</h2>
        </header>

      <div className="entrevista-card">
        
        <div className="aluno-info">
          <div className="info-item">
            <strong>Aluno:</strong>
            <span>Ana Beatriz Silva</span>
          </div>
          <div className="info-item">
            <strong>Matrícula:</strong>
            <span>0000000001</span>
          </div>
        </div>

        <form className="entrevista-form">
          <div className="form-group">
            <label htmlFor="data">Data:</label>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="horario">Horário:</label>
            <input
              type="time"
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sala">Sala:</label>
            <input
              type="text"
              id="sala"
              name="sala"
              value={formData.sala}
              onChange={handleInputChange}
              placeholder="Digite a sala"
              className="form-input"
            />
          </div>

          <div className="botoes-acao">
            <button 
              type="button" 
              onClick={handleSolicitarEntrevista}
              className="btn btn-solicitar"
            >
              Solicitar Entrevista
            </button>
            
            <button 
              type="button" 
              onClick={handleRecusarCandidatura}
              className="btn btn-recusar"
            >
              Recusar Candidatura
            </button>
            
            <button 
              type="button" 
              onClick={handleVoltar}
              className="btn btn-voltar"
              Link to ='/DetalhesProfessor'
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarcarEntrevista;