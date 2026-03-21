import React from 'react';

const Etiqueta = ({ children }) => {
  const estilos = {
    Alta: 'bg-red-100 text-red-700 border-red-200',
    Media: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Baja: 'bg-green-100 text-green-700 border-green-200',
    'En tránsito': 'bg-blue-100 text-blue-700 border-blue-200',
    'En sucursal': 'bg-purple-100 text-purple-700 border-purple-200',
    'Entregado': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Creado': 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${estilos[children] || estilos['Creado']}`}>
      {children}
    </span>
  );
};

export default Etiqueta;