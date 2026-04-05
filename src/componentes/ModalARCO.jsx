import React, { useState } from 'react';
import { X, Mail, ShieldCheck, FileText, Scale, ArrowLeft, Loader } from 'lucide-react';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/envios`;

const ModalARCO = ({ abierto, alCerrar }) => {
  const [vista, setVista] = useState('info');
  const [trackingId, setTrackingId] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(null); // { ok: bool, mensaje: string }

  if (!abierto) return null;

  const mailARCO = "privacidad@logitrack.com.ar";

  const cerrar = () => {
    alCerrar();
    setTimeout(() => { setVista('info'); setTrackingId(''); setResultado(null); }, 300);
  };

  const solicitarBorrado = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setCargando(true);
    setResultado(null);
    try {
      const res = await axios.post(`${API_URL}/${trackingId.trim()}/anonimizar`);
      setResultado({ ok: true, mensaje: res.data.mensaje });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'No se encontró el envío o ya fue anonimizado.';
      setResultado({ ok: false, mensaje: msg });
    } finally {
      setCargando(false);
    }
  };

  const DerechosARCO = [
    { icono: FileText, titulo: "Acceso",        desc: "Consultar qué datos tenemos sobre vos." },
    { icono: Scale,    titulo: "Rectificación", desc: "Corregir datos inexactos o desactualizados." },
    { icono: X,        titulo: "Supresión",     desc: "Solicitar la eliminación de tus datos personales.", accion: () => setVista('supresion') },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in" onClick={cerrar} />

      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 p-8 z-10 relative animate-in slide-in-from-bottom-6 duration-300">
        <button onClick={cerrar} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100">
          <X size={20} />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Protección de Datos Personales</h2>
            <p className="text-xs text-gray-400 uppercase font-black tracking-widest mt-0.5">LEY № 25.326 — DERECHOS ARCO</p>
          </div>
        </div>

        {/* VISTA: Info general */}
        {vista === 'info' && (
          <div className="space-y-6">
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              De acuerdo a la Ley № 25.326, podés ejercer tus derechos de acceso, rectificación, supresión y actualización de tus datos personales cargados en este sistema.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {DerechosARCO.map((d, i) => (
                <div
                  key={i}
                  onClick={d.accion}
                  className={`bg-gray-50 p-4 rounded-xl border text-center transition-all ${d.accion ? 'border-blue-200 cursor-pointer hover:bg-blue-50 hover:border-blue-400' : 'border-gray-100'}`}
                >
                  <d.icono className="mx-auto text-blue-500 mb-2" size={18} />
                  <p className="font-bold text-sm text-gray-800 mb-0.5">{d.titulo}</p>
                  <p className="text-[10px] text-gray-500 leading-tight">{d.desc}</p>
                  {d.accion && <p className="text-[10px] text-blue-500 font-bold mt-1">Hacer clic →</p>}
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-center gap-4 mt-6">
              <Mail className="text-blue-500 flex-shrink-0" size={24} />
              <div className="flex-grow">
                <p className="text-xs font-bold text-blue-900 uppercase tracking-tight">Canal de Contacto Oficial</p>
                <input type="text" value={mailARCO} readOnly className="text-sm font-bold text-blue-600 bg-transparent outline-none w-full p-0 cursor-text" onClick={(e) => e.target.select()} />
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button onClick={cerrar} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
                Entendido
              </button>
            </div>
          </div>
        )}

        {/* VISTA: Solicitud de supresión */}
        {vista === 'supresion' && (
          <div className="space-y-5">
            <button onClick={() => { setVista('info'); setResultado(null); setTrackingId(''); }} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <ArrowLeft size={14} /> Volver
            </button>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Solicitar borrado de datos</h3>
              <p className="text-sm text-gray-500">
                Ingresá el <strong>Tracking ID</strong> del envío cuyos datos personales querés eliminar. El registro operativo se conserva sin datos identificatorios.
              </p>
            </div>

            {!resultado ? (
              <form onSubmit={solicitarBorrado} className="space-y-4">
                <input
                  type="text"
                  value={trackingId}
                  onChange={e => setTrackingId(e.target.value)}
                  placeholder="Ej: c0375617-1d8e-41d7-8f63-..."
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium">
                  ⚠ Esta acción es irreversible. Los datos (nombre, DNI, dirección) serán reemplazados por <em>[DATO ELIMINADO]</em>.
                </div>
                <button
                  type="submit"
                  disabled={cargando || !trackingId.trim()}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {cargando ? <><Loader size={16} className="animate-spin" /> Procesando...</> : 'Solicitar borrado'}
                </button>
              </form>
            ) : (
              <div className={`p-5 rounded-2xl border text-sm font-medium ${resultado.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                {resultado.ok ? '✓ ' : '✗ '}{resultado.mensaje}
                {resultado.ok && (
                  <p className="text-[11px] text-emerald-600 mt-2 font-normal">
                    Modo desarrollo: el supervisor visualizará esta solicitud en su panel de control.
                  </p>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={cerrar} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalARCO;
