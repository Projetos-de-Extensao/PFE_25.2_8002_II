import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MensagensPage.css'; // Vamos criar este CSS

// --- SIMULAÇÃO DE DADOS ---
const mockConversas = [
  { id: 1, nome: 'Monitor - Cálculo I (João Silva)', ultimaMsg: 'Ok, combinado!', naoLida: 0 },
  { id: 2, nome: 'Monitor - Física II (Maria Souza)', ultimaMsg: 'Você: Pode me explicar o exercício 3?', naoLida: 1 },
  { id: 3, nome: 'Aluno - Ana B.', ultimaMsg: 'Entendi, obrigada!', naoLida: 0 },
];

const mockMensagens = {
  1: [
    { id: 101, remetente: 'Monitor', texto: 'Olá! Podemos marcar a monitoria na quarta às 10h?', hora: '10:30' },
    { id: 102, remetente: 'Voce', texto: 'Perfeito, estarei lá.', hora: '10:31' },
    { id: 103, remetente: 'Monitor', texto: 'Ok, combinado!', hora: '10:32' },
  ],
  2: [
    { id: 201, remetente: 'Monitor', texto: 'Sua dúvida sobre a Lei de Ohm foi respondida.', hora: 'Ontem' },
    { id: 202, remetente: 'Voce', texto: 'Pode me explicar o exercício 3?', hora: '11:15' },
  ],
  3: [
     { id: 301, remetente: 'Aluno', texto: 'Entendi, obrigada!', hora: '09:05' },
  ]
};

function MensagensPage() {
  const [conversas, setConversas] = useState(mockConversas);
  const [conversaSelecionadaId, setConversaSelecionadaId] = useState(mockConversas[0]?.id || null); // Seleciona a primeira
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const chatEndRef = useRef(null); // Ref para rolar para o final do chat

  // Carrega as mensagens quando a conversa selecionada muda
  useEffect(() => {
    if (conversaSelecionadaId) {
      setMensagens(mockMensagens[conversaSelecionadaId] || []);
    } else {
      setMensagens([]);
    }
  }, [conversaSelecionadaId]);

  // Rola para a última mensagem quando as mensagens mudam
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const handleEnviarMensagem = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (novaMensagem.trim() === '' || !conversaSelecionadaId) return;

    const novaMsgObj = {
      id: Date.now(), // ID simples baseado no tempo
      remetente: 'Voce',
      texto: novaMensagem,
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    // Atualiza o estado das mensagens (adiciona a nova)
    setMensagens(prevMensagens => [...prevMensagens, novaMsgObj]);
    setNovaMensagem(''); // Limpa o campo de input

    // (Aqui, em um app real, você enviaria a mensagem para o servidor)
  };

  const conversaSelecionada = conversas.find(c => c.id === conversaSelecionadaId);

  return (
    <div className="mensagens-page">
      <h1 className="page-title">Mensagens</h1>

      <div className="admin-panel mensagens-panel"> {/* Painel branco com layout customizado */}

        {/* Coluna da Esquerda: Lista de Conversas */}
        <aside className="lista-conversas">
          <header>
            <h3>Conversas</h3>
            {/* Poderia ter um botão de Nova Mensagem aqui */}
          </header>
          <ul>
            {conversas.map((conversa) => (
              <li
                key={conversa.id}
                className={conversa.id === conversaSelecionadaId ? 'ativa' : ''}
                onClick={() => setConversaSelecionadaId(conversa.id)}
              >
                <div className="conversa-info">
                  <strong>{conversa.nome}</strong>
                  <p>{conversa.ultimaMsg}</p>
                </div>
                {conversa.naoLida > 0 && (
                  <span className="badge-nao-lida">{conversa.naoLida}</span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Coluna da Direita: Chat Ativo */}
        <section className="chat-ativo">
          {conversaSelecionada ? (
            <>
              <header className="chat-header">
                <h3>{conversaSelecionada.nome}</h3>
                {/* Poderia ter um botão de Opções aqui */}
              </header>

              <div className="chat-mensagens">
                {mensagens.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mensagem-balao ${msg.remetente === 'Voce' ? 'enviada' : 'recebida'}`}
                  >
                    <p>{msg.texto}</p>
                    <span>{msg.hora}</span>
                  </div>
                ))}
                {/* Elemento invisível para rolar a tela */}
                <div ref={chatEndRef} />
              </div>

              <footer className="chat-input-area">
                <form onSubmit={handleEnviarMensagem}>
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                  />
                  <button type="submit" className="button-primary">Enviar</button>
                </form>
              </footer>
            </>
          ) : (
            <div className="selecione-conversa">
              <p>Selecione uma conversa para começar.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default MensagensPage;
