import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Postagens.css'; // Vamos criar este CSS

// --- SIMULAÇÃO DE DADOS ---
const mockPostagens = [
  { id: 1, titulo: "Boas-vindas ao Semestre", autor: "Admin", data: "25/10/2025", status: "Publicado" },
  { id: 2, titulo: "Inscrições Monitoria", autor: "Admin", data: "24/10/2025", status: "Publicado" },
  { id: 3, titulo: "Palestra Convidado (Rascunho)", autor: "Admin", data: "23/10/2025", status: "Rascunho" }
];

function Postagens() {
  const [postagens, setPostagens] = useState(mockPostagens);

  // Função para determinar os botões de ação com base no status
  const getActionButtons = (post) => {
    switch (post.status) {
      case 'Publicado':
        return (
          <>
            <button className="button-table-action">Editar</button>
            <button className="button-table-action button-danger">Excluir</button>
            <button className="button-table-action">Ver</button>
          </>
        );
      case 'Rascunho':
        return (
          <>
            <button className="button-table-action">Editar</button>
            <button className="button-table-action button-danger">Excluir</button>
            <button className="button-table-action">Ver</button> {/* Ou poderia ser "Publicar"? */}
          </>
        );
      default:
        return null;
    }
  };


  return (
    <div className="postagens-page"> {/* Classe específica da página */}

      {/* Título da Página */}
      <h1 className="page-title">Administrador: Gerenciar Postagens</h1>

      {/* O Painel Principal */}
      <div className="admin-panel">

        {/* Cabeçalho do Painel (Links de navegação) */}
        <header className="panel-header">
          <nav className="panel-nav">
            <Link to="/home">"Postagens"</Link> {/* Link "ativo" */}
            <Link to="/admin/oportunidades">"Oportunidades"</Link>
            <Link to="/admin/alunos">"Alunos"</Link>
            <Link to="/admin/salas">"Salas"</Link>
            <Link to="/admin/agenda">"Agenda"</Link>
            <Link to="/admin/pedidos">"Pedidos"</Link>
          </nav>
        </header>

        {/* Seção: Barra de Busca e Ação */}
        <section className="panel-section search-add-bar">
          <div className="search-group">
            <label htmlFor="search-postagem">"Buscar Postagem:"</label>
            <input type="text" id="search-postagem" placeholder="Digite o título..." />
            <button className="button-secondary">Buscar</button>
          </div>
          <button className="button-primary">+ Nova Postagem</button>
        </section>

        {/* Seção: Tabela de Postagens */}
        <section className="panel-section">
          {/* <h3>Postagens</h3> (Opcional) */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Título da Postagem</th>
                  <th>Autor</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {postagens.map((post) => (
                  <tr key={post.id}>
                    <td>{post.titulo}</td>
                    <td>{post.autor}</td>
                    <td>{post.data}</td>
                    <td>
                      {/* Badge de status dinâmica */}
                      <span className={`status-badge ${
                        post.status === 'Publicado' ? 'status-aprovado' : 'status-rascunho'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="action-buttons-cell">
                       {getActionButtons(post)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Postagens;
