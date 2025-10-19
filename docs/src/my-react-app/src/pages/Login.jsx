import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

// Importa os componentes Header e Footer (Assumindo "../components/")
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const Login = () => {
  return (
    <div className="login-page-wrapper">
      
      {/* 1. HEADER */}
      <Header /> 

      {/* 2. CONTEÚDO PRINCIPAL (Centralizado) */}
      <main className="login-senha-page"> 
        <div className="login-senha-card">
          
          <header className="card-header">
            <h1>Sistema de Monitorias</h1>
            <h2>Login</h2>
          </header>

          {/* Formulário de Login */}
          <form className="login-form">
            
            {/* Campo Usuário/Matrícula */}
            <label htmlFor="input-usuario">Usuário (Matrícula/ID)</label>
            <input
              type="text"
              id="input-usuario"
              className="input-field"
              placeholder="Digite sua Matrícula ou ID"
              required
            />

            {/* Campo Senha */}
            <label htmlFor="input-senha">Senha</label>
            <input
              type="password" // Tipo 'password' para ocultar a senha
              id="input-senha"
              className="input-field"
              placeholder="Digite sua senha"
              required
            />

            <button type="submit" className="btn-entrar">
              Entrar
            </button>
          </form>

          {/* Link Esqueceu sua senha? */}
          <div className="esqueceu-senha">
            {/* O "to" deve apontar para a rota que configuramos no main.jsx */}
            <Link to="/recuperacao-senha">Esqueceu sua senha?</Link> 
          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <Footer /> 

    </div>
  );
};

export default Login;