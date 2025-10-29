import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// 1. ATUALIZE O NOME DO ARQUIVO CSS IMPORTADO
import './GerenciarPedidos.css'; 

// --- SIMULAÇÃO DE DADOS (sem mudanças) ---
const mockPedidos = [
  { id: 1, tipo: "Monitoria", solicitante: "João Silva", detalhe: "Cálculo I", data: "25/10/25", status: "Pendente" },
  { id: 2, tipo: "Reserva Sala", solicitante: "Ana Beatriz", detalhe: "A-101 (Seg 08-10h)", data: "24/10/25", status: "Pendente" },
  { id: 3, tipo: "Monitoria", solicitante: "Maria Souza", detalhe: "Física II", data: "23/10/25", status: "Aprovado" },
  { id: 4, tipo: "Cadastro", solicitante: "Novo Aluno", detalhe: "carlos.novo@email.com", data: "22/10/25", status: "Rejeitado" }
];

// 2. MUDE O NOME DA FUNÇÃO AQUI
function GerenciarPedidos() { 
  const [pedidos, setPedidos] = useState(mockPedidos);
  const [filtroTipo, setFiltroTipo] = useState("Todos"); 

  const getActionButtons = (pedido) => {
    switch (pedido.status) {
      case 'Pendente':
        return (
          <>
            <button className="action-button-link button-success">Aprovar</button> |
            <button className="action-button-link button-danger-text">Rejeitar</button>
          </>
        );
      case 'Aprovado':
      case 'Rejeitado':
        return (
          <button className="button-table-action">Ver</button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="gerenciar-pedidos-page"> {/* As classes CSS podem continuar */}
      
      <h1 className="page-title">Administrador: Gerenciar Todos os Pedidos</h1>

      <div className="admin-panel">

        <header className="panel-header">
             <nav className="panel-nav">
                <Link to="/administrador/postagens">"Postagens"</Link>
                <Link to="/administrador/oportunidades">"Oportunidades"</Link>
                <Link to="/administrador/gerenciarsalas">"Salas"</Link>
                <Link to="/administrador/gerenciarpedidos">"Pedidos"</Link>
             </nav>
        </header>

        <section className="panel-section filter-bar pedidos-filter">
          
          <div className="filter-group">
            <label htmlFor="filtro-tipo">Filtrar por Tipo:</label> 
            <select 
              id="filtro-tipo" 
              className="filter-select" 
              value={filtroTipo} 
              onChange={(e) => setFiltroTipo(e.target.value)} 
            >
              <option value="Todos">Todos</option>
              <option value="Monitoria">Monitoria</option>
              <option value="Reserva Sala">Reserva Sala</option>
              <option value="Cadastro">Cadastro de Monitor</option> 
            </select>
          </div>

          <div className="filter-group">
            <span>"Status:"</span>
            <button className="filter-button filter-active">&lt; "Pendentes" &gt;</button>
          </div>
          
          <button className="button-secondary">Filtrar</button> 
        </section>

        <section className="panel-section">
             <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>! "Tipo"</th>
                      <th>Solicitante</th>
                      <th>Detalhe</th>
                      <th>Data</th>
                      <th>Status</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((pedido) => (
                      <tr key={pedido.id}>
                        <td>{pedido.tipo}</td>
                        <td>{pedido.solicitante}</td>
                        <td>{pedido.detalhe}</td>
                        <td>{pedido.data}</td>
                        <td>
                          <span className={`status-badge status-${pedido.status.toLowerCase()}`}>
                            {pedido.status}
                          </span>
                        </td>
                        <td className="action-links"> 
                          {getActionButtons(pedido)}
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

// 3. MUDE O NOME NO EXPORT DEFAULT AQUI
export default GerenciarPedidos; 
