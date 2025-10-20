import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Configuracoes.css';

// Importa os componentes Header e Footer
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const Configuracoes = () => {
  // Mock de dados do usuário (em um app real, viriam de um contexto ou API)
  const [userInfo, setUserInfo] = useState({
    name: 'João da Silva',
    email: 'joao.silva@example.com',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  // 1. Handlers para Formulários
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    console.log('Informações Pessoais salvas:', userInfo);
    alert('Alterações salvas com sucesso!');
    // Aqui viria a lógica de envio para o backend
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (currentPassword && newPassword) {
        console.log('Tentativa de alteração de senha. Nova senha:', newPassword);
        alert('Senha alterada com sucesso!');
        setCurrentPassword('');
        setNewPassword('');
        // Aqui viria a lógica de alteração de senha no backend
    } else {
        alert('Preencha os campos de senha.');
    }
  };

  // 2. Handler para Logout
  const handleLogout = () => {
    // Em um app real, aqui você limparia o token de autenticação
    console.log('Usuário deslogado.');
    // Redireciona para a tela de login (assumindo que seja a rota '/')
    navigate('/'); 
  };

  return (
    <div className="config-page-wrapper">
      
      {/* 1. HEADER */}
      <Header /> 

      {/* 2. CONTEÚDO PRINCIPAL (Centralizado) */}
      <main className="configuracoes-main-content"> 
        <div className="configuracoes-card">
          
          <header className="card-header">
            <h1>Sistema de Monitorias</h1>
            <h2>Configurações</h2>
          </header>

          {/* SEÇÃO 1: INFORMAÇÕES PESSOAIS */}
          <section className="config-section personal-info-section">
            <h3>Informações Pessoais</h3>
            
            <form onSubmit={handlePersonalInfoSubmit} className="config-form">
              <div className="input-group">
                <label>Nome:</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div className="input-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="input-field"
                  required
                  disabled // Email geralmente é de somente leitura ou exige um processo de verificação separado
                />
              </div>

              <button type="submit" className="btn-salvar">
                Salvar Alterações
              </button>
            </form>
          </section>

          {/* SEÇÃO 2: ALTERAR SENHA */}
          <section className="config-section password-section">
            <h3>Alterar Senha</h3>
            
            <form onSubmit={handleChangePassword} className="config-form">
              <div className="input-group">
                <label htmlFor="current-password">Senha Atual</label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="new-password">Nova Senha</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <button type="submit" className="btn-alterar-senha">
                Alterar Senha
              </button>
            </form>
          </section>

          {/* SEÇÃO 3: SAIR (LOGOUT) */}
          <section className="logout-section">
            <button onClick={handleLogout} className="btn-logout">
              Sair (Logout)
            </button>
          </section>

        </div>
      </main>

      {/* 3. FOOTER */}
      <Footer /> 

    </div>
  );
};

export default Configuracoes;
