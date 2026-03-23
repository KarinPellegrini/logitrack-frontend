import React, { useState, useMemo } from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

// IMPORTACIONES EXISTENTES
import Acceso from './componentes/Acceso';
import BarraNavegacion from './componentes/BarraNavegacion';
import ListaEnvios from './componentes/ListaEnvios';
import DetalleEnvio from './componentes/DetalleEnvio';
import FormularioEnvio from './componentes/FormularioEnvio';
import ModalARCO from './componentes/ModalArco';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('listado'); 
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [notificacion, setNotificacion] = useState(null);

  // NUEVO ESTADO PARA EL MODAL
  const [modalARCOAbierto, setModalARCOAbierto] = useState(false);

  const [envios, setEnvios] = useState([
    { 
      id: '1', 
      trackingId: 'TRK-982341', 
      destinatario: 'María García', 
      destino: 'CÓRDOBA (5000)', 
      estado: 'Registrado', 
      prioridad: 'Media',
      cargaPeso: '2.5',
      cargaTipo: 'Estándar',
      fechaCreacion: new Date().toISOString()
    }
  ]);

  const enviosFiltrados = useMemo(() => {
    return envios.filter(e => 
      e.trackingId.toLowerCase().includes(terminoBusqueda.toLowerCase()) || 
      e.destinatario.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
  }, [envios, terminoBusqueda]);

  const mostrarNotificacion = (msj) => {
    setNotificacion(msj);
    setTimeout(() => setNotificacion(null), 4000);
  };

  const cerrarTodo = () => {
    setEnvioSeleccionado(null);
    setVista('listado');
    setTerminoBusqueda('');
  };

  if (!usuario) {
    return (
      <Acceso alIngresar={(userObj) => {
        setUsuario(userObj);
        mostrarNotificacion(`Bienvenido: ${userObj.nombre}`);
      }} />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 flex flex-col">
      <BarraNavegacion 
        usuario={usuario} 
        alCerrarSesion={() => {
            setUsuario(null);
            setVista('listado');
        }} 
        alIrInicio={cerrarTodo} 
      />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full pb-20">
        {vista === 'listado' && (
          <ListaEnvios 
            envios={enviosFiltrados} 
            rol={usuario.rol} 
            terminoBusqueda={terminoBusqueda} 
            alCambiarBusqueda={setTerminoBusqueda} 
            alSeleccionar={(e) => { setEnvioSeleccionado(e); setVista('detalle'); }} 
            alIrNuevo={() => setVista('alta')} 
          />
        )}

        {vista === 'alta' && (
          <FormularioEnvio 
            alVolver={cerrarTodo} 
            alGuardar={(nuevo) => {
              const esPesado = parseFloat(nuevo.cargaPeso) > 10;
              const esEspecial = ['Peligrosa', 'Médica', 'Frágil'].includes(nuevo.cargaTipo);
              
              const envioFinal = {
                ...nuevo,
                prioridad: (esPesado || esEspecial) ? 'Alta' : 'Media'
              };

              setEnvios([envioFinal, ...envios]);
              cerrarTodo();
              mostrarNotificacion(`¡Envío Registrado! Prioridad: ${envioFinal.prioridad}`);
            }} 
          />
        )}

        {vista === 'detalle' && envioSeleccionado && (
          <DetalleEnvio 
            envio={envioSeleccionado} 
            alVolver={cerrarTodo} 
          />
        )}
      </main>

      {/* FOOTER ACTUALIZADO CON LA FUNCIÓN PARA ABRIR EL MODAL */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-3 text-[10px] text-gray-500 flex justify-between items-center z-40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold tracking-widest uppercase text-gray-400">Sistema Operativo</span>
          </div>
          
          <button 
            // MODIFICADO: Ahora abre el modal interactivo
            onClick={() => setModalARCOAbierto(true)}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-semibold uppercase tracking-tight"
          >
            <ShieldCheck size={12} className="text-blue-500" />
            Derechos ARCO (Ley 25.326)
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <span className="text-gray-300">|</span>
          <p className="font-bold text-blue-600 uppercase tracking-tighter">
            LogiTrack AI Management Module — v1.0.0
          </p>
        </div>
      </footer>

      {/* COMPONENTE MODAL (Oculto por defecto) */}
      <ModalARCO 
        abierto={modalARCOAbierto} 
        alCerrar={() => setModalARCOAbierto(false)} 
      />

      {notificacion && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <AlertCircle className="text-blue-400 w-5 h-5" />
          <p className="text-sm font-bold">{notificacion}</p>
        </div>
      )}
    </div>
  );
}