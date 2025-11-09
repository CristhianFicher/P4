import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAvaliacoes } from '../redux/slices/avaliacoesSlice';
import { fetchEstudantes } from '../redux/slices/estudantesSlice';
import './ListaAvaliacoes.css';
const ListaAvaliacoes = () => {
  const dispatch = useDispatch();
  const { items: estudantes, status: estudantesStatus } = useSelector(state => state.estudantes);
  const { items: avaliacoes, status: avaliacoesStatus } = useSelector(state => state.avaliacoes);
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState('');
  const [estudanteSelecionado, setEstudanteSelecionado] = useState(null);
  const [tipoAvaliacaoPendente, setTipoAvaliacaoPendente] = useState(null);
  useEffect(() => {
    if (estudantesStatus === 'idle') {
      dispatch(fetchEstudantes());
    }
    if (avaliacoesStatus === 'idle') {
      dispatch(fetchAvaliacoes());
    }
  }, [estudantesStatus, avaliacoesStatus, dispatch]);
  const estudantesFiltrados = estudantes.filter(estudante =>
    estudante.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    estudante.cpf.includes(filtro) ||
    estudante.email.toLowerCase().includes(filtro.toLowerCase())
  );
  const handleAvaliarClick = (estudante, tipoAvaliacao) => {
    const avaliacaoExistente = avaliacoes.find(a => 
      a.estudanteId === estudante.id && a.tipoAvaliacao === parseInt(tipoAvaliacao)
    );
    if (!avaliacaoExistente) {
      setEstudanteSelecionado(estudante);
      setTipoAvaliacaoPendente(tipoAvaliacao);
    } else {
      navigate(`/avaliacao?estudante=${estudante.id}&tipo=${tipoAvaliacao}`);
    }
  };
  const handleFazerAvaliacao = () => {
    if (estudanteSelecionado && tipoAvaliacaoPendente) {
      navigate(`/avaliacao?estudante=${estudanteSelecionado.id}&tipo=${tipoAvaliacaoPendente}`);
    }
  };
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };
  const getStatusAvaliacao = (estudante, tipoAvaliacao) => {
    const avaliacaoExistente = avaliacoes.find(a => 
      a.estudanteId === estudante.id && a.tipoAvaliacao === parseInt(tipoAvaliacao)
    );
    return avaliacaoExistente ? 'concluida' : 'pendente';
  };
  const getAvaliacaoData = (estudante, tipoAvaliacao) => {
    return avaliacoes.find(a => 
      a.estudanteId === estudante.id && a.tipoAvaliacao === parseInt(tipoAvaliacao)
    );
  };
  return (
    <div className="lista-avaliacoes">
      <div className="avaliacoes-header">
        <div className="header-content">
          <h1>📊 Avaliações de Desempenho</h1>
          <p>Acompanhe e gerencie as avaliações dos estudantes</p>
        </div>
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
      <div className="avaliacoes-grid">
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
          </div>
        ) : (
          estudantesFiltrados.map((estudante) => {
            const avaliacao1 = getAvaliacaoData(estudante, 1);
            const avaliacao2 = getAvaliacaoData(estudante, 2);
            const status1 = getStatusAvaliacao(estudante, 1);
            const status2 = getStatusAvaliacao(estudante, 2);
            return (
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
                </div>
                <div className="avaliacoes-section">
                  <h4>Avaliações</h4>
                  <div className="avaliacoes-lista">
                    {/* Avaliação 1 */}
                    <div className="avaliacao-item">
                      <div className="avaliacao-info">
                        <span className="avaliacao-tipo">Avaliação 1ª Experiência</span>
                        {avaliacao1 && (
                          <span className="avaliacao-data">
                            {formatarData(avaliacao1.dataAvaliacao)}
                          </span>
                        )}
                      </div>
                      <div className="avaliacao-actions">
                        <span className={`status-badge ${status1}`}>
                          {status1 === 'concluida' ? '✅ Concluída' : '⏳ Pendente'}
                        </span>
                        <button
                          className={`btn-avaliar ${status1}`}
                          onClick={() => handleAvaliarClick(estudante, 1)}
                        >
                          {status1 === 'concluida' ? 'Ver Avaliação' : 'Fazer Avaliação'}
                        </button>
                      </div>
                    </div>
                    {/* Avaliação 2 */}
                    <div className="avaliacao-item">
                      <div className="avaliacao-info">
                        <span className="avaliacao-tipo">Avaliação 2ª Experiência</span>
                        {avaliacao2 && (
                          <span className="avaliacao-data">
                            {formatarData(avaliacao2.dataAvaliacao)}
                          </span>
                        )}
                      </div>
                      <div className="avaliacao-actions">
                        <span className={`status-badge ${status2}`}>
                          {status2 === 'concluida' ? '✅ Concluída' : '⏳ Pendente'}
                        </span>
                        <button
                          className={`btn-avaliar ${status2}`}
                          onClick={() => handleAvaliarClick(estudante, 2)}
                        >
                          {status2 === 'concluida' ? 'Ver Avaliação' : 'Fazer Avaliação'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Modal de Avaliação Pendente */}
      {estudanteSelecionado && tipoAvaliacaoPendente && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>⚠️ Avaliação Pendente</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setEstudanteSelecionado(null);
                  setTipoAvaliacaoPendente(null);
                }}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-icon">📝</div>
              <p>
                A <strong>Avaliação {tipoAvaliacaoPendente}ª Experiência</strong> do estudante{' '}
                <strong>{estudanteSelecionado.nome}</strong> ainda não foi realizada.
              </p>
              <p className="modal-description">
                Esta avaliação é importante para acompanhar o desenvolvimento e progresso do estudante.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn-cancelar"
                onClick={() => {
                  setEstudanteSelecionado(null);
                  setTipoAvaliacaoPendente(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="btn-confirmar"
                onClick={handleFazerAvaliacao}
              >
                Fazer Avaliação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ListaAvaliacoes;
