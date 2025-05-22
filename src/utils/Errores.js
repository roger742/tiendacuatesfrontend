import Swal from "sweetalert2";

const manejarError = async (error, navigate) => {
  if (error.response) {
    const mensajeServidor =
      error.response.data.message || "Error en la solicitud.";

    if (error.response.status === 401) {
      navigate("/login");
      await Swal.fire({
        icon: "error",
        title: "Error...",
        text: mensajeServidor,
      });
    } else if (error.response.status === 404) {
      await Swal.fire({
        icon: "error",
        title: "Error...",
        text: mensajeServidor,
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Error...",
        text: mensajeServidor,
      });
    }
  } else if (error.request) {
    await Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Error de red.",
    });
  } else {
    await Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Error desconocido.",
    });
  }
};

export default manejarError;
