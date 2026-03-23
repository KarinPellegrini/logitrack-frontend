import React from 'react';
import { Search, PlusCircle, Eye } from 'lucide-react';
import Etiqueta from './elementos/Etiqueta';

const ListaEnvios = ({ envios, alSeleccionar, alIrNuevo, rol, terminoBusqueda, alCambiarBusqueda }) => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Panel de Control</h2>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" placeholder="Tracking ID o Destinatario..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-80 text-sm"
            value={terminoBusqueda} onChange={(e) => alCambiarBusqueda(e.target.value)}
          />
        </div>
        {rol === 'Operador' || rol === 'Supervisor' && (
          <button onClick={alIrNuevo} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
            <PlusCircle className="w-4 h-4" /> Nuevo Envío
          </button>
        )}
      </div>
    </div>
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Tracking ID</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Destinatario</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Estado</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Prioridad</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Ver</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {envios.map((envio) => (
            <tr key={envio.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-mono text-sm text-blue-600 font-bold">{envio.trackingId}</td>
              <td className="px-6 py-4"><p className="text-sm font-medium">{envio.destinatario}</p></td>
              <td className="px-6 py-4"><Etiqueta>{envio.estado}</Etiqueta></td>
              <td className="px-6 py-4"><Etiqueta>{envio.prioridad}</Etiqueta></td>
              <td className="px-6 py-4"><button onClick={() => alSeleccionar(envio)} className="text-gray-400 hover:text-blue-600"><Eye className="w-5 h-5" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ListaEnvios;