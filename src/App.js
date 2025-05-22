import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "./Components/Menu";
import Home from "./Pages/Home";
import ListadoProductos from "./Components/Productos/ListadoProductos";
import FormularioProducto from "./Components/Productos/FormularioProducto";
import ListadoCategorias from "./Components/Categorias/ListadoCategorias";
import FormularioCategoria from "./Components/Categorias/FormularioCategoria";

function RedirectToHome() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      window.history.replaceState(null, "", "/home");
    }
  }, [location]);

  return <Navigate to="/home" />;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="flex h-screen">
        <div className="w-64">
          <Menu isOpen={menuOpen} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <button className="menu-toggle" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>

          <Routes>
            <Route path="/" element={<RedirectToHome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/listadoProductos" element={<ListadoProductos />} />
            <Route path="/formularioProducto/:id?" element={<FormularioProducto />} />
            <Route path="/listadoCategorias" element={<ListadoCategorias />} />
            <Route path="/formularioCategoria/:id?" element={<FormularioCategoria />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
