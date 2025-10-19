import React from 'react';
import { Link } from 'react-router-dom';
import './RecuperacaoSenha.css';

const RecuperacaoSenha = () => {
  return (
    <div className="recuperacao-senha-page">
      <div className="recuperacao-senha-box">
        {/* Título e Cabeçalho */}
        <fieldset className="header-box">
          <legend>Sistema de Monitorias</legend>
          <h2>Recuperação de Senha</h2>
        </fieldset>

        <p className="instrucao">
          Digite seu email ou matrícula para receber o link de recuperação.
        </p>

        {/* Formulário */}
        <form className="recuperacao-form">
          <label htmlFor="input-recuperacao">Email / Matrícula</label>
          <input
            type="text"
            id="input-recuperacao"
            className="input-field"
            placeholder="" // O protótipo tem um sublinhado, mas em HTML/CSS o placeholder vazio ou a ausência dele é mais comum.
          />

          <button type="submit" className="btn-enviar">
            Enviar Link de Recuperação
          </button>
        </form>

        {/* Link para voltar ao Login */}
        <div className="voltar-login">
          {/* Assumindo que a rota para o Login é '/' ou '/login' */}
          <Link to="/login">Voltar para o Login</Link>
        </div>

      </div>
    </div>
  );
};

export default RecuperacaoSenha;