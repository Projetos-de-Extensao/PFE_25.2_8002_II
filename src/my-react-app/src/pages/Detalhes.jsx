import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Detalhes.css';


const Detalhes = () => {
  return (
    <div className="detalhes">
        <main>
        <h1 className="page-title">Detalhes da Monitoria</h1>
        <h2 className="page-subtitle">Calculo I</h2>
        <div className="detail-container">
            <p><span className="detail-text">Professor: </span><span className='detail-info'>João Silva</span></p>
            <p><span className="detail-text">Monitor: </span><span className='detail-info'>Ana Beatriz</span></p>
            <p><span className="detail-text">Horário: </span><span className='detail-info'>Segunda,14:00 - 16:00</span></p>
            <p><span className="detail-text">Local: </span><span className='detail-info'>201</span></p>
            <p><span className="detail-text">Status: </span><span className='detail-info'>Ativa</span></p>
        </div>
        {/* 3. O botão/link foi movido para o final da seção */}
          <div className="voltar-link">
            <Link to="/AlunoPage" className="button-primary">
              Voltar
            </Link>
          </div>
        </main>
    </div>
  );
}

export default Detalhes;