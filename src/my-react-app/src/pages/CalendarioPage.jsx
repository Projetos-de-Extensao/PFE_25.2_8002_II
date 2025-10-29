import React, { useState } from 'react';
import Calendar from 'react-calendar'; // 1. Importa o componente do calendário
import 'react-calendar/dist/Calendar.css'; // 2. Importa o CSS padrão (vamos personalizá-lo)
import './CalendarioPage.css'; // 3. Importa nosso CSS personalizado

// --- SIMULAÇÃO DE DADOS DE EVENTOS ---
// No futuro, você buscaria isso do banco de dados
const mockEventos = {
  '2025-11-05': ['Reunião Projeto A', 'Entrega Relatório'],
  '2025-11-12': ['Prova Cálculo I'],
  '2025-11-20': ['Apresentação Seminário', 'Monitoria Física II'],
};
// Formato da data: YYYY-MM-DD

function CalendarioPage() {
  // Guarda a data selecionada no calendário
  const [dataSelecionada, setDataSelecionada] = useState(new Date()); 
  const [eventosDoDia, setEventosDoDia] = useState([]);

  // Função chamada quando o usuário clica em um dia
  const handleDateChange = (date) => {
    setDataSelecionada(date);
    // Formata a data para YYYY-MM-DD para buscar no mockEventos
    const dateString = date.toISOString().split('T')[0]; 
    setEventosDoDia(mockEventos[dateString] || []); // Pega os eventos ou um array vazio
  };

  // Função para adicionar uma classe a dias que têm eventos
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (mockEventos[dateString]) {
        return 'dia-com-evento'; // Classe CSS para marcar o dia
      }
    }
    return null;
  };

  return (
    <div className="calendario-page">
      <h1 className="page-title">Calendário Acadêmico</h1>

      <div className="admin-panel calendario-panel"> {/* Painel branco */}
        
        <div className="calendario-container">
          <Calendar
            onChange={handleDateChange} // O que fazer quando clica
            value={dataSelecionada}    // Qual data está selecionada
            locale="pt-BR"             // Define o idioma para Português
            tileClassName={tileClassName} // Adiciona classe aos dias com eventos
          />
        </div>

        <div className="eventos-do-dia">
          <h3>Eventos em {dataSelecionada.toLocaleDateString('pt-BR')}:</h3>
          {eventosDoDia.length > 0 ? (
            <ul>
              {eventosDoDia.map((evento, index) => (
                <li key={index}>{evento}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhum evento agendado para este dia.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default CalendarioPage;
