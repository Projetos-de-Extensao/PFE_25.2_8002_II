// src/pages/ConfiguracoesPage.jsx
import React from 'react';
import './Configuracoes.css'; // Importe o CSS que acabamos de criar

function Configuracoes() {
  return (
    // Note que não há mais o "wrapper" de página inteira
    <div className="configuracoes-card">
      <header className="card-header">
        <h1>Configurações</h1>
        <h2>Gerenciar sua Conta</h2>
      </header>

      <section className="config-section">
        <h3>Informações Pessoais</h3>
        <form className="config-form">
          <div className="input-group">
            <label htmlFor="nome">Nome Completo</label>
            <input type="text" id="nome" className="input-field" defaultValue="Insira seu nome" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="input-field" defaultValue="exemplo@email.com" />
          </div>
          {/* Note a nova classe 'btn' e 'btn-success' */}
          <button type="submit" className="btn btn-success">Salvar Alterações</button>
        </form>
      </section>

      <section className="config-section">
        <h3>Segurança</h3>
        {/* Note a nova classe 'btn' e 'btn-primary' */}
        <button className="btn btn-primary">Alterar Senha</button>
      </section>

      <section className="config-section">
        <h3>Sair</h3>
        {/* Note a nova classe 'btn' e 'btn-danger' */}
        <button className="btn btn-danger">Logout (Sair da Conta)</button>
      </section>
    </div>
  );
}

export default Configuracoes;