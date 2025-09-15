import { useState } from 'react';
import { Link } from 'react-router-dom';
import './cadastroAlunos.css';

export default function CadastroAlunos() {
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
      // Simulação de envio (substitua por sua lógica de API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      // Reset form
      setFormData({
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
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-header">
          <Link to="/" className="back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar ao Dashboard
          </Link>
          
          <div className="header-content">
            <div className="header-icon">🎓</div>
            <div>
              <h1>Cadastro de Estudante</h1>
              <p>Registre um novo estudante autista no sistema de inclusão</p>
            </div>
          </div>
        </div>

        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>👤 Dados Pessoais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9 19.1 17 18 17H6C4.9 17 4 17.9 4 19V21" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21H3.08C2.48 21 2 20.52 2 19.92V16.92" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 10V6C6 3.79 7.79 2 10 2H14C16.21 2 18 3.79 18 6V10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 10H22L20 16H4L2 10Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61 4.79 5.5 7 5.5C9.21 5.5 11 7.61 11 10C11 11.66 9.66 13 8 13C6.34 13 5 11.66 5 10C5 7.61 6.79 5.5 9 5.5C11.21 5.5 13 7.61 13 10C13 11.66 11.66 13 10 13C8.34 13 7 11.66 7 10" stroke="currentColor" strokeWidth="2"/>
                </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9 19.1 17 18 17H6C4.9 17 4 17.9 4 19V21" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21H3.08C2.48 21 2 20.52 2 19.92V16.92" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 10V6C6 3.79 7.79 2 10 2H14C16.21 2 18 3.79 18 6V10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 10H22L20 16H4L2 10Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
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
                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
                </svg>
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Estudante cadastrado com sucesso! 🎉
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Erro ao cadastrar estudante. Tente novamente.
                </>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                  </circle>
                </svg>
                Cadastrando...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Cadastrar Estudante
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}