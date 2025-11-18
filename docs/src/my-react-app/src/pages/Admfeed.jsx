import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admfeed.css';

function Admfeed() {
  // 1. Estado para armazenar a lista de vagas que virá da API
  const [vagas, setVagas] = useState([]);

  // 2. useEffect para buscar os dados assim que a tela carregar
  useEffect(() => {
    // A porta é 8000 conforme o comando que você rodou no json-server
    fetch('http://localhost:8000/vagas')
      .then(response => response.json())
      .then(data => {
        console.log("Dados recebidos:", data); // Dica: Olhe o console do navegador (F12) para ver se chegou
        setVagas(data);
      })
      .catch(error => console.error('Erro ao buscar vagas:', error));
  }, []);

  return (
    <div className="admin-homepage">
      
      <h1 className="admin-title">Administrador:</h1>

      <div className="admin-panel">

        <header className="panel-header">
          <h2>Painel do Administrador (CASA)</h2>
          <nav className="panel-nav">
            <Link to="/administrador/postagens">Postagens</Link>
            <Link to="/administrador/oportunidades">Oportunidades</Link>
            <Link to="/administrador/gerenciarsalas">Salas</Link>
            <Link to="/administrador/gerenciarpedidos">Pedidos</Link>
          </nav>
        </header>

        {/* Seção: Vagas (Vindo da API) */}
        <section className="panel-section">
          <h3>Oportunidades</h3>
          
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nome da Vaga</th>
                  <th>Disciplina (Cód)</th>
                  <th>Bolsa</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {/* 3. Aqui usamos o .map para criar as linhas dinamicamente.
                   Para cada 'vaga' na lista 'vagas', ele cria um <tr>
                */}
                {vagas.length > 0 ? (
                  vagas.map((vaga, index) => (
                    <tr key={index}>
                      <td>{vaga.nome}</td>
                      <td>{vaga.disciplina}</td>
                      <td>{vaga.valor_bolsa}</td>
                      
                      {/* Lógica para mostrar o Status baseado no true/false do JSON */}
                      <td>
                        <span className={`status-badge ${vaga.ativo ? 'status-aprovado' : 'status-pendente'}`}>
                          {vaga.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      
                      <td className="action-links">
                        <button className="action-button-link">Editar</button> | 
                        <button className="action-button-link">Ver Detalhes</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>
                      Carregando vagas do servidor... (Verifique se o terminal está aberto)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Seção: Ações Rápidas */}
        <section className="panel-section quick-actions">
          <h3>Ações Rápidas</h3>
          <div className="button-group">
            <button className="button-primary">+ Nova Postagem</button>
            <div className="right-buttons">
              <button className="button-secondary">+ Nova Oportunidade</button>
              <button className="button-secondary">Verificar Salas</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Admfeed;