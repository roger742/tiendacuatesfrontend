// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../config/axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ usuario: "", contraseña: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      login(res.data);
      Swal.fire("¡Éxito!", "Inicio de sesión correcto", "success");
      navigate("/home");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Error", "error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Iniciar Sesión</h2>

        <input
          type="text"
          name="usuario"
          placeholder="Correo electrónico"
          value={form.usuario}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={form.contraseña}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>

        <div className="text-center mt-4 text-sm">
          <p className="text-green-600">
            ¿No tienes cuenta? <Link to="/registro" className="underline">Regístrate</Link>
          </p>
          <p className="text-blue-600 mt-2">
            <Link to="/recuperar" className="underline">¿Olvidaste tu contraseña?</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
