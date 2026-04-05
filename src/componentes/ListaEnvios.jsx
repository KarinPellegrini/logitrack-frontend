import React, { useState } from 'react';
import { Search, PlusCircle, Eye, AlertTriangle, Calendar, X } from 'lucide-react';
import Etiqueta from './elementos/Etiqueta';

const ListaEnvios = ({ envios, alSeleccionar, alIrNuevo, rol, terminoBusqueda, alCambiarBusqueda, alFiltrarFechas }) => {
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [errorFecha, setErrorFecha] = useState('');
  const filtroActivo = desde || hasta;

  const aplicarFiltro = () => {
    if (!desde || !hasta) {
      setErrorFecha('Completá ambas fechas para filtrar.');
      return;
    }
    if (desde > hasta) {
      setErrorFecha('La fecha "Desde" no puede ser mayor a "Hasta".');
      return;
    }
    setErrorFecha('');
    alFiltrarFechas(desde, hasta);
  };

  const limpiarFiltro = () => {
    setDesde('');
    setHasta('');
    setErrorFecha('');
    alFiltrarFechas(null, null);
  };

  return (
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
          {(rol === 'Operador' || rol === 'Supervisor') && (
            <button onClick={alIrNuevo} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
              <PlusCircle className="w-4 h-4" /> Nuevo Envío
            </button>
          )}
        </div>
      </div>

      {/* Filtro por rango de fechas */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <Calendar size={12} /> Filtrar por fecha de creación
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-400 font-semibold uppercase">Desde</label>
            <input type="date" className="p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" value={desde} onChange={e => setDesde(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-gray-400 font-semibold uppercase">Hasta</label>
            <input type="date" className="p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" value={hasta} onChange={e => setHasta(e.target.value)} />
          </div>
          <button onClick={aplicarFiltro} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all">
            Filtrar
          </button>
          {filtroActivo && (
            <button onClick={limpiarFiltro} className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-200 flex items-center gap-1 transition-all">
              <X size={14} /> Limpiar
            </button>
          )}
        </div>
        {errorFecha && <p className="text-xs text-red-500 font-medium">{errorFecha}</p>}
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
            {envios.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-400 font-medium">
                  No se encontraron envíos para el período seleccionado.
                </td>
              </tr>
            ) : (
              envios.map((envio) => (
                <tr key={envio.trackingId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">{envio.trackingId}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{`${envio.nombre} ${envio.apellido || ''}`}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Etiqueta>{envio.estado}</Etiqueta>
                  </td>
                  <td className="px-6 py-4">
                    {envio.prioridad ? (
                      <span className={`flex items-center gap-1.5 text-[10px] font-black px-2 py-1 rounded-md border ${
                        envio.prioridad === 'ALTA'
                          ? 'bg-red-50 text-red-700 border-red-100'
                          : envio.prioridad === 'MEDIA'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}>
                        {envio.prioridad === 'ALTA' && <AlertTriangle size={10} />}
                        {envio.prioridad}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-300 italic">PENDIENTE</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => alSeleccionar(envio)} className="text-gray-400 hover:text-blue-600">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaEnvios;
