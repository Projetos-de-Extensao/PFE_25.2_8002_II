import React from 'react';
import './App.css'; // Vamos usar este arquivo para o estilo

function App() {
  return (
    // Usamos uma div principal para centralizar todo o conteúdo
    <div className="container">
      <div className="login-box">
        <h1>Sistema de Monitorias</h1>
        <h2>Bem-vindo!</h2>
        <p>Selecione seu perfil para continuar:</p>

        {/* Uma div para agrupar os botões */}
        <div className="button-group">
          <button>Administrador</button>
          <button>Professor</button>
          <button>Aluno</button>
        </div>
      </div>
    </div>
  );
}

export default App;