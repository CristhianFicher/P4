import './cadastroEmpresas.css';
import { Link } from 'react-router-dom';

export default function CadastroEmpresas() {
  return (
    <div className="cadastro-empresas-body">
      
      
      <Link to="/" className="cadastro-empresas-back">← Voltar</Link>

      <div className="cadastro-empresas-container">
        <h2 className="cadastro-empresas-title">Cadastro de Empresas</h2>

        <form className="cadastro-empresas-form">
          <label htmlFor="razaoSocial" className="cadastro-empresas-label">
            Razão Social:
            <input type="text" id="razaoSocial" name="razaoSocial" required className="cadastro-empresas-input" />
          </label>

          <label htmlFor="nomeFantasia" className="cadastro-empresas-label">
            Nome Fantasia:
            <input type="text" id="nomeFantasia" name="nomeFantasia" required className="cadastro-empresas-input" />
          </label>

          <label htmlFor="cnpj" className="cadastro-empresas-label">
            CNPJ:
            <input type="text" id="cnpj" name="cnpj" required className="cadastro-empresas-input" />
          </label>

          <label htmlFor="ie" className="cadastro-empresas-label">
            IE (Inscrição Estadual):
            <input type="text" id="ie" name="ie" required className="cadastro-empresas-input" />
          </label>

          <label htmlFor="endereco" className="cadastro-empresas-label">
            Endereço:
            <input type="text" id="endereco" name="endereco" required className="cadastro-empresas-input" />
          </label>

          <label htmlFor="numeroContatoRh" className="cadastro-empresas-label">
            Número para Contato RH:
            <input type="number" id="numeroContatoRh" name="numeroContatoRh" required className="cadastro-empresas-input" />
          </label>

          <label htmlFor="renda" className="cadastro-empresas-label">
            Renda:
            <input type="number" id="renda" name="renda" required className="cadastro-empresas-input" />
          </label>

          <button type="submit" className="cadastro-empresas-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
