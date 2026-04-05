import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/historial`;

const ACCIONES = [
  { value: '',            label: 'Todas las acciones' },
  { value: 'EN_TRANSITO', label: 'Cambió a En Tránsito' },
  { value: 'EN_SUCURSAL', label: 'Cambió a En Sucursal' },
  { value: 'ENTREGADO',   label: 'Marcado como Entregado' },
];

const ETIQUETA = {
  EN_TRANSITO: 'bg-blue-100 text-blue-700',
  EN_SUCURSAL: 'bg-amber-100 text-amber-700',
  ENTREGADO:   'bg-emerald-100 text-emerald-700',
  REGISTRADO:  'bg-gray-100 text-gray-600',
};

const LogsAuditoria = ({ alVolver }) => {
  const [usuario, setUsuario] = useState('');
  const [accion, setAccion] = useState('');
  const [logs, setLogs] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [buscado, setBuscado] = useState(false);

  const buscar = async () => {
    setCargando(true);
    try {
      const r = await axios.get(`${API_URL}/buscar`, { params: { usuario, accion } });
      setLogs(r.data);
      setBuscado(true);
    } catch {
      setLogs([]);
    } finally {
      setCargando(false);
    }
  };

  const limpiar = () => {
    setUsuario('');
    setAccion('');
    setLogs([]);
    setBuscado(false);
  };

  // Carga inicial con filtros vacíos (muestra todo)
  useEffect(() => {
    const cargarInicial = async () => {
      setCargando(true);
      try {
        const r = await axios.get(`${API_URL}/buscar`, { params: {} });
        setLogs(r.data);
        setBuscado(true);
      } catch {
        setLogs([]);
      } finally {
        setCargando(false);
      }
    };
    cargarInicial();
  }, []);

  const tieneFiltros = usuario.trim() || accion;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm font-medium mb-2 transition-colors">
            <ArrowLeft size={14} /> Volver
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Logs de Auditoría</h2>
          <p className="text-sm text-gray-400 mt-0.5">Filtrá por usuario y/o tipo de acción.</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && buscar()}
              placeholder="Buscar por usuario..."
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={accion}
            onChange={e => setAccion(e.target.value)}
            className="sm:w-56 px-3 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ACCIONES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
          <button
            onClick={buscar}
            disabled={cargando}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            <Search size={14} /> Buscar
          </button>
          {tieneFiltros && (
            <button onClick={limpiar} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5">
              <X size={13} /> Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {cargando && (
          <p className="text-center text-gray-400 text-sm py-12">Cargando...</p>
        )}

        {!cargando && buscado && logs.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-12">
            No se encontraron registros con los filtros aplicados.
          </p>
        )}

        {!cargando && logs.length > 0 && (
          <>
            <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {logs.length} resultado{logs.length !== 1 ? 's' : ''}
              </p>
              <p className="text-[10px] text-gray-300">Ordenado por fecha descendente</p>
            </div>
            <ul className="divide-y divide-gray-50">
              {logs.map(h => (
                <li key={h.id} className="px-5 py-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${ETIQUETA[h.estadoAnterior] ?? 'bg-gray-100 text-gray-500'}`}>
                      {h.estadoAnterior?.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-gray-400 shrink-0">→</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${ETIQUETA[h.estadoNuevo] ?? 'bg-gray-100 text-gray-500'}`}>
                      {h.estadoNuevo?.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-300 font-mono truncate ml-1">{h.trackingId?.slice(0, 16)}…</span>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-gray-700">{h.usuario}</p>
                    <p className="text-[10px] text-gray-400">{new Date(h.fechaHora).toLocaleString('es-AR')}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default LogsAuditoria;
