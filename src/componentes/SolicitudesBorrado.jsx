import React from 'react';
import { ArrowLeft, ShieldOff } from 'lucide-react';

const SolicitudesBorrado = ({ solicitudes, alVolver }) => (
  <div className="space-y-6">
    <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors font-medium text-sm">
      <ArrowLeft className="w-4 h-4" /> Volver
    </button>

    <div>
      <h2 className="text-2xl font-bold text-gray-800">Solicitudes de Borrado</h2>
      <p className="text-sm text-gray-400 mt-1">Registros con datos anonimizados por derecho al olvido (Ley 25.326).</p>
    </div>

    {solicitudes.length === 0 ? (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
        No hay solicitudes de borrado registradas.
      </div>
    ) : (
      <div className="space-y-3">
        {solicitudes.map(e => (
          <div key={e.trackingId} className="bg-white rounded-2xl border border-red-100 p-5 flex items-start justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 text-red-500 p-2 rounded-xl mt-0.5">
                <ShieldOff size={16} />
              </div>
              <div>
                <p className="font-mono text-xs text-gray-400 mb-0.5">{e.trackingId}</p>
                <p className="text-sm font-bold text-gray-700">[DATO ELIMINADO]</p>
                <p className="text-xs text-gray-400 mt-1">
                  Anonimizado el{' '}
                  <span className="font-semibold text-gray-600">
                    {e.fechaAnonimizacion ? new Date(e.fechaAnonimizacion).toLocaleString('es-AR') : '—'}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-lg bg-gray-100 text-gray-500">{e.estado?.replace('_', ' ')}</span>
              <p className="text-[10px] text-gray-400 mt-1">Prioridad: {e.prioridad ?? '—'}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default SolicitudesBorrado;
