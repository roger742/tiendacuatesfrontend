import React, { useState } from "react";
import axios from "../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    contraseña: "",
    rol: "cliente",
    puesto: "",
    fecha_ingreso: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      Swal.fire("¡Registrado!", "Usuario creado con éxito", "success");
      navigate("/login");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Error al registrar",
        "error"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
          Registro de Usuario
        </h2>

        <label className="block text-sm mb-1 font-medium">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />

        <label className="block text-sm mb-1 font-medium">Correo (usuario):</label>
        <input
          type="email"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />

        <label className="block text-sm mb-1 font-medium">Contraseña:</label>
        <input
          type="password"
          name="contraseña"
          value={form.contraseña}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />

        <label className="block text-sm mb-1 font-medium">Rol:</label>
        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        >
          <option value="cliente">Cliente</option>
          <option value="empleado">Empleado</option>
          <option value="jefe">Jefe</option>
        </select>

        <label className="block text-sm mb-1 font-medium">Puesto:</label>
        <input
          type="text"
          name="puesto"
          value={form.puesto}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
        />

        <label className="block text-sm mb-1 font-medium">Fecha de Ingreso:</label>
        <input
          type="date"
          name="fecha_ingreso"
          value={form.fecha_ingreso}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-purple-700 text-white font-semibold py-2 rounded hover:bg-purple-900 transition"
        >
          Registrarse
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-4 w-full text-center text-blue-700 hover:underline"
        >
          Regresar al inicio de sesión
        </button>
      </form>
    </div>
  );
};

export default Registro;
