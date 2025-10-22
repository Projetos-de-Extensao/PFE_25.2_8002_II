import React from 'react';
import { Link } from 'react-router-dom';
import './Esquecisenha.css';

// Importa os componentes Header e Footer da pasta 'components'
import Header from '../components/Header.jsx'; 
import Footer from '../components/Footer.jsx'; 

const Esquecisenha = () => {
  return (
    <div className="recuperacao-page-wrapper">
      
      {/* 1. HEADER */}
      <Header /> 

      {/* 2. CONTEÚDO PRINCIPAL (Centralizado) */}
      <main className="recuperacao-senha-page"> 
        <div className="recuperacao-senha-card">
          
          <header className="card-header">
            <h1>Sistema de Monitorias</h1>
            <h2>Recuperação de Senha</h2>
          </header>

          <p className="instrucao">
            Digite seu email ou matrícula para receber o link de recuperação.
          </p>

          {/* Formulário */}
          <form className="recuperacao-form">
            <label htmlFor="input-recuperacao">Email / Matrícula</label>
            <input
              type="email"
              id="input-recuperacao"
              className="input-field"
              placeholder="Digite seu email ou matrícula"
              required
            />

            <button type="submit" className="btn-enviar">
              Enviar Link de Recuperação
            </button>
          </form>

          {/* Link para voltar ao Login */}
          <div className="voltar-login">
            {/* O "to" deve ser ajustado para a rota real de login */}
            <Link to="/">Voltar para o Login</Link> 
          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <Footer /> 

    </div>
  );
};

export default Esquecisenha;