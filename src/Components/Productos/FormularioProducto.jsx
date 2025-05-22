import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Guardar from "../img/guardar.png";
import Cancelar from "../img/cancelar.png";

const FormularioProducto = () => {
  const [producto, setProducto] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/categories"
        );
        console.log("Categorías obtenidas:", response.data);
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategorias();

    if (id) {
      const fetchProducto = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/products/${id}`
          );
          setProducto({
            name: response.data.name,
            price: parseFloat(response.data.price),
            category: response.data.category?.id || "",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "No se pudo cargar el producto para editar.",
          });
        }
      };
      fetchProducto();
    }
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setProducto({ ...producto, [e.target.name]: String(e.target.value) });
    } else {
      setProducto({ ...producto, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!producto.name.trim() || !producto.price || !producto.category) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    try {
      const selectedCategory = categorias.find(
        (cat) => cat.id === parseInt(producto.category)
      );

      if (!selectedCategory) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "La categoría seleccionada no es válida.",
        });
        return;
      }

      const newProduct = {
        name: producto.name,
        price: parseFloat(producto.price),
        category: selectedCategory.name,
      };

      console.log("Enviando producto:", newProduct);

      const response = id
        ? await axios.patch(
            `http://localhost:3000/api/v1/products/${id}`,
            newProduct
          )
        : await axios.post("http://localhost:3000/api/v1/products", newProduct);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: id ? "¡Actualizado!" : "¡Registrado!",
          text: `El producto ha sido ${
            id ? "actualizado" : "registrado"
          } correctamente.`,
        }).then(() => {
          setProducto({ name: "", price: "", category: "" });
          navigate("/listadoProductos");
        });
      } else {
        throw new Error("Error al registrar/actualizar el producto");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text:
          error.response?.data?.message ||
          "No se pudo registrar/actualizar el producto.",
      });
    }
  };

  const handleCancelar = () => {
    setProducto({ name: "", price: "", category: "" });
    navigate("/listadoProductos");
  };

  return (
    <div className="p-6 border border-lime-400 rounded">
      <h2 className="text-2xl font-bold text-violet-800 mb-4">
        {id ? "Editar Producto" : "Agregar Producto"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium text-blue-700">Nombre:</label>
          <input
            type="text"
            name="name"
            value={producto.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-blue-700">Precio:</label>
          <input
            type="number"
            name="price"
            value={producto.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-blue-700">Categoría:</label>
          <select
            name="category"
            value={producto.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
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

export default FormularioProducto;
