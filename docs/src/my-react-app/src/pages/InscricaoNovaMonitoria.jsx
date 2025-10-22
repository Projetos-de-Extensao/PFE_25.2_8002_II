import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './InscricaoNovaMonitoria.css';

// estado inicial: apenas o que a UI realmente usa
const init = {
  disciplina: '',
  professor: '',
  vagas: 1,
  prerequisitos: '',
  descricaodavaga: '',
  justificativaparaoCasa: '',
};

// obrigatórios: com os campos exibidos no prototipo
const obrigatorios = [
  'disciplina', 
  'professor', 
  'vagas',
  'descricaodavaga',
  'justificativaparaoCasa',
];

export default function InscricaoNovaMonitoria() {
  const [form, setForm] = useState(init);
  const [erros, setErros] = useState({});
  const [saving, setSaving] = useState(false);
  const nav = useNavigate();

  function setField(k, v) {
    setForm(p => ({ ...p, [k]: v }));
    if (erros[k]) setErros(p => ({ ...p, [k]: null })); // limpa erro ao digitar
  }

  function validar() {
    const e = {};
    for (const k of obrigatorios) {
      const val = form[k];
      if (val === '' || val === null || val === undefined) e[k] = 'Campo obrigatório';
    }
    // regra adicional para vagas
    if (form.vagas <= 0) e.vagas = 'Informe um número maior que 0';
    setErros(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validar()) return;

    try {
      setSaving(true);
      alert('Monitoria criada!');
      nav('/Admfeed');
      // <- volta para o feed/admin feed
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-wrap">
      <header className="page-header">
        <h1>Nova Monitoria</h1>
        <Link to="/Admfeed">← Voltar</Link>
      </header>

      <form className="form-card" onSubmit={onSubmit}>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="disciplina">Disciplina *</label>
            <input
              id="disciplina"
              className={`input ${erros.disciplina ? 'input--err' : ''}`}
              value={form.disciplina}
              onChange={e => setField('disciplina', e.target.value)}
              placeholder="Ex.: Cálculo I"
            />
            {erros.disciplina && <small className="error">{erros.disciplina}</small>}
          </div>

          <div className="field">
            <label htmlFor="professor">Professor(a) *</label>
            <input
              id="professor"
              className={`input ${erros.professor ? 'input--err' : ''}`}
              value={form.professor}
              onChange={e => setField('professor', e.target.value)}
              placeholder="Ex.: João Silva"
            />
            {erros.professor && <small className="error">{erros.professor}</small>}
          </div>
        </div>

        <div className="field">
          <label htmlFor="descricao">Descrição *</label>
          <textarea
            id="descricao"
            className={`textarea ${erros.descricao ? 'input--err' : ''}`}
            rows={4}
            value={form.descricao}
            onChange={e => setField('descricao', e.target.value)}
            placeholder="Explique objetivos e atividades da monitoria…"
          />
          {erros.descricao && <small className="error">{erros.descricao}</small>}
        </div>

        <div className="field">
          <label htmlFor="vagas">Vagas *</label>
          <input
            id="vagas"
            type="number"
            min={1}
            className={`input ${erros.vagas ? 'input--err' : ''}`}
            value={form.vagas}
            onChange={e => setField('vagas', Number(e.target.value || 0))}
          />
          {erros.vagas && <small className="error">{erros.vagas}</small>}
        </div>

        <div className="actions">
          <Link to="/Admfeed" className="btn btn-ghost">Cancelar</Link>
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? 'Publicando…' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
}
