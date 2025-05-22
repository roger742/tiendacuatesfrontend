import React from "react";
import VerIcon from "../img/ver.png";
import EditarIcon from "../img/editar.png";
import EliminarIcon from "../img/eliminar.png";

const TablaProductos = ({
  productos,
  verProducto,
  editarProducto,
  eliminarProducto,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-violet-600 text-white">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Precio</th>
            <th className="py-2 px-4 border">Categoría</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id} className="border-b text-center">
                <td className="py-2 px-4 border">{producto.id}</td>
                <td className="py-2 px-4 border">{producto.name}</td>
                <td className="py-2 px-4 border">${producto.price}</td>
                <td className="py-2 px-4 border">{producto.category.name}</td>
                <td className="py-2 px-4 border flex justify-center gap-2">
                  <button
                    onClick={() => verProducto(producto)}
                    className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2 rounded hover:bg-lime-700"
                  >
                    <img src={VerIcon} alt="Ver" className="w-5 h-5" />
                    Ver
                  </button>
                  <button
                    onClick={() => editarProducto(producto)}
                    className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2 rounded hover:bg-lime-700"
                  >
                    <img src={EditarIcon} alt="Editar" className="w-5 h-5" />
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2 rounded hover:bg-lime-700"
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

export default TablaProductos;
