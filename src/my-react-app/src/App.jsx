import React from 'react';
// 1. Importamos o hook 'useNavigate' para poder navegar entre as páginas
import { useNavigate } from 'react-router-dom';
import './App.css'; // O estilo continua o mesmo

function App() {
  // 2. Criamos a função 'navigate' que vamos usar nos botões
  const navigate = useNavigate();

  // 3. Criamos uma função que será chamada quando qualquer botão for clicado
  // Ela vai navegar para a rota "/login" que você criou no seu main.jsx
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    // A estrutura (JSX) continua a mesma
    <div className="container">
      <div className="login-box">
        <h1>Sistema de Monitorias</h1>
        <h2>Bem-vindo!</h2>
        <p>Selecione seu perfil para continuar:</p>

        <div className="button-group">
          {/* 4. Adicionamos o evento 'onClick' a cada botão */}
          {/* Agora, ao clicar, eles chamam a função para ir para a página de login */}
          <button onClick={handleLoginRedirect}>Administrador</button>
          <button onClick={handleLoginRedirect}>Professor</button>
          <button onClick={handleLoginRedirect}>Aluno</button>
        </div>
      </div>
    </div>
  );
}

export default App;