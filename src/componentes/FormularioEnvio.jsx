import React, { useState } from 'react';
import { ArrowLeft, Save, ShieldCheck, Package, User, MapPin } from 'lucide-react';

const FormularioEnvio = ({ alGuardar, alVolver }) => {
  // AJUSTADO: Usamos exactamente los nombres que espera el DTO de Java
  const [envio, setEnvio] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    codigoPostal: '',
    peso: '' // Se captura como string, se convierte a number al enviar
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

    // CONVERSIÓN TÉCNICA: El backend espera 'peso' como número
    const payload = {
      ...envio,
      peso: parseFloat(envio.peso) || 0
    };

    alGuardar(payload);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-800 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Volver al panel
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Registrar Nuevo Paquete</h2>

        <form onSubmit={manejarEnvio} className="space-y-6">
          {/* DATOS PERSONALES (Alineado con EnvioRequestDTO) */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><User size={12}/> Destinatario</label>
            <div className="grid grid-cols-2 gap-4">
              <input name="nombre" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre *" value={envio.nombre} onChange={handleChange} />
              <input name="apellido" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Apellido *" value={envio.apellido} onChange={handleChange} />
            </div>
            <input name="dni" required type="number" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="DNI del destinatario *" value={envio.dni} onChange={handleChange} />
          </div>

          {/* UBICACIÓN Y CARGA */}
          <div className="space-y-4 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Logística</label>
            <input name="direccion" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Dirección de entrega (Calle y nro) *" value={envio.direccion} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <input name="codigoPostal" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Código Postal *" value={envio.codigoPostal} onChange={handleChange} />
              <div className="relative">
                <input name="peso" required type="number" step="0.1" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 pr-10" placeholder="Peso *" value={envio.peso} onChange={handleChange} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">kg</span>
              </div>
            </div>
          </div>

          {/* PROTECCIÓN DE DATOS (REQUISITO LEGAL) */}
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex items-start gap-3 border border-blue-100">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded text-blue-600" checked={terminosAceptados} onChange={() => setTerminosAceptados(!terminosAceptados)} />
              <div className="text-[11px] text-gray-600 leading-tight">
                <p className="font-bold text-blue-800 mb-1 flex items-center gap-1"><ShieldCheck size={12}/> Cumplimiento Ley 25.326</p>
                Los datos recolectados se utilizarán exclusivamente para la gestión del envío y el cálculo de prioridad mediante IA.
              </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-50">
              <button type="button" onClick={alVolver} className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold">Cancelar</button>
              <button type="submit" className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-all">
                <Package size={18}/> Confirmar Envío
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEnvio;