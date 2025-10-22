import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

// REMOVI os imports do Header e do Footer daqui

const Login = () => {
  return (
    <div className="login-page-wrapper">
      
      {/* O Header foi REMOVIDO */}

      {/* O conteúdo principal continua o mesmo */}
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
              type="password"
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
            <Link to="/esquecisenha">Esqueceu sua senha?</Link> 
          </div>
        </div>
      </main>

      {/* O Footer foi REMOVIDO */}

    </div>
  );
};

export default Login;