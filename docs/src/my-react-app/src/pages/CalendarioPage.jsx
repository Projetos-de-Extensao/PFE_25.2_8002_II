import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import './CalendarioPage.css'; 


const mockEventos = {
  '2025-11-05': ['Reunião Projeto A', 'Entrega Relatório'],
  '2025-11-12': ['Prova Cálculo I'],
  '2025-11-20': ['Apresentação Seminário', 'Monitoria Física II'],
};


function CalendarioPage() {
  
  const [dataSelecionada, setDataSelecionada] = useState(new Date()); 
  const [eventosDoDia, setEventosDoDia] = useState([]);
  const handleDateChange = (date) => {
    setDataSelecionada(date);
    
    const dateString = date.toISOString().split('T')[0]; 
    setEventosDoDia(mockEventos[dateString] || []); 
  };

  
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (mockEventos[dateString]) {
        return 'dia-com-evento'; 
      }
    }
    return null;
  };

  return (
    <div className="calendario-page">
      <h1 className="page-title">Calendário Acadêmico</h1>

      <div className="admin-panel calendario-panel"> 
        
        <div className="calendario-container">
          <Calendar
            onChange={handleDateChange} 
            value={dataSelecionada}    
            locale="pt-BR"             
            tileClassName={tileClassName} 
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
