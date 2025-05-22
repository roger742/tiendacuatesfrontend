import React from "react";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Bienvenidos a sus Novedades de Confianza
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Comienza tu compra...</p>
      </div>
    </div>
  );
}
