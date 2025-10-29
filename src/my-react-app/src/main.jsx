import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. Imports 
import App from './App.jsx';
import MainLayout from './components/mainlayout.jsx';
import Admfeed from './pages/Admfeed.jsx';
import Esquecisenha from './pages/Esquecisenha.jsx';
import Login from './pages/Login.jsx';
import Configuracoes from './pages/Configuracoes.jsx';
import ProfessorPage from './pages/ProfessorPage.jsx';
import Detalhes from './pages/Detalhes.jsx';
import AlunoPage from './pages/AlunoPage.jsx';
import DetalhesVaga from './pages/DetalhesVaga.jsx';
import DetalhesProfessor from './pages/DetalhesProfessor.jsx';
import InscricaoNovaMonitoria from './pages/InscricaoNovaMonitoria.jsx';
import OportunidadesAdm from './pages/OportunidadesAdm.jsx';
// Verifique: O nome do arquivo é GerenciarSalas.jsx ou GerenciasSalas.jsx?
import GerenciarSalas from './pages/GerenciasSalas.jsx'; 
import GerenciarPedidos from './pages/GerenciarPedidos.jsx';
// Verifique: O nome do componente exportado é Postagens ou PostagensPage?
import Postagens from './pages/Postagens.jsx'; 
import ProcessoSeletivo from './pages/ProcessoSeletivo.jsx';
// Verifique: O nome do componente exportado é ProfessorPostagens ou ProfessorPostagensPage?
import ProfessorPostagens from './pages/ProfessorPostagens.jsx';  
import CalendarioPage from './pages/CalendarioPage.jsx';
import MensagensPage from './pages/MensagensPage.jsx';
import MinhasMonitoriasPage from './pages/MinhasMonitoriasPage.jsx';
import Candidatura from './pages/candidatura.jsx';
import MarcarEntrevista from './pages/Marcarentrevista.jsx';
import './index.css';


// 2. CONFIGURE O MAPA (Corrigido)
const router = createBrowserRouter([
  
  // --- MUNDO 1: PÁGINAS "SOLTAS" (SEM LAYOUT) ---
  { path: "/", element: <App /> },
  { path: "/esquecisenha", element: <Esquecisenha /> },
  { path: "/login", element: <Login /> },

  // --- MUNDO 2: PÁGINAS "DENTRO" DO LAYOUT ---
  {
    element: <MainLayout />, // <-- O "MOLDE"
    children: [
      // Rotas do Admin
      { path: "/administrador", element: <Admfeed /> },
      { path: "/administrador/oportunidades", element: <OportunidadesAdm /> },
      { path: "/administrador/gerenciarsalas", element: <GerenciarSalas /> },
      { path: "/administrador/gerenciarpedidos", element: <GerenciarPedidos /> },
      { path: "/administrador/postagens", element: <Postagens /> },
      
      // Rotas do Professor
      { path: "/professor", element: <ProfessorPage /> },
      { path: "/professor/processo-seletivo", element: <ProcessoSeletivo /> }, // Rota correta
      { path: "/professor/postagens", element: <ProfessorPostagens /> },
      { path: "/professor/marcar-entrevista", element: <MarcarEntrevista /> },

      // Rotas do Aluno
      { path: "/aluno", element: <AlunoPage /> },
      { path: "/aluno/candidaturas", element: <Candidatura /> },
      // ... (provavelmente /aluno/candidaturas, /aluno/calendario ?)

      // Rotas Gerais dentro do Layout
      { path: "/configuracoes", element: <Configuracoes /> },
      { path: "/detalhes", element: <Detalhes /> }, 
      { path: "/detalhesvaga", element: <DetalhesVaga /> },
      { path: "/detalhesprofessor", element: <DetalhesProfessor /> },
      { path: "/novamonitoria", element: <InscricaoNovaMonitoria /> },
      { path: "/calendario", element: <CalendarioPage /> },
      { path: "/mensagens", element: <MensagensPage /> },
      { path: "/minhas-monitorias", element: <MinhasMonitoriasPage /> },
      
      // ROTA DUPLICADA REMOVIDA DE CIMA
    ]
  },
]);

// 3. RENDERIZE (como antes)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

