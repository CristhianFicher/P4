import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEstudantes } from '../context/EstudantesContext';
import './EditarEstudante.css';
const EditarEstudante = () => {
  const { obterEstudantePorId, editarEstudante } = useEstudantes();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    endereco: '',
    nomeResponsavel: '',
    telefoneResponsavel: '',
    grauAutismo: '',
    necessidadesEspeciais: '',
    interesses: '',
    habilidades: '',
    objetivosEducacionais: '',
    objetivosProfissionais: '',
    observacoes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  useEffect(() => {
    const estudante = obterEstudantePorId(parseInt(id));
    if (estudante) {
      setFormData(estudante);
    } else {
      navigate('/cadastroAlunos');
    }
  }, [id, obterEstudantePorId, navigate]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      editarEstudante(parseInt(id), formData);
      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/cadastroAlunos');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="editar-page">
      <div className="editar-container">
        <div className="editar-header">
          <Link to="/cadastroAlunos" className="back-button">
            ← Voltar à Lista de Estudantes
          </Link>
          <div className="header-content">
            <div className="header-icon">✏️</div>
            <div>
              <h1>Editar Estudante</h1>
              <p>Atualize as informações do estudante</p>
            </div>
          </div>
        </div>
        <form className="editar-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>👤 Dados Pessoais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite o nome completo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpf">
                  CPF *
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dataNascimento">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>🏠 Endereço e Contato</h3>
            <div className="form-group full-width">
              <label htmlFor="endereco">
                Endereço Completo *
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                required
                placeholder="Rua, número, bairro, cidade, estado"
              />
            </div>
          </div>
          <div className="form-section">
            <h3>👨‍👩‍👧‍👦 Responsável</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nomeResponsavel">
                  Nome do Responsável *
                </label>
                <input
                  type="text"
                  id="nomeResponsavel"
                  name="nomeResponsavel"
                  value={formData.nomeResponsavel}
                  onChange={handleInputChange}
                  required
                  placeholder="Nome completo do responsável"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefoneResponsavel">
                  Telefone do Responsável *
                </label>
                <input
                  type="tel"
                  id="telefoneResponsavel"
                  name="telefoneResponsavel"
                  value={formData.telefoneResponsavel}
                  onChange={handleInputChange}
                  required
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>🧠 Características do Autismo</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="grauAutismo">
                  Grau do Espectro Autista
                </label>
                <select
                  id="grauAutismo"
                  name="grauAutismo"
                  value={formData.grauAutismo}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o grau</option>
                  <option value="leve">Leve (Nível 1)</option>
                  <option value="moderado">Moderado (Nível 2)</option>
                  <option value="severa">Severo (Nível 3)</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="necessidadesEspeciais">
                  Necessidades Especiais
                </label>
                <textarea
                  id="necessidadesEspeciais"
                  name="necessidadesEspeciais"
                  value={formData.necessidadesEspeciais}
                  onChange={handleInputChange}
                  placeholder="Descreva as necessidades especiais e adaptações necessárias"
                  rows="3"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>🎯 Interesses e Habilidades</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="interesses">
                  Áreas de Interesse
                </label>
                <input
                  type="text"
                  id="interesses"
                  name="interesses"
                  value={formData.interesses}
                  onChange={handleInputChange}
                  placeholder="Ex: Tecnologia, Arte, Ciências, etc."
                />
              </div>
              <div className="form-group">
                <label htmlFor="habilidades">
                  Habilidades Especiais
                </label>
                <input
                  type="text"
                  id="habilidades"
                  name="habilidades"
                  value={formData.habilidades}
                  onChange={handleInputChange}
                  placeholder="Ex: Memória visual, atenção aos detalhes, etc."
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>🎓 Objetivos Educacionais e Profissionais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="objetivosEducacionais">
                  Objetivos Educacionais
                </label>
                <textarea
                  id="objetivosEducacionais"
                  name="objetivosEducacionais"
                  value={formData.objetivosEducacionais}
                  onChange={handleInputChange}
                  placeholder="Descreva os objetivos educacionais do estudante"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="objetivosProfissionais">
                  Objetivos Profissionais
                </label>
                <textarea
                  id="objetivosProfissionais"
                  name="objetivosProfissionais"
                  value={formData.objetivosProfissionais}
                  onChange={handleInputChange}
                  placeholder="Descreva os objetivos profissionais do estudante"
                  rows="3"
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3>📝 Observações Adicionais</h3>
            <div className="form-group full-width">
              <label htmlFor="observacoes">
                Observações Importantes
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                placeholder="Informações adicionais relevantes sobre o estudante"
                rows="4"
              />
            </div>
          </div>
          {submitStatus && (
            <div className={`submit-status ${submitStatus}`}>
              {submitStatus === 'success' ? (
                <>
                  Estudante atualizado com sucesso! 🎉
                </>
              ) : (
                <>
                  Erro ao atualizar estudante. Tente novamente.
                </>
              )}
            </div>
          )}
          <div className="form-actions">
            <Link to="/cadastroAlunos" className="btn-cancelar">
              Cancelar
            </Link>
            <button 
              type="submit" 
              className={`btn-salvar ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  Salvando...
                </>
              ) : (
                <>
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditarEstudante;
