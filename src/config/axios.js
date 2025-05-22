import axios from "axios";
import manejarError from "../utils/Errores";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
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
