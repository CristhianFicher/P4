import "./cadastroFuncionarios.css";
import { Link } from 'react-router-dom';

export default function CadastroAlunos() {
  return (
    <div className="cadastro-funcionario-body">

      
      <Link to="/" className="cadastro-funcionario-back">← Voltar</Link>

      <div className="cadastro-funcionario-container">
        <h2 className="cadastro-funcionario-title">Cadastro de Funcionarios</h2>

        <form className="cadastro-funcionario-form">
          <label htmlFor="nome" className="cadastro-funcionario-label">
            Nome:
            <input type="text" id="nome" name="nome" required className="cadastro-funcionario-input" />
          </label>

          <label htmlFor="cpf" className="cadastro-funcionario-label">
            CPF:
            <input type="text" id="cpf" name="cpf" required className="cadastro-funcionario-input" />
          </label>

          <label htmlFor="Telefone" className="cadastro-funcionario-label">
            Telefone
            <input type="number" id="Telefone" name="Telefone" required className="cadastro-Funcionario-input" />
          </label>

          <label htmlFor="endereco" className="cadastro-funcionario-label">
            Endereço:
            <input type="text" id="endereco" name="endereco" required className="cadastro-funcionario-input" />
          </label>

          <label htmlFor="dataNascimento" className="cadastro-funcionario-label">
            Data de Nascimento:
            <input type="date" id="dataNascimento" name="dataNascimento" required className="cadastro-funcionario-input" />
          </label>

          <label htmlFor="dataAdmissao" className="cadastro-funcionario-label">
            Data de Admissão:
            <input type="date" id="dataAdmissao" name="dataAdmissao" required className="cadastro-funcionario-input" />
          </label>

          <label htmlFor="funcao" className="cadastro-funcionario-label">
            Função:
            <input type="text" id="funcao" name="funcao" required className="cadastro-funcionario-input" />
          </label>

          <button type="submit" className="cadastro-funcionario-button">Cadastrar</button>
        </form>
      </div>
      
    </div>

    
  );
}
