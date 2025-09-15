import './avaliacao.css';
import { Link } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';

export default function AvaliacaoExperiencia() {
  const [tipoAvaliacao, setTipoAvaliacao] = useState("1");

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const perguntas = [
    "Atende as regras?",
    "Socializa com o grupo?",
    "Isola-se do grupo?",
    "Possui tolerância a frustração?",
    "Respeita colega e professores?",
    "Faz relatos fantasiosos?",
    "Concentra-se nas atividades?",
    "Tem iniciativa?",
    "Sonolência durante as atividades em sala de aula?",
    "Alterações intensas de humor?",
    "Indica oscilação repentina de humor?",
    "Irrita-se com facilidade?",
    "Ansiedade?",
    "Escuta quando seus colegas falam?",
    "Escuta e segue orientação dos professores?",
    "Mantém-se em sala de aula?",
    "Desloca-se muito na sala?",
    "Fala demasiadamente?",
    "É pontual?",
    "É assíduo?",
    "Demonstra desejo de trabalhar?",
    "Apropria-se indevidamente daquilo que não é seu?",
    "Indica hábito de banho diário?",
    "Indica hábito de escovação e qualidade na escovação?",
    "Indica cuidado com a aparência e limpeza do uniforme?",
    "Indica autonomia quanto a estes hábitos?",
    "Indica falta do uso de medicação com oscilações de comportamento?",
    "Tem meio articulado de conseguir receitas e aquisições das medicações?",
    "Traz seus materiais organizados?",
    "Usa transporte coletivo?",
    "Tem iniciativa diante das atividades propostas?",
    "Localiza-se no espaço da Instituição?",
    "Situa-se nas trocas de sala e atividades?",
    "Interage par a par?",
    "Interage em grupo?",
    "Cria conflitos e intrigas?",
    "Promove a harmonia?",
    "Faz intrigas entre colegas x professores?",
    "Demonstra interesse em participar das atividades extraclasses?",
    "Existe interação/participação da família em apoio ao usuário na Instituição?",
    "Existe superproteção por parte da família quanto a autonomia do usuário?",
    "Usuário traz relatos negativos da família (de forma geral)?",
    "Usuário traz relatos positivos da família (de forma geral)?",
    "Existe incentivo quanto a busca de autonomia para o usuário por parte da família?",
    "Existe incentivo quanto a inserção do usuário no mercado de trabalho por parte da família?",
    "Traz os documentos enviados pela Instituição assinado?",
  ];

  return (
    <div className="avaliacao-body">
      <Link to="/" className="avaliacao-back">← Voltar</Link>

      <div className="avaliacao-container">
        <h2 className="avaliacao-title">
          Avaliação {tipoAvaliacao}ª Experiência
        </h2>

        <form className="avaliacao-form">
          <label className="avaliacao-label">
            Tipo de Avaliação:
            <select
              className="avaliacao-input"
              value={tipoAvaliacao}
              onChange={(e) => setTipoAvaliacao(e.target.value)}
            >
              <option value="1">Avaliação 1</option>
              <option value="2">Avaliação 2</option>
            </select>
          </label>

          {perguntas.map((pergunta, index) => (
            <div key={index} className="avaliacao-label">
              {index + 1} - {pergunta}
              <select className="avaliacao-input" name={`pergunta_${index}`}>
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="maioria">Maioria das vezes</option>
                <option value="rara">Raramente</option>
                <option value="nao">Não</option>
              </select>
            </div>
          ))}

          <label className="avaliacao-label">
            Observações:
            <textarea className="avaliacao-input" rows="4" />
          </label>

          <button type="submit" className="avaliacao-button">Salvar Avaliação</button>
        </form>
      </div>
    </div>
  );
}
