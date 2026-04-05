import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Package, User, MapPin, Truck } from 'lucide-react';

const FormularioEnvio = ({ alGuardar, alVolver }) => {
  // AJUSTADO: Se agregaron los campos que Melina sumó al DTO y al modelo de IA
  const [envio, setEnvio] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    codigoPostalOrigen: '',
    codigoPostalDestino: '',
    peso: '',
    tipoEnvio: 'Estandar'
  });

  const [terminosAceptados, setTerminosAceptados] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnvio(prev => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    if (!terminosAceptados) {
      alert("Por favor, acepta la declaración de protección de datos (Ley 25.326).");
      return;
    }

    // El backend espera 'peso' como número para el modelo de IA
    const payload = {
      ...envio,
      peso: parseFloat(envio.peso) || 0
    };

    alGuardar(payload);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500 pb-10">
      <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-800 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Volver al panel
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Registrar Nuevo Envío</h2>

        <form onSubmit={manejarEnvio} className="space-y-6">
          {/* SECCIÓN 1: DESTINATARIO */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><User size={12}/> Datos del Destinatario</label>
            <div className="grid grid-cols-2 gap-4">
              <input name="nombre" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre *" value={envio.nombre} onChange={handleChange} />
              <input name="apellido" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Apellido *" value={envio.apellido} onChange={handleChange} />
            </div>
            <input name="dni" required type="number" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="DNI del destinatario *" value={envio.dni} onChange={handleChange} />
            <input name="direccion" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Dirección de entrega (Calle y nro) *" value={envio.direccion} onChange={handleChange} />
          </div>

          {/* SECCIÓN 2: LOGÍSTICA (Puntos clave para la IA) */}
          <div className="space-y-4 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Puntos de Control y Carga</label>
            <div className="grid grid-cols-2 gap-4">
              <input name="codigoPostalOrigen" required className="w-full p-3 bg-blue-50/50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-blue-100" placeholder="CP Origen *" value={envio.codigoPostalOrigen} onChange={handleChange} />
              <input name="codigoPostalDestino" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="CP Destino *" value={envio.codigoPostalDestino} onChange={handleChange} />
            </div>
            <div className="relative">
              <input name="peso" required type="number" step="0.1" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 pr-10" placeholder="Peso total de la carga *" value={envio.peso} onChange={handleChange} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">kg</span>
            </div>
            <select name="tipoEnvio" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={envio.tipoEnvio} onChange={handleChange}>
              <option value="Estandar">Estándar</option>
              <option value="Fragil">Frágil</option>
              <option value="Medica">Médica</option>
              <option value="Peligrosa">Peligrosa</option>
            </select>
          </div>

          {/* COMPROMISO DE PRIVACIDAD */}
          <div className="mt-8 p-4 bg-emerald-50 rounded-2xl flex items-start gap-3 border border-emerald-100">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded text-emerald-600" checked={terminosAceptados} onChange={() => setTerminosAceptados(!terminosAceptados)} />
              <div className="text-[11px] text-gray-600 leading-tight">
                <p className="font-bold text-emerald-800 mb-1 flex items-center gap-1"><ShieldCheck size={12}/> Privacidad y Algoritmos (Ley 25.326)</p>
                Autorizo el procesamiento de estos datos para el cálculo de prioridad logística mediante el modelo RandomForest de la IA de LogiTrack.
              </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-50">
              <button type="button" onClick={alVolver} className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold">Cancelar</button>
              <button type="submit" className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-all">
                <Package size={18}/> Enviar a Procesamiento
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEnvio;