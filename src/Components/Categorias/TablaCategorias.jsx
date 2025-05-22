import React from "react";
import VerIcon from "../img/ver.png";
import EditarIcon from "../img/editar.png";
import EliminarIcon from "../img/eliminar.png";

const TablaCategorias = ({
  categorias,
  verCategoria,
  editarCategoria,
  eliminarCategoria,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No hay categorías disponibles
              </td>
            </tr>
          ) : (
            categorias.map((categoria) => (
              <tr key={categoria.id} className="border-b text-center">
                <td className="py-2 px-4 border">{categoria.id}</td>
                <td className="py-2 px-4 border">{categoria.name}</td>
                <td className="py-2 px-4 border flex justify-center gap-2">
                  <button
                    onClick={() => verCategoria(categoria)}
                    className="flex items-center gap-2 bg-amber-600 text-white font-bold px-4 py-2 rounded hover:bg-orange-700"
                  >
                    <img src={VerIcon} alt="Ver" className="w-5 h-5" />
                    Ver
                  </button>
                  <button
                    onClick={() => editarCategoria(categoria)}
                    className="flex items-center gap-2 bg-amber-600 text-white font-bold px-4 py-2 rounded hover:bg-orange-700"
                  >
                    <img src={EditarIcon} alt="Editar" className="w-5 h-5" />
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarCategoria(categoria.id)}
                    className="flex items-center gap-2 bg-amber-600 text-white font-bold px-4 py-2 rounded hover:bg-orange-700"
                  >
                    <img
                      src={EliminarIcon}
                      alt="Eliminar"
                      className="w-5 h-5"
                    />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaCategorias;
