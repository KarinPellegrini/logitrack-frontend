import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RefreshCw, Package, Truck, MapPin, CheckCircle, Clock, Users, ExternalLink } from 'lucide-react';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/dashboard`;

const ESTADOS = [
  { key: 'REGISTRADO',  label: 'Registrado',  icon: Package,     color: 'bg-gray-100 text-gray-700',     ring: 'border-gray-200' },
  { key: 'EN_TRANSITO', label: 'En Tránsito',  icon: Truck,       color: 'bg-blue-100 text-blue-700',     ring: 'border-blue-200' },
  { key: 'EN_SUCURSAL', label: 'En Sucursal',  icon: MapPin,      color: 'bg-amber-100 text-amber-700',   ring: 'border-amber-200' },
  { key: 'ENTREGADO',   label: 'Entregado',    icon: CheckCircle, color: 'bg-emerald-100 text-emerald-700', ring: 'border-emerald-200' },
];

const ETIQUETA_ESTADO = {
  REGISTRADO:  'bg-gray-100 text-gray-600',
  EN_TRANSITO: 'bg-blue-100 text-blue-700',
  EN_SUCURSAL: 'bg-amber-100 text-amber-700',
  ENTREGADO:   'bg-emerald-100 text-emerald-700',
};

const Dashboard = ({ alVolver, alIrLogs }) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const r = await axios.get(`${API_URL}/resumen`);
      setDatos(r.data);
      setUltimaActualizacion(new Date());
    } catch {
      // silencioso
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm font-medium mb-2 transition-colors">
            <ArrowLeft size={14} /> Volver
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard de Auditoría</h2>
          {ultimaActualizacion && (
            <p className="text-xs text-gray-400 mt-0.5">
              Actualizado: {ultimaActualizacion.toLocaleTimeString('es-AR')}
            </p>
          )}
        </div>
        <button
          onClick={cargar}
          disabled={cargando}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60"
        >
          <RefreshCw size={14} className={cargando ? 'animate-spin' : ''} />
          {cargando ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {!datos && !cargando && (
        <p className="text-gray-400 text-sm text-center py-12">No se pudieron cargar los datos.</p>
      )}

      {datos && (
        <>
          {/* Tarjetas de estado */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ESTADOS.map(({ key, label, icon: Icon, color, ring }) => (
              <div key={key} className={`bg-white rounded-2xl border ${ring} p-5 shadow-sm`}>
                <div className={`inline-flex p-2 rounded-xl mb-3 ${color}`}>
                  <Icon size={18} />
                </div>
                <p className="text-3xl font-black text-gray-800">{datos.enviosPorEstado?.[key] ?? 0}</p>
                <p className="text-xs text-gray-400 font-semibold uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Total general */}
          <div className="bg-blue-600 text-white rounded-2xl p-5 flex items-center justify-between shadow-md">
            <div>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-wider">Total de envíos en el sistema</p>
              <p className="text-4xl font-black mt-1">{datos.totalEnvios ?? 0}</p>
            </div>
            <Package size={48} className="text-blue-400 opacity-50" />
          </div>

          {/* Actividad reciente + Usuarios activos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Actividad reciente */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-[10px]">
                  <Clock size={13} /> Actividad reciente
                </div>
                <button onClick={alIrLogs} className="flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-blue-700 transition-colors">
                  Ver todos los logs <ExternalLink size={10} />
                </button>
              </div>
              {datos.actividadReciente?.length === 0 ? (
                <p className="text-gray-300 text-sm text-center py-6">Sin actividad registrada.</p>
              ) : (
                <ol className="relative border-l border-gray-100 ml-2 space-y-4">
                  {datos.actividadReciente?.map((h) => (
                    <li key={h.id} className="ml-4">
                      <span className="absolute -left-1.5 w-3 h-3 rounded-full bg-blue-300 border-2 border-white" />
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ETIQUETA_ESTADO[h.estadoAnterior] ?? 'bg-gray-100 text-gray-500'}`}>
                          {h.estadoAnterior.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-gray-400">→</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ETIQUETA_ESTADO[h.estadoNuevo] ?? 'bg-gray-100 text-gray-500'}`}>
                          {h.estadoNuevo.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">
                        <span className="font-semibold text-gray-600">{h.usuario}</span>
                        {' · '}{new Date(h.fechaHora).toLocaleString('es-AR')}
                      </p>
                      <p className="text-[10px] text-gray-300 font-mono">{h.trackingId?.slice(0, 18)}…</p>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Usuarios más activos */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-[10px] mb-4">
                <Users size={13} /> Usuarios más activos
              </div>
              {datos.usuariosMasActivos?.length === 0 ? (
                <p className="text-gray-300 text-sm text-center py-6">Sin datos.</p>
              ) : (
                <div className="space-y-3">
                  {datos.usuariosMasActivos?.map((u, i) => {
                    const max = datos.usuariosMasActivos[0]?.acciones ?? 1;
                    const pct = Math.round((u.acciones / max) * 100);
                    return (
                      <div key={u.usuario}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-gray-700">{u.usuario}</span>
                          <span className="text-xs font-bold text-gray-400">{u.acciones} acción{u.acciones !== 1 ? 'es' : ''}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
