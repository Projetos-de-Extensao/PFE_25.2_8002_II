import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DetalhesProfessor.css';

const DetalhesProfessor = () => {
  return (
    <div>
      <main>
        <h1 className="page-title">Monitoria de Calculo I</h1>
        <h2 className="page-subtitle">Detalhes do Candidato</h2>
        <div className="detail-container">
          <p><span className="detail-text">Nome: </span><span className='detail-info'>Ana Beatriz Moreira Santos</span></p>
          <p><span className="detail-text">Matricula: </span><span className='detail-info'>202207348295</span></p>
          <p><span className="detail-text">Curso: </span><span className='detail-info'>Engenharia da Computação</span></p>
          <p><span className="detail-text">CR: </span><span className='detail-info'>8.9</span></p>
          <p><span className="detail-text">Carta de Motivação: </span><span className='detail-info'>Tenho grande interesse em ajudar os alunos a compreender melhor os conceitos de cálculo e estou disposto a dedicar meu tempo para isso.</span></p>
        </div>
        {/* 3. O botão/link foi movido para o final da seção */}
        <div className="entrevista-link">
          <Link to="/professor/marcar-entrevista" className="button-primary">
            Marcar Entrevista
          </Link>
        </div>
        <div className="rejeitar-link">
          <Link to="/RejeitarAluno" className="button-primary">
            Rejeitar Candidato
          </Link>
        </div>
        <div className="botao-link">
          <Link to="/HomePage" className="button-primary">
            Voltar
          </Link>
        </div>
      </main>
    </div>
  );
}

export default DetalhesProfessor;