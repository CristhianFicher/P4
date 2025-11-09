import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpresas, deleteEmpresa } from '../redux/slices/empresasSlice';
import './ListaEstudantes.css'; // Reutilizando o CSS
const ListaEmpresas = () => {
  const dispatch = useDispatch();
  const { items: empresas, status } = useSelector(state => state.empresas);
  const [filtro, setFiltro] = useState('');
  const [empresaParaRemover, setEmpresaParaRemover] = useState(null);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmpresas());
    }
  }, [status, dispatch]);
  const empresasFiltradas = empresas.filter(empresa =>
    empresa.razaoSocial.toLowerCase().includes(filtro.toLowerCase()) ||
    empresa.nomeFantasia.toLowerCase().includes(filtro.toLowerCase()) ||
    empresa.cnpj.includes(filtro) ||
    empresa.areaAtuacao.toLowerCase().includes(filtro.toLowerCase())
  );
  const handleRemoverEmpresa = (id) => {
    dispatch(deleteEmpresa(id));
    setEmpresaParaRemover(null);
  };
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  const getPorteLabel = (porte) => {
    const portes = {
      'micro': 'Microempresa',
      'pequena': 'Pequena Empresa',
      'media': 'Média Empresa',
      'grande': 'Grande Empresa'
    };
    return portes[porte] || porte;
  };
  return (
    <div className="lista-estudantes">
      <div className="lista-header">
        <div className="header-content">
          <h1>🏢 Lista de Empresas</h1>
          <p>Gerencie as empresas parceiras do sistema</p>
        </div>
        <Link to="/nova-empresa" className="btn-novo-estudante">
          <span className="btn-icon">+</span>
          Nova Empresa
        </Link>
      </div>
      <div className="filtros">
        <div className="filtro-busca">
          <input
            type="text"
            placeholder="Buscar por razão social, nome fantasia, CNPJ ou área..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-busca"
          />
          <span className="busca-icon">🔍</span>
        </div>
        <div className="contador">
          {empresasFiltradas.length} de {empresas.length} empresas
        </div>
      </div>
      <div className="estudantes-grid">
        {empresasFiltradas.length === 0 ? (
          <div className="sem-estudantes">
            <div className="sem-estudantes-icon">🏢</div>
            <h3>Nenhuma empresa encontrada</h3>
            <p>
              {filtro 
                ? 'Nenhuma empresa corresponde aos critérios de busca.'
                : 'Ainda não há empresas cadastradas no sistema.'
              }
            </p>
            {!filtro && (
              <Link to="/nova-empresa" className="btn-cadastrar">
                Cadastrar Primeira Empresa
              </Link>
            )}
          </div>
        ) : (
          empresasFiltradas.map((empresa) => (
            <div key={empresa.id} className="estudante-card">
              <div className="estudante-header">
                <div className="estudante-avatar">
                  {empresa.nomeFantasia.charAt(0).toUpperCase()}
                </div>
                <div className="estudante-info">
                  <h3 className="estudante-nome">{empresa.razaoSocial}</h3>
                  <p className="estudante-cpf">CNPJ: {empresa.cnpj}</p>
                  <p className="estudante-email">{empresa.nomeFantasia}</p>
                </div>
                <div className="estudante-acoes">
                  <Link
                    to={`/editar-empresa/${empresa.id}`}
                    className="btn-editar"
                    title="Editar Empresa"
                  >
                    ✏️
                  </Link>
                  <button
                    className="btn-remover"
                    onClick={() => setEmpresaParaRemover(empresa)}
                    title="Remover Empresa"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="estudante-detalhes">
                <div className="detalhe-item">
                  <span className="detalhe-label">Nome Fantasia:</span>
                  <span className="detalhe-valor">{empresa.nomeFantasia}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Área de Atuação:</span>
                  <span className="detalhe-valor">{empresa.areaAtuacao}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Porte:</span>
                  <span className="detalhe-valor">{getPorteLabel(empresa.porte)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Faturamento:</span>
                  <span className="detalhe-valor">{formatarMoeda(empresa.renda)}</span>
                </div>
                <div className="detalhe-item">
                  <span className="detalhe-label">Contato RH:</span>
                  <span className="detalhe-valor">{empresa.numeroContatoRh}</span>
                </div>
                {empresa.observacoes && (
                  <div className="detalhe-item">
                    <span className="detalhe-label">Observações:</span>
                    <span className="detalhe-valor">{empresa.observacoes}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal de Confirmação de Remoção */}
      {empresaParaRemover && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirmar Remoção</h3>
              <button
                className="modal-close"
                onClick={() => setEmpresaParaRemover(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <p>
                Tem certeza que deseja remover a empresa{' '}
                <strong>{empresaParaRemover.razaoSocial}</strong>?
              </p>
              <p className="modal-warning">
                Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn-cancelar"
                onClick={() => setEmpresaParaRemover(null)}
              >
                Cancelar
              </button>
              <button
                className="btn-confirmar"
                onClick={() => handleRemoverEmpresa(empresaParaRemover.id)}
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
export default ListaEmpresas;
