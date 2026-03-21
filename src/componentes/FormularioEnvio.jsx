import React, { useState } from 'react';
import { ArrowLeft, Save, User, MapPin, Hash, Scale, FileText } from 'lucide-react';

const FormularioEnvio = ({ alGuardar, alVolver }) => {
  const [datos, setDatos] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    direccion: '',
    codigoPostal: '',
    peso: '',
    descripcion: ''
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Validación de campos obligatorios
    const camposVacios = Object.values(datos).some(valor => valor.trim() === '');
    if (camposVacios) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Estructura del nuevo envío según criterios
    const nuevoEnvio = {
      ...datos,
      id: Date.now().toString(),
      trackingId: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      estado: 'Registrado', // Estado inicial requerido
      prioridad: 'Calculando...', // Placeholder mientras la IA procesa
      fechaCreacion: new Date().toISOString()
    };

    alGuardar(nuevoEnvio);
  };

  const manejarCambio = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-800 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Volver al panel
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Registrar Nuevo Envío</h2>
          <p className="text-gray-400 text-sm mt-1">Carga federal de paquetes - Operador Logístico</p>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-5">
          {/* Sección Datos Personales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <Hash size={12}/> DNI Destinatario
              </label>
              <input 
                name="dni" required type="number"
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ej: 38444555"
                value={datos.dni} onChange={manejarCambio}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <User size={12}/> Nombre
              </label>
              <input 
                name="nombre" required
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Nombre del destinatario"
                value={datos.nombre} onChange={manejarCambio}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <User size={12}/> Apellido
              </label>
              <input 
                name="apellido" required
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Apellido del destinatario"
                value={datos.apellido} onChange={manejarCambio}
              />
            </div>
          </div>

          {/* Sección Localización */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <MapPin size={12}/> Dirección de Entrega
          </label>
            <input 
              name="direccion" required
              className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Calle y número"
              value={datos.direccion} onChange={manejarCambio}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <MapPin size={12}/> Código Postal
              </label>
              <input 
                name="codigoPostal" required
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ej: 1663"
                value={datos.codigoPostal} onChange={manejarCambio}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <Scale size={12}/> Peso (kg)
              </label>
              <input 
                name="peso" required type="number" step="0.1"
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ej: 2.5"
                value={datos.peso} onChange={manejarCambio}
              />
            </div>
          </div>

          {/* Sección Paquete */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <FileText size={12}/> Descripción del Contenido
            </label>
            <textarea 
              name="descripcion" required rows="3"
              className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              placeholder="Detalle de los objetos a enviar..."
              value={datos.descripcion} onChange={manejarCambio}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 flex items-center justify-center gap-2 transition-all mt-6"
          >
            <Save size={18}/> Guardar Registro
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioEnvio;