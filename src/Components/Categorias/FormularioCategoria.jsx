import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Guardar from "../img/guardar.png";
import Cancelar from "../img/cancelar.png";

const FormularioCategoria = () => {
  const [categoria, setCategoria] = useState({ name: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchCategoria = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/categories/${id}`
          );
          setCategoria({ name: response.data.name });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "No se pudo cargar la categoría para editar.",
          });
        }
      };
      fetchCategoria();
    }
  }, [id]);

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoria.name.trim()) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "El nombre de la categoría no puede estar vacío.",
      });
      return;
    }

    try {
      const newCategory = { name: categoria.name };

      const response = id
        ? await axios.patch(
            `http://localhost:3000/api/v1/categories/${id}`,
            newCategory
          )
        : await axios.post(
            "http://localhost:3000/api/v1/categories",
            newCategory
          );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: id ? "¡Actualizado!" : "¡Registrado!",
          text: `La categoría ha sido ${
            id ? "actualizada" : "registrada"
          } correctamente.`,
        }).then(() => {
          setCategoria({ name: "" });
          navigate("/listadoCategorias");
        });
      } else {
        throw new Error("Error al registrar/actualizar la categoría");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text:
          error.response?.data?.message ||
          "No se pudo registrar/actualizar la categoría. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleCancelar = () => {
    setCategoria({ name: "" });
    navigate("/listadoCategorias");
  };

  return (
    <div className="p-6 border border-red-400 rounded">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        {id ? "Editar Categoría" : "Agregar Categoría"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium text-sky-700">Nombre:</label>
          <input
            type="text"
            name="name"
            value={categoria.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-600 text-white font-bold px-4 py-2 rounded hover:bg-lime-700"
          >
            <img src={Guardar} alt="Guardar" className="w-5 h-5" />
            {id ? "Guardar Cambios" : "Agregar"}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-rose-600 text-white font-bold px-4 py-2 rounded hover:bg-red-700"
            onClick={handleCancelar}
          >
            <img src={Cancelar} alt="Cancelar" className="w-5 h-5" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCategoria;
