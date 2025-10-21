import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. Imports (Estão corretos)
import App from './App.jsx';
import MainLayout from './components/mainlayout.jsx';
import Admfeed from './pages/Admfeed.jsx';
import Esquecisenha from './pages/Esquecisenha.jsx';
import Login from './pages/Login.jsx';
import Configuracoes from './pages/Configuracoes.jsx';
import ProfessorPage from './pages/ProfessorPage.jsx';
import './index.css';


// 2. CONFIGURE O MAPA (Corrigido)
const router = createBrowserRouter([
  
  // --- MUNDO 1: PÁGINAS "SOLTAS" (SEM LAYOUT) ---
  {
    path: "/",
    element: <App />, // Login
  },
  {
    path: "/esquecisenha",
    element: <Esquecisenha />, // Recuperação de Senha
  },
  {
    path: "/login",
    element: <Login />, // Outra página de Login?
  },
  // A ROTA DE CONFIGURAÇÕES FOI REMOVIDA DAQUI

  // --- MUNDO 2: PÁGINAS "DENTRO" DO LAYOUT ---
  {
    element: <MainLayout />, // <-- O "MOLDE"
    children: [
      {
        path: "/administrador",
        element: <Admfeed />,
      },
      {
        // <-- E ADICIONADA AQUI DENTRO
        path: "/configuracoes", 
        element: <Configuracoes />,
      },
      {
      path: "/professor", // <-- ADICIONE ESTA ROTA
      element: <ProfessorPage />,
      }
    ]
  },
]);

// 3. RENDERIZE (como antes)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);