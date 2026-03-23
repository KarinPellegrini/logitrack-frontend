import React, { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';

// IMPORTACIONES SEGÚN TU ESTRUCTURA DE CARPETAS
import Acceso from './componentes/Acceso';
import BarraNavegacion from './componentes/BarraNavegacion';
import ListaEnvios from './componentes/ListaEnvios';
import DetalleEnvio from './componentes/DetalleEnvio';
import FormularioEnvio from './componentes/FormularioEnvio';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('listado'); 
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [notificacion, setNotificacion] = useState(null);

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

  // Lógica de acceso condicional
  if (!usuario) {
    return (
      <Acceso alIngresar={(userObj) => {
        setUsuario(userObj);
        mostrarNotificacion(`Bienvenido: ${userObj.nombre}`);
      }} />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900">
      <BarraNavegacion 
        usuario={usuario} 
        alCerrarSesion={() => {
            setUsuario(null);
            setVista('listado');
        }} 
        alIrInicio={cerrarTodo} 
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
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

      {notificacion && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
          <AlertCircle className="text-blue-400 w-5 h-5" />
          <p className="text-sm font-bold">{notificacion}</p>
        </div>
      )}
    </div>
  );
}