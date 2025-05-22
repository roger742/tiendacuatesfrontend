import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import TablaProductos from "./TablaProductos.jsx";
import axios from "../../config/axios.js";
import manejarError from "../../utils/Errores";
import { useNavigate } from "react-router-dom";
import Buscar from "../img/buscar.png";
import Agregar from "../img/agregar.png";

function ListadoProductos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [buscarProducto, setBuscarProducto] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const consultarProductos = useCallback(async () => {
    try {
      Swal.fire({
        title: "Consultando...",
        text: "Por favor, espere.",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
      });
      const response = await axios.get("http://localhost:3000/api/v1/products");
      Swal.close();
      if (response.status === 200) {
        setProductos(response.data);
        setProductosFiltrados(response.data);
        setCurrentPage(1);
      }
    } catch (error) {
      Swal.close();
      manejarError(error, navigate);
    }
  }, [navigate]);

  useEffect(() => {
    consultarProductos();
  }, [consultarProductos]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;

    setBuscarProducto(searchTerm);

    if (searchTerm === "") {
      setProductosFiltrados(productos);
    } else {
      const filtered = productos.filter((producto) => {
        const productoName = producto.name ? producto.name : "";

        const normalizedSearchTerm = searchTerm
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        const normalizedProductoName = productoName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        return normalizedProductoName
          .toLowerCase()
          .includes(normalizedSearchTerm.toLowerCase());
      });

      setProductosFiltrados(filtered);
    }

    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productosFiltrados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const agregarProducto = () => {
    window.location.href = "/formularioProducto";
  };

  const verProducto = (producto) => {
    Swal.fire({
      title: producto.name,
      html: `
        <p><strong>Precio:</strong> $${producto.price}</p>
        <p><strong>Categoría:</strong> ${producto.category.name}</p>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  const editarProducto = (producto) => {
    navigate(`/formularioProducto/${producto.id}`);
  };

  const eliminarProducto = async (id) => {
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
          `http://localhost:3000/api/v1/products/${id}`
        );
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Eliminado!",
            text: "El producto ha sido eliminado correctamente.",
          }).then(() => {
            consultarProductos();
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "No se pudo eliminar el producto. Intenta de nuevo.",
        });
      }
    }
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-violet-800">
        Listado de Productos
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar producto"
            className="border border-gray-300 rounded p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            value={buscarProducto}
            onChange={handleSearchChange}
          />
          <img
            src={Buscar}
            alt="Buscar"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none"
          />
        </div>

        <button
          className="flex items-center gap-2 bg-violet-600 text-white font-bold px-4 py-2 rounded hover:bg-purple-700"
          onClick={agregarProducto}
        >
          <img src={Agregar} alt="Agregar" className="w-5 h-5" />
          Agregar Producto
        </button>
      </div>

      <TablaProductos
        productos={currentItems}
        verProducto={verProducto}
        editarProducto={editarProducto}
        eliminarProducto={eliminarProducto}
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
                      ? "bg-violet-600 text-white"
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
}

export default ListadoProductos;
