import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLast, ChevronFirst } from "lucide-react";
import Logo from "./img/imagen1.jpg";
import ProductosIcon from "./img/productos.png";
import CategoriasIcon from "./img/categorias.png";

const SidebarContext = createContext();

export default function Menu() {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setExpanded(true);
  }, [location]);

  function handleItemClick(item, route) {
    setActiveItem(item);
    navigate(route);
  }

  function handleLogoClick() {
    navigate("/home");
  }

  return (
    <aside
      className={`h-screen transition-all ${
        expanded ? "w-64" : "w-16"
      } bg-white border-r shadow-sm`}
    >
      <nav className="h-full flex flex-col">
        <div
          className="p-4 pb-2 flex items-center justify-between"
          style={{
            background:
              "linear-gradient(to top,rgba(125, 11, 218, 0.5),rgb(86, 236, 27))",
          }}
        >
          <img
            src={Logo}
            className={`transition-all ${
              expanded ? "h-16" : "h-0"
            } mx-auto cursor-pointer`}
            alt="Logo"
            onClick={handleLogoClick} // Añadido manejador de clic
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-full transition-all"
            style={{
              backgroundColor: "#338aff",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 overflow-y-auto">
            <SidebarItem
              icon={<img src={ProductosIcon} alt="Productos" />}
              text="Productos"
              active={activeItem === "Productos"}
              onClick={() => handleItemClick("Productos", "/listadoProductos")}
            />
            <SidebarItem
              icon={<img src={CategoriasIcon} alt="Categorías" />}
              text="Categorías"
              active={activeItem === "Categorías"}
              onClick={() =>
                handleItemClick("Categorías", "/listadoCategorias")
              }
            />
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, active, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li className="relative">
      <div
        onClick={onClick}
        className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active ? "bg-red-200 text-red-800" : "hover:bg-red-100 text-gray-600"
        }`}
      >
        <div className="flex items-center justify-center w-6 h-6 shrink-0">
          {icon}
        </div>
        <span
          className={`ml-3 transition-all overflow-hidden whitespace-nowrap ${
            expanded ? "w-36" : "w-0"
          }`}
        >
          {text}
        </span>
      </div>
    </li>
  );
}
