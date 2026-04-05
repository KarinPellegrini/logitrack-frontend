import React, { useEffect, useState } from 'react';
import { ArrowLeft, Package, Truck, Brain, Loader, Clock } from 'lucide-react';
import axios from 'axios';
import Etiqueta from './elementos/Etiqueta';
import SemaforoPrioridad from './elementos/SemaforoPrioridad';

const API_URL = `${import.meta.env.VITE_API_URL}/envios`;

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

const ETIQUETAS_ESTADO = {
  REGISTRADO:  'bg-gray-100 text-gray-600',
  EN_TRANSITO: 'bg-blue-100 text-blue-700',
  EN_SUCURSAL: 'bg-amber-100 text-amber-700',
  ENTREGADO:   'bg-emerald-100 text-emerald-700',
};

const DetalleEnvio = ({ envio, alVolver, rol, alCambiarEstado }) => {
  const transicion = TRANSICIONES[envio.estado];
  const puedeAvanzar = transicion && transicion.rolesPermitidos.includes(rol);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/${envio.trackingId}/historial`)
      .then(r => setHistorial(r.data))
      .catch(() => {});
  }, [envio.trackingId, envio.estado]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-800">
        <ArrowLeft className="w-4 h-4" /> Volver al listado
      </button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Identificador</p>
          <h3 className="text-3xl font-mono font-black text-blue-600">{envio.trackingId}</h3>
          {envio.fechaCreacion && (
            <p className="text-[11px] text-gray-400 mt-1">
              Creado el <span className="font-semibold text-gray-600">{new Date(envio.fechaCreacion).toLocaleString('es-AR')}</span>
            </p>
          )}
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
      <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 space-y-3">
        <div className="flex items-center gap-2 text-blue-600 font-bold uppercase text-[10px]"><Brain size={14} /> Análisis IA</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest mb-1.5">Prioridad</p>
            <SemaforoPrioridad prioridad={envio.prioridad} size="lg" />
          </div>
          <Campo label="Distancia estimada" value={envio.distanciaKm != null ? `${envio.distanciaKm} km` : null} />
        </div>
        {envio.motivoPrioridad && (
          <div className="pt-2 border-t border-blue-100">
            <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest mb-1">Motivo</p>
            <p className="text-sm text-blue-800">{envio.motivoPrioridad}</p>
          </div>
        )}
        {envio.probabilidadRetraso != null && (
          <div className="pt-2 border-t border-blue-100">
            <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest mb-2">Probabilidad de retraso</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-blue-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    envio.probabilidadRetraso >= 66 ? 'bg-red-500' :
                    envio.probabilidadRetraso >= 33 ? 'bg-amber-400' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${envio.probabilidadRetraso}%` }}
                />
              </div>
              <span className={`text-sm font-black w-10 text-right ${
                envio.probabilidadRetraso >= 66 ? 'text-red-600' :
                envio.probabilidadRetraso >= 33 ? 'text-amber-500' : 'text-emerald-600'
              }`}>
                {envio.probabilidadRetraso}%
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                envio.probabilidadRetraso >= 66 ? 'bg-red-100 text-red-700' :
                envio.probabilidadRetraso >= 33 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {envio.probabilidadRetraso >= 66 ? 'ALTO' : envio.probabilidadRetraso >= 33 ? 'MODERADO' : 'BAJO'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Historial de cambios de estado */}
      {historial.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-[10px] mb-3">
            <Clock size={13} /> Historial de estados
          </div>
          <ol className="relative border-l border-gray-200 ml-2 space-y-3">
            {historial.map((h) => (
              <li key={h.id} className="ml-4">
                <span className="absolute -left-1.5 w-3 h-3 rounded-full bg-blue-400 border-2 border-white" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ETIQUETAS_ESTADO[h.estadoAnterior] ?? 'bg-gray-100 text-gray-500'}`}>
                    {h.estadoAnterior.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-gray-400">→</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ETIQUETAS_ESTADO[h.estadoNuevo] ?? 'bg-gray-100 text-gray-500'}`}>
                    {h.estadoNuevo.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  <span className="font-semibold text-gray-600">{h.usuario}</span>
                  {' · '}{new Date(h.fechaHora).toLocaleString('es-AR')}
                </p>
              </li>
            ))}
          </ol>
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
