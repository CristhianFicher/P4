import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEstudantes } from '../context/EstudantesContext';
import './ListaEstudantes.css';

const ListaEstudantes = () => {
  const { estudantes, removerEstudante } = useEstudantes();
  const [filtro, setFiltro] = useState('');
  const [estudanteParaRemover, setEstudanteParaRemover] = useState(null);

  const estudantesFiltrados = estudantes.filter(estudante =>
    estudante.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    estudante.cpf.includes(filtro) ||
    estudante.email.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleRemoverEstudante = (id) => {
    removerEstudante(id);
    setEstudanteParaRemover(null);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getGrauAutismoLabel = (grau) => {
    const graus = {
      'leve': 'Leve (Nível 1)',
      'moderado': 'Moderado (Nível 2)',
      'severa': 'Severo (Nível 3)'
    };
    return graus[grau] || grau;
  };

  return (
    <div className="lista-estudantes">
      <div className="lista-header">
        <div className="header-content">
          <h1>🎓 Lista de Estudantes</h1>
          <p>Gerencie os estudantes cadastrados no sistema</p>
        </div>
        <Link to="/novo-estudante" className="btn-novo-estudante">
          <span className="btn-icon">+</span>
          Novo Estudante
        </Link>
      </div>

      <div className="filtros">
        <div className="filtro-busca">
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou email..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-busca"
          />
          <span className="busca-icon">🔍</span>
        </div>
        <div className="contador">
          {estudantesFiltrados.length} de {estudantes.length} estudantes
        </div>
      </div>

      <div className="estudantes-grid">
        {estudantesFiltrados.length === 0 ? (
          <div className="sem-estudantes">
            <div className="sem-estudantes-icon">📚</div>
            <h3>Nenhum estudante encontrado</h3>
            <p>
              {filtro 
                ? 'Nenhum estudante corresponde aos critérios de busca.'
                : 'Ainda não há estudantes cadastrados no sistema.'
              }
            </p>
            {!filtro && (
              <Link to="/novo-estudante" className="btn-cadastrar">
                Cadastrar Primeiro Estudante
              </Link>
            )}
          </div>
        ) : (
          estudantesFiltrados.map((estudante) => (
            <div key={estudante.id} className="estudante-card">
              <div className="estudante-header">
                <div className="estudante-avatar">
                  {estudante.nome.charAt(0).toUpperCase()}
                </div>
                <div className="estudante-info">
                  <h3 className="estudante-nome">{estudante.nome}</h3>
                  <p className="estudante-cpf">CPF: {estudante.cpf}</p>
                  <p className="estudante-email">{estudante.email}</p>
                </div>
                <div className="estudante-acoes">
                  <Link
                    to={`/avaliacao?estudante=${estudante.id}`}
                    className="btn-avaliacao"
                    title="Avaliar Desempenho"
                  >
                    📊
                  </Link>
                  <Link
                    to={`/editar-estudante/${estudante.id}`}
                    className="btn-editar"
                    title="Editar Estudante"
                  >
                    ✏️
                  </Link>
                  <button
                    className="btn-remover"
                    onClick={() => setEstudanteParaRemover(estudante)}
                    title="Remover Estudante"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="estudante-detalhes">
                <div className="detalhe-item">
                  <span className="detalhe-label">Data de Nascimento:</span>
                  <span className="detalhe-valor">{formatarData(estudante.dataNascimento)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Grau do Autismo:</span>
                  <span className="detalhe-valor">{getGrauAutismoLabel(estudante.grauAutismo)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Responsável:</span>
                  <span className="detalhe-valor">{estudante.nomeResponsavel}</span>
                </div>
                {estudante.interesses && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Interesses:</span>
                    <span className="detalhe-valor">{estudante.interesses}</span>
                  </div>
                )}
                {estudante.habilidades && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Habilidades:</span>
                    <span className="detalhe-valor">{estudante.habilidades}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Confirmação de Remoção */}
      {estudanteParaRemover && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirmar Remoção</h3>
              <button
                className="modal-close"
                onClick={() => setEstudanteParaRemover(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <p>
                Tem certeza que deseja remover o estudante{' '}
                <strong>{estudanteParaRemover.nome}</strong>?
              </p>
              <p className="modal-warning">
                Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn-cancelar"
                onClick={() => setEstudanteParaRemover(null)}
              >
                Cancelar
              </button>
              <button
                className="btn-confirmar"
                onClick={() => handleRemoverEstudante(estudanteParaRemover.id)}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaEstudantes;
