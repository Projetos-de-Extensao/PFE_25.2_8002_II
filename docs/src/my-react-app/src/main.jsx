import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. IMPORTE TUDO (como antes)
import App from './App.jsx'; // Sua tela de LOGIN
import MainLayout from './components/MainLayout.jsx'; // Seu "molde"
import HomePage from './pages/HomePage.jsx'; // A PÁGINA QUE VOCÊ CRIOU
import './index.css';

// 2. CONFIGURE O MAPA (AQUI ESTÁ A CORREÇÃO)
const router = createBrowserRouter([
  {
    // ROTA 1: A PÁGINA DE LOGIN
    path: "/",
    element: <App />, // Rota / = Tela de Login. Fim.
  },
  {
    // ROTA 2: O "MOLDE" PARA TODAS AS OUTRAS PÁGINAS
    // Note que ESTA rota não tem mais "path"
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