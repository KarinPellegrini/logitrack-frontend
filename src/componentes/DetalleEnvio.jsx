import React from 'react';
import { ArrowLeft, Package, Truck, Info } from 'lucide-react';
import Etiqueta from './elementos/Etiqueta';

const DetalleEnvio = ({ envio, alVolver }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
    <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-800">
      <ArrowLeft className="w-4 h-4" /> Volver al listado
    </button>
    <div className="flex justify-between items-start mb-6">
      <div>
        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Identificador</p>
        <h3 className="text-3xl font-mono font-black text-blue-600">{envio.trackingId}</h3>
      </div>
      <Etiqueta>{envio.estado}</Etiqueta>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-t border-gray-50">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-blue-500 font-bold uppercase text-[10px]"><Package size={14} /> Origen</div>
        <p className="text-lg font-bold">{envio.remitente}</p>
        <p className="text-sm text-gray-500">{envio.origen}</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-[10px]"><Truck size={14} /> Destino</div>
        <p className="text-lg font-bold">{envio.destinatario}</p>
        <p className="text-sm text-gray-500">{envio.destino}</p>
      </div>
    </div>
  </div>
);

export default DetalleEnvio;