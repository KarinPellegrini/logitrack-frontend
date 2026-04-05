import React from 'react';
import { ArrowLeft, Package, Truck, MapPin, Weight, Brain } from 'lucide-react';
import Etiqueta from './elementos/Etiqueta';

const Campo = ({ label, value }) => (
  <div>
    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value ?? '—'}</p>
  </div>
);

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
      {/* Destinatario */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-blue-500 font-bold uppercase text-[10px]"><Package size={14} /> Destinatario</div>
        <Campo label="Nombre" value={`${envio.nombre} ${envio.apellido}`} />
        <Campo label="DNI" value={envio.dni} />
        <Campo label="Dirección" value={envio.direccion} />
      </div>

      {/* Logística */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-[10px]"><Truck size={14} /> Logística</div>
        <Campo label="CP Origen" value={envio.codigoPostalOrigen} />
        <Campo label="CP Destino" value={envio.codigoPostalDestino} />
        <Campo label="Peso" value={envio.peso != null ? `${envio.peso} kg` : null} />
        <Campo label="Tipo de Envío" value={envio.tipoEnvio} />
      </div>
    </div>

    {/* Resultado de la IA */}
    <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 grid grid-cols-2 gap-4">
      <div className="flex items-center gap-2 col-span-2 text-blue-600 font-bold uppercase text-[10px]"><Brain size={14} /> Análisis IA</div>
      <Campo label="Prioridad" value={envio.prioridad} />
      <Campo label="Distancia estimada" value={envio.distanciaKm != null ? `${envio.distanciaKm} km` : null} />
    </div>
  </div>
);

export default DetalleEnvio;
