import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EstudantesProvider } from "./context/EstudantesContext";
import { AvaliacoesProvider } from "./context/AvaliacoesContext";
import { EmpresasProvider } from "./context/EmpresasContext";
import { FuncionariosProvider } from "./context/FuncionariosContext";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ListaEstudantes from "./components/ListaEstudantes";
import ListaAvaliacoes from "./components/ListaAvaliacoes";
import ListaEmpresas from "./components/ListaEmpresas";
import ListaFuncionarios from "./components/ListaFuncionarios";
import EditarEstudante from "./components/EditarEstudante";
import EditarEmpresa from "./components/EditarEmpresa";
import EditarFuncionario from "./components/EditarFuncionario";
import CadastroAlunos from "./CadastroAlunos/cadastroAlunos";
import CadastroEmpresas from "./CadastroEmpresas/cadastroEmpresas";
import AvaliacaoExperiencia from "./AvaliacaoDesempenho/avaliacao";
import CadastroFuncionario from "./CadastroFuncionario/cadastroFuncionarios"

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  return (
    <EstudantesProvider>
      <AvaliacoesProvider>
        <EmpresasProvider>
          <FuncionariosProvider>
            <Router>
              <div className="app">
                <Header 
                  user={user} 
                  onLogin={handleOpenLogin} 
                  onLogout={handleLogout} 
                />
                
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/cadastroAlunos" element={<ListaEstudantes />} />
                    <Route path="/novo-estudante" element={<CadastroAlunos />} />
                    <Route path="/editar-estudante/:id" element={<EditarEstudante />} />
                    <Route path="/avaliacoes" element={<ListaAvaliacoes />} />
                    <Route path="/empresas" element={<ListaEmpresas />} />
                    <Route path="/nova-empresa" element={<CadastroEmpresas />} />
                    <Route path="/editar-empresa/:id" element={<EditarEmpresa />} />
                    <Route path="/funcionarios" element={<ListaFuncionarios />} />
                    <Route path="/novo-funcionario" element={<CadastroFuncionario />} />
                    <Route path="/editar-funcionario/:id" element={<EditarFuncionario />} />
                    <Route path="/avaliacao" element={<AvaliacaoExperiencia />} />
                    <Route path="/cadastroFuncionarios" element={<CadastroFuncionario/>} />
                    
                  </Routes> 
                </main>

                {isLoginOpen && (
                  <Login 
                    onLogin={handleLogin} 
                    onClose={handleCloseLogin} 
                  />
                )}
              </div>
            </Router>
          </FuncionariosProvider>
        </EmpresasProvider>
      </AvaliacoesProvider>
    </EstudantesProvider>
  );
}

export default App;
