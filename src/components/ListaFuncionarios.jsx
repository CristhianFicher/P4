import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFuncionarios, deleteFuncionario } from '../redux/slices/funcionariosSlice';
import './ListaEstudantes.css'; // Reutilizando o CSS
const ListaFuncionarios = () => {
  const dispatch = useDispatch();
  const { items: funcionarios, status } = useSelector(state => state.funcionarios);
  const [filtro, setFiltro] = useState('');
  const [funcionarioParaRemover, setFuncionarioParaRemover] = useState(null);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFuncionarios());
    }
  }, [status, dispatch]);
  const funcionariosFiltrados = funcionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    funcionario.cpf.includes(filtro) ||
    funcionario.email.toLowerCase().includes(filtro.toLowerCase()) ||
    funcionario.funcao.toLowerCase().includes(filtro.toLowerCase())
  );
  const handleRemoverFuncionario = (id) => {
    dispatch(deleteFuncionario(id));
    setFuncionarioParaRemover(null);
  };
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  const getDepartamentoLabel = (departamento) => {
    const departamentos = {
      'ti': 'Tecnologia da Informação',
      'rh': 'Recursos Humanos',
      'financeiro': 'Financeiro',
      'comercial': 'Comercial',
      'operacoes': 'Operações',
      'administrativo': 'Administrativo',
      'inclusao': 'Inclusão e Acessibilidade'
    };
    return departamentos[departamento] || departamento;
  };
  const getEscolaridadeLabel = (nivel) => {
    const niveis = {
      'fundamental': 'Ensino Fundamental',
      'medio': 'Ensino Médio',
      'superior-incompleto': 'Superior Incompleto',
      'superior-completo': 'Superior Completo',
      'pos-graduacao': 'Pós-graduação',
      'mestrado': 'Mestrado',
      'doutorado': 'Doutorado'
    };
    return niveis[nivel] || nivel;
  };
  return (
    <div className="lista-estudantes">
      <div className="lista-header">
        <div className="header-content">
          <h1>👥 Lista de Funcionários</h1>
          <p>Gerencie os funcionários cadastrados no sistema</p>
        </div>
        <Link to="/novo-funcionario" className="btn-novo-estudante">
          <span className="btn-icon">+</span>
          Novo Funcionário
        </Link>
      </div>
      <div className="filtros">
        <div className="filtro-busca">
          <input
            type="text"
            placeholder="Buscar por nome, CPF, email ou função..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-busca"
          />
          <span className="busca-icon">🔍</span>
        </div>
        <div className="contador">
          {funcionariosFiltrados.length} de {funcionarios.length} funcionários
        </div>
      </div>
      <div className="estudantes-grid">
        {funcionariosFiltrados.length === 0 ? (
          <div className="sem-estudantes">
            <div className="sem-estudantes-icon">👥</div>
            <h3>Nenhum funcionário encontrado</h3>
            <p>
              {filtro 
                ? 'Nenhum funcionário corresponde aos critérios de busca.'
                : 'Ainda não há funcionários cadastrados no sistema.'
              }
            </p>
            {!filtro && (
              <Link to="/novo-funcionario" className="btn-cadastrar">
                Cadastrar Primeiro Funcionário
              </Link>
            )}
          </div>
        ) : (
          funcionariosFiltrados.map((funcionario) => (
            <div key={funcionario.id} className="estudante-card">
              <div className="estudante-header">
                <div className="estudante-avatar">
                  {funcionario.nome.charAt(0).toUpperCase()}
                </div>
                <div className="estudante-info">
                  <h3 className="estudante-nome">{funcionario.nome}</h3>
                  <p className="estudante-cpf">CPF: {funcionario.cpf}</p>
                  <p className="estudante-email">{funcionario.email}</p>
                </div>
                <div className="estudante-acoes">
                  <Link
                    to={`/editar-funcionario/${funcionario.id}`}
                    className="btn-editar"
                    title="Editar Funcionário"
                  >
                    ✏️
                  </Link>
                  <button
                    className="btn-remover"
                    onClick={() => setFuncionarioParaRemover(funcionario)}
                    title="Remover Funcionário"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="estudante-detalhes">
                <div className="detalhe-item">
                  <span className="detalhe-label">Função:</span>
                  <span className="detalhe-valor">{funcionario.funcao}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Departamento:</span>
                  <span className="detalhe-valor">{getDepartamentoLabel(funcionario.departamento)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Data de Admissão:</span>
                  <span className="detalhe-valor">{formatarData(funcionario.dataAdmissao)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Escolaridade:</span>
                  <span className="detalhe-valor">{getEscolaridadeLabel(funcionario.nivelEscolaridade)}</span>
                </div>
                {funcionario.salario && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Salário:</span>
                    <span className="detalhe-valor">{formatarMoeda(funcionario.salario)}</span>
                  </div>
                )}
                {funcionario.experiencia && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Experiência:</span>
                    <span className="detalhe-valor">{funcionario.experiencia}</span>
                  </div>
                )}
                {funcionario.observacoes && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Observações:</span>
                    <span className="detalhe-valor">{funcionario.observacoes}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal de Confirmação de Remoção */}
      {funcionarioParaRemover && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirmar Remoção</h3>
              <button
                className="modal-close"
                onClick={() => setFuncionarioParaRemover(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <p>
                Tem certeza que deseja remover o funcionário{' '}
                <strong>{funcionarioParaRemover.nome}</strong>?
              </p>
              <p className="modal-warning">
                Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn-cancelar"
                onClick={() => setFuncionarioParaRemover(null)}
              >
                Cancelar
              </button>
              <button
                className="btn-confirmar"
                onClick={() => handleRemoverFuncionario(funcionarioParaRemover.id)}
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
export default ListaFuncionarios;
