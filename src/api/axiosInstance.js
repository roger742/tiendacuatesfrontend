import axios from "axios";
import manejarError from "../utils/Errores"; // Asegúrate de que tengas este archivo también

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Asegúrate de que esta URL sea la correcta para tu backend
  withCredentials: false,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    await manejarError(error);
    return Promise.reject(error);
  }
);

export default instance;
