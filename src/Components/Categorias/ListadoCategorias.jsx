import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Swal from "sweetalert2";
import TablaCategorias from "./TablaCategorias";
import Buscar from "../img/buscar.png";
import Agregar from "../img/agregar.png";
import manejarError from "../../utils/Errores";

const ListadoCategorias = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [buscarCategoria, setBuscarCategoria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const consultarCategorias = useCallback(async () => {
    try {
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere.",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
      });

      const response = await axios.get("http://localhost:3000/api/v1/categories");
      Swal.close();

      if (response.status === 200) {
        setCategorias(response.data);
        setCategoriasFiltradas(response.data);
        setCurrentPage(1);
      }
    } catch (error) {
      Swal.close();
      manejarError(error, navigate);
    }
  }, [navigate]);

  useEffect(() => {
    consultarCategorias();
  }, [consultarCategorias]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;

    setBuscarCategoria(searchTerm);

    if (searchTerm === "") {
      setCategoriasFiltradas(categorias);
    } else {
      const filtered = categorias.filter((categoria) => {
        const categoriaName = categoria.name ? categoria.name : "";

        const normalizedSearchTerm = searchTerm
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        const normalizedCategoriaName = categoriaName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        return normalizedCategoriaName
          .toLowerCase()
          .includes(normalizedSearchTerm.toLowerCase());
      });

      setCategoriasFiltradas(filtered);
    }

    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoriasFiltradas.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(categoriasFiltradas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const agregarCategoria = () => {
    navigate("/formularioCategoria");
  };

  const verCategoria = (categoria) => {
    Swal.fire({
      title: categoria.name,
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  const editarCategoria = (categoria) => {
    navigate(`/formularioCategoria/${categoria.id}`);
  };

  const eliminarCategoria = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/categories/${id}`
        );

        if (response.data.message) {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text:
              response.data.message ||
              "No se puede eliminar una categoría con productos asociados.",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "¡Eliminado!",
            text: "La categoría ha sido eliminada correctamente.",
          }).then(() => {
            consultarCategorias();
          });
        }
      } catch (error) {
        if (!error.response || !error.response.data.message) {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "No se pudo eliminar la categoría. Intenta de nuevo.",
          });
        }
      }
    }
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Listado de Categorías
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar categoría"
            className="border border-gray-300 rounded p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            value={buscarCategoria}
            onChange={handleSearchChange}
          />
          <img
            src={Buscar}
            alt="Buscar"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none"
          />
        </div>

        <button
          className="flex items-center gap-2 bg-sky-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
          onClick={agregarCategoria}
        >
          <img src={Agregar} alt="Agregar" className="w-5 h-5" />
          Agregar Categoría
        </button>
      </div>

      <TablaCategorias
        categorias={currentItems}
        verCategoria={verCategoria}
        editarCategoria={editarCategoria}
        eliminarCategoria={eliminarCategoria}
      />

      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex space-x-2">
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number}>
                <button
                  onClick={() => handlePageChange(number + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === number + 1
                      ? "bg-sky-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ListadoCategorias;
