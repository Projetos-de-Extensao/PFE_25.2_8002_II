import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. IMPORTE TUDO (Atualização: Importando RecuperacaoSenha)
import App from './App.jsx'; // Sua tela de LOGIN
import MainLayout from './components/MainLayout.jsx'; // Seu "molde"
import HomePage from './pages/HomePage.jsx'; // A PÁGINA QUE VOCÊ CRIOU (Exemplo)
import Esquecisenha from './pages/Esquecisenha.jsx'; // <-- NOVO IMPORTE
import Login from './pages/Login.jsx'; // <-- NOVO IMPORTE
import Configuracoes from './pages/Configuracoes.jsx'; // <-- NOVO IMPORTE
import './index.css';


// 2. CONFIGURE O MAPA (Atualização: Adicionando a rota de Recuperação de Senha)
const router = createBrowserRouter([
  {
    // ROTA 1: A PÁGINA DE LOGIN (Assumindo que esta é a rota raiz, /)
    path: "/",
    element: <App />, // Rota / = Tela de Login.
  },
  {
    // ROTA 2: RECUPERAÇÃO DE SENHA (Geralmente, telas de login/recuperação NÃO usam MainLayout)
    path: "/esquecisenha", // <-- NOVO PATH
    element: <Esquecisenha />, // <-- NOVO ELEMENTO
  },
  {
    // ROTA 2: RECUPERAÇÃO DE SENHA (Geralmente, telas de login/recuperação NÃO usam MainLayout)
    path: "/login", // <-- NOVO PATH
    element: <Login />, // <-- NOVO ELEMENTO
  },
  {
    // ROTA 2: RECUPERAÇÃO DE SENHA (Geralmente, telas de login/recuperação NÃO usam MainLayout)
    path: "/configuracoes", // <-- NOVO PATH
    element: <Configuracoes />, // <-- NOVO ELEMENTO
  },
  {
    // ROTA 3: O "MOLDE" PARA TODAS AS OUTRAS PÁGINAS (PÁGINAS AUTENTICADAS/INTERNAS)
    element: <MainLayout />, 
    children: [
      {
        path: "/home", // Rota /home = Sua nova página
        element: <HomePage />,
      },
      // {
      //   path: "/aluno",
      //   element: <AlunoPage />,
      // },
    ]
  },
]);

// 3. RENDERIZE (como antes)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);