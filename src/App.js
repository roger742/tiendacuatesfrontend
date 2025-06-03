import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

import Menu from "./Components/Menu";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import Recuperar from "./Pages/Recuperar";

import ListadoProductos from "./Components/Productos/ListadoProductos";
import FormularioProducto from "./Components/Productos/FormularioProducto";
import ListadoCategorias from "./Components/Categorias/ListadoCategorias";
import FormularioCategoria from "./Components/Categorias/FormularioCategoria";

function AppLayout({ children }) {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex h-screen">
      {user && (
        <div className="w-64">
          <Menu isOpen={menuOpen} />
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {user && (
          <button className="menu-toggle m-2" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/recuperar" element={<Recuperar />} />

            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/listadoProductos" element={<ProtectedRoute><ListadoProductos /></ProtectedRoute>} />
            <Route path="/formularioProducto/:id?" element={<ProtectedRoute><FormularioProducto /></ProtectedRoute>} />
            <Route path="/listadoCategorias" element={<ProtectedRoute><ListadoCategorias /></ProtectedRoute>} />
            <Route path="/formularioCategoria/:id?" element={<ProtectedRoute><FormularioCategoria /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
