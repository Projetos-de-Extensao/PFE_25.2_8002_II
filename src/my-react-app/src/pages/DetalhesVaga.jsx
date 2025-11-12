import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DetalhesVaga.css';

const DetalhesVaga = () => {
  return (
    <div className="detalhes-vaga"> 
        <main>
        <h1 className="page-title">Detalhes da Vaga</h1>
        <h2 className="page-subtitle">Cálculo I</h2>
        <div className="detail-container">
            <p><span className="detail-text">Professor: </span><span className='detail-info'>João Silva</span></p>
            <p><span className="detail-text">Vagas: </span><span className='detail-info'>2</span></p>
            <p><span className="detail-text">Pré-requisitos: </span><span className='detail-info'>Ter sido aprovado em Cálculo I com média acima de 8</span></p>
            <p><span className="detail-text">Local: </span><span className='detail-info'>O monitor auxiliará os alunos com listas de exercícios e preparação para provas.</span></p>
        </div>
        {/* 3. O botão/link foi movido para o final da seção */}
          <div className="botao-link">
            <Link to="/Aluno" className="button-primary">
              Voltar
            </Link>
        </div>
          <div className="botao-link">
            <Link to="/aluno/candidaturas" className="button-primary">
              Candidatar-se á vaga
            </Link>
          </div>
        </main>
    </div>
  );
}

export default DetalhesVaga;