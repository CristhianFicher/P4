import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
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
            <Route path="/cadastroAlunos" element={<CadastroAlunos />} />
            <Route path="/cadastroEmpresas" element={<CadastroEmpresas />} />
            <Route path="/avaliacao" element={<AvaliacaoExperiencia />} />
            <Route path="/cadastroFuncionarios" element={<CadastroFuncionario/>} />
            
          </Routes> 
        </main>*/

        {isLoginOpen && (
          <Login 
            onLogin={handleLogin} 
            onClose={handleCloseLogin} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;
