import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MinhasMonitoriasPage.css'; // Vamos criar este CSS

// --- SIMULAÇÃO DE DADOS ---
// Esta lista pode representar tanto monitorias que o aluno faz,
// quanto monitorias que o monitor oferece.
const mockMonitorias = [
  { 
    id: 1, 
    disciplina: "Cálculo I", 
    professor: "João Silva", 
    monitor: "Ana B.", 
    horario: "Segunda 14:00-16:00", 
    sala: "B201",
    tipo: "inscrito" // ou "responsavel"
  },
  { 
    id: 2, 
    disciplina: "Física II", 
    professor: "Maria Souza", 
    monitor: "Carlos D.", 
    horario: "Quarta 10:00-12:00", 
    sala: "C105",
    tipo: "inscrito" 
  },
   { 
    id: 3, 
    disciplina: "Programação Estruturada", 
    professor: "Alberto Souza", 
    monitor: "Você", // Exemplo se o usuário logado for o monitor
    horario: "Sexta 09:00-11:00", 
    sala: "Lab 3",
    tipo: "responsavel" 
  },
  // Adicione mais monitorias conforme necessário
];

function MinhasMonitoriasPage() {
  const [monitorias, setMonitorias] = useState(mockMonitorias);

  return (
    <div className="minhas-monitorias-page">
      <h1 className="page-title">Minhas Monitorias</h1>

      {/* Usaremos a classe 'card-grid' que já estilizamos em Admfeed.css */}
      <section className="card-grid monitorias-grid"> 
        
        {monitorias.length > 0 ? (
          monitorias.map((monitoria) => (
            // Usaremos a classe 'card-disciplina' como base
            <article key={monitoria.id} className="card-disciplina monitoria-card"> 
              <header>
                {/* O Link pode levar para uma página de detalhes da monitoria */}
                <Link to={`/monitoria/${monitoria.id}`}>
                  <h3>{monitoria.disciplina}</h3>
                </Link>
                {/* Pode ter um ícone aqui */}
              </header>
              <div className="disciplina-info">
                {/* Mostra o Monitor se o usuário for Aluno, ou Professor se for Monitor */}
                {monitoria.tipo === 'inscrito' ? (
                   <span className="info-row"> Monitor(a): {monitoria.monitor}</span>
                ) : (
                   <span className="info-row"> Professor(a): {monitoria.professor}</span>
                )}
                <span className="info-row"> {monitoria.horario}</span>
                <span className="info-row"> Sala: {monitoria.sala}</span>
              </div>
              <footer className="monitoria-actions">
                 {/* Links/Botões de ação */}
                 <Link to={`/mensagens/${monitoria.id}`} className="button-table-action">
                    Chat
                 </Link>
                 <Link to={`/monitoria/${monitoria.id}/detalhes`} className="button-table-action">
                    Ver Detalhes
                 </Link>
                 {monitoria.tipo === 'responsavel' && (
                     <Link to={`/monitoria/${monitoria.id}/gerenciar`} className="button-table-action button-primary">
                        Gerenciar
                     </Link>
                 )}
              </footer>
            </article>
          ))
        ) : (
          // Mensagem caso não haja monitorias
          <div className="admin-panel empty-state"> 
            <p>Você ainda não está participando de nenhuma monitoria.</p>
            <Link to="/aluno/vagas" className="button-primary">Buscar Vagas</Link> 
          </div>
        )}

      </section>
    </div>
  );
}

export default MinhasMonitoriasPage;
