import React from 'react';
import { X, Mail, ShieldCheck, FileText, Scale } from 'lucide-react';

const ModalARCO = ({ abierto, alCerrar }) => {
  if (!abierto) return null;

  // Correo extraído de la documentación del Grupo 06
  const mailARCO = "privacidad@logitrack.com.ar";

  const DerechosARCO = [
    { icono: FileText, titulo: "Acceso", desc: "Consultar qué datos tenemos sobre vos.", plazo: "10 días" },
    { icono: Scale, titulo: "Rectificación", desc: "Corregir datos inexactos o desactualizados.", plazo: "5 días" },
    { icono: X, titulo: "Supresión", desc: "Solicitar la eliminación de tus datos personales.", plazo: "5 días" }
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Fondo desenfocado y oscuro (UX: centra la atención) */}
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in" onClick={alCerrar}></div>
      
      {/* Contenedor del Modal (UI: estético, sombras suaves) */}
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl shadow-gray-200 border border-gray-100 p-8 z-10 relative animate-in slide-in-from-bottom-6 duration-300">
        
        {/* Botón de cierre (UX: fácil de encontrar) */}
        <button 
          onClick={alCerrar} 
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
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

        {/* Cuerpo del Modal */}
        <div className="space-y-6">
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            De acuerdo a la Ley № 25.326, podés ejercer tus derechos de acceso, rectificación, supresión y actualización de tus datos personales cargados en este sistema.
          </p>

          {/* Lista de Derechos estilizada (UX: clara y legible) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {DerechosARCO.map((d, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                <d.icono className="mx-auto text-blue-500 mb-2" size={18} />
                <p className="font-bold text-sm text-gray-800 mb-0.5">{d.titulo}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{d.desc}</p>
              </div>
            ))}
          </div>

          {/* Sección del MAIL (UX: interactiva, copiable) */}
          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left mt-6">
            <Mail className="text-blue-500 flex-shrink-0" size={24} />
            <div className="flex-grow">
              <p className="text-xs font-bold text-blue-900 uppercase tracking-tight">Canal de Contacto Oficial</p>
              {/* UX: El mail se puede copiar */}
              <input 
                type="text" 
                value={mailARCO} 
                readOnly 
                className="text-sm font-bold text-blue-600 bg-transparent outline-none w-full p-0 cursor-text selection:bg-blue-200"
                onClick={(e) => e.target.select()}
                title="Hacé clic para seleccionar todo"
              />
            </div>
          </div>
          
          {/* Pie del modal con botón de confirmación */}
          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button 
              onClick={alCerrar}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalARCO;