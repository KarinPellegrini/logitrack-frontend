import React from 'react';
import { ArrowLeft, Package, Truck, Brain, Loader } from 'lucide-react';
import Etiqueta from './elementos/Etiqueta';

const Campo = ({ label, value }) => (
  <div>
    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value ?? '—'}</p>
  </div>
);

const TRANSICIONES = {
  REGISTRADO:  { siguiente: 'EN_TRANSITO',  label: 'Marcar En Tránsito',    color: 'bg-blue-600 hover:bg-blue-700',    rolesPermitidos: ['Operador', 'Supervisor'] },
  EN_TRANSITO: { siguiente: 'EN_SUCURSAL',  label: 'Marcar En Sucursal',    color: 'bg-amber-500 hover:bg-amber-600',  rolesPermitidos: ['Operador', 'Supervisor'] },
  EN_SUCURSAL: { siguiente: 'ENTREGADO',    label: 'Marcar como Entregado', color: 'bg-emerald-600 hover:bg-emerald-700', rolesPermitidos: ['Supervisor'] },
};

const DetalleEnvio = ({ envio, alVolver, rol, alCambiarEstado }) => {
  const transicion = TRANSICIONES[envio.estado];
  const puedeAvanzar = transicion && transicion.rolesPermitidos.includes(rol);

  return (
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
          <Campo label="Nombre" value={`${envio.nombre} ${envio.apellido ?? ''}`} />
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

      {/* Auditoría de estado */}
      {envio.fechaCambioEstado && (
        <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500">
          Último cambio por <span className="font-bold text-gray-700">{envio.usuarioCambioEstado}</span> el{' '}
          <span className="font-bold text-gray-700">{new Date(envio.fechaCambioEstado).toLocaleString('es-AR')}</span>
        </div>
      )}

      {/* Botón de cambio de estado */}
      {puedeAvanzar && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <button
            onClick={() => alCambiarEstado(envio.trackingId, transicion.siguiente)}
            className={`w-full py-4 rounded-2xl text-white font-bold shadow-md transition-all flex items-center justify-center gap-2 ${transicion.color}`}
          >
            <Loader size={16} />
            {transicion.label}
          </button>
        </div>
      )}

      {envio.estado === 'ENTREGADO' && (
        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm font-bold text-emerald-600">
          ✓ Envío finalizado
        </div>
      )}

      {transicion && !puedeAvanzar && (
        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-[11px] text-gray-400">
          Solo un Supervisor puede marcar este envío como Entregado.
        </div>
      )}
    </div>
  );
};

export default DetalleEnvio;
