import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfessorPostagens.css'; // Vamos criar este CSS

// --- SIMULAÇÃO DE DADOS ---
const mockPostagens = [
  { id: 1, titulo: "Oportunidade: Monitoria Cálculo I", tipo: "Oportunidade", disciplina: "Cálculo I", data: "25/10/25", status: "Publicado" },
  { id: 2, titulo: "Oportunidade: Monitoria Física II", tipo: "Oportunidade", disciplina: "Física II", data: "22/10/25", status: "Publicado" },
  { id: 3, titulo: "Aviso: Aula de Revisão", tipo: "Aviso", disciplina: "Cálculo I", data: "20/10/25", status: "Publicado" },
];

function ProfessorPostagens() {
  const [postagens, setPostagens] = useState(mockPostagens);
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica (simples) para filtrar por tipo - apenas exemplo
  const filterPosts = (tipo) => {
    if (tipo === 'Todas') {
      setPostagens(mockPostagens);
    } else {
      // Aqui você filtraria de verdade, buscando apenas por 'Oportunidade' ou 'Aviso', etc.
      // Esta é uma simulação simples
      setPostagens(mockPostagens.filter(p => p.tipo.toLowerCase().includes(tipo.toLowerCase())));
    }
  };


  return (
    <div className="professor-postagens-page"> {/* Classe específica */}

      <h1 className="page-title">Painel do Professor</h1>

      {/* O Painel Principal */}
      <div className="admin-panel">

        {/* Cabeçalho do Painel (Links de navegação) */}
        <header className="panel-header">
          {/* Navegação consistente com outras páginas do Professor */}
          <nav className="panel-nav">
            <Link to="/professor">Home</Link>
            <Link to="/professor/processo-seletivo">Processo Seletivo</Link>
            <Link to="/professor/postagens">Postagens</Link>
          </nav>
        </header>

        {/* Seção: Título da Página e Barra de Ações */}
        <section className="panel-section header-section">
          <h2>Minhas Postagens e Oportunidades</h2>
          <div className="action-bar">
             <div className="search-group">
                <span>"Buscar Postagem:"</span>
                <input
                  type="text"
                  placeholder="Digite o título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button className="button-secondary search-button">Buscar</button>
             </div>
             <button className="button-primary">+ Nova Postagem/Oportunidade</button>
          </div>
        </section>


        {/* Seção: Filtro de Tipo */}
        <section className="panel-section filter-bar-simple">
            <span>"Filtrar por Tipo:"</span>
            <button className="filter-button filter-active" onClick={() => filterPosts('Todas')}>&lt; "Todas" &gt;</button>
            {/* Adicione mais botões de filtro se necessário */}
        </section>

        {/* Seção: Tabela de Postagens */}
        <section className="panel-section">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Título da Postagem</th>
                  <th>Tipo</th>
                  <th>Disciplina</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {postagens
                  // Filtra baseado no termo de busca (simples)
                  .filter(post => post.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((post) => (
                  <tr key={post.id}>
                    <td>{post.titulo}</td>
                    <td>{post.tipo}</td>
                    <td>{post.disciplina}</td>
                    <td>{post.data}</td>
                    <td>
                      {/* Badge de status dinâmica */}
                      <span className={`status-badge ${
                        post.status === 'Publicado' ? 'status-aprovado' : // Reusa estilo Aprovado
                        'status-rascunho' // Novo estilo para Rascunho
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="action-buttons-cell">
                      {/* Botões de ação do protótipo */}
                      <button className="button-table-action">Editar</button>
                      <button className="button-table-action button-danger">Excluir</button>
                       {/* Botão Ver pode ser adicionado se necessário */}
                       {/* <button className="button-table-action">Ver</button> */}
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

export default ProfessorPostagens;
