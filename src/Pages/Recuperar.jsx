import React, { useState } from "react";
import axios from "../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Recuperar = () => {
  const [form, setForm] = useState({ usuario: "", nuevaContraseña: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/reset-password", form);
      Swal.fire("¡Listo!", "Contraseña actualizada", "success");
      navigate("/login");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No se pudo actualizar",
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
          Recuperar Contraseña
        </h2>

        <label className="block text-sm mb-1 font-medium">Usuario (correo):</label>
        <input
          type="email"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />

        <label className="block text-sm mb-1 font-medium">Nueva Contraseña:</label>
        <input
          type="password"
          name="nuevaContraseña"
          value={form.nuevaContraseña}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-purple-700 text-white font-semibold py-2 rounded hover:bg-purple-900 transition"
        >
          Actualizar Contraseña
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

export default Recuperar;
