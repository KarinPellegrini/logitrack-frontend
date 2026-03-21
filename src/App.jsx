import React, { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';

// IMPORTACIONES DE TUS COMPONENTES
import Acceso from './componentes/Acceso';
import BarraNavegacion from './componentes/BarraNavegacion';
import ListaEnvios from './componentes/ListaEnvios';
import DetalleEnvio from './componentes/DetalleEnvio';
import FormularioEnvio from './componentes/FormularioEnvio';

export default function App() {
  // --- ESTADOS GLOBALES ---
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('listado'); 
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [notificacion, setNotificacion] = useState(null);

  // Datos iniciales de ejemplo
  const [envios, setEnvios] = useState([
    { 
      id: '1', 
      trackingId: 'TRK-982341', 
      nombre: 'María', 
      apellido: 'García', 
      destinatario: 'María García', // Para compatibilidad con la tabla
      destino: 'CÓRDOBA', 
      estado: 'Registrado', 
      prioridad: 'Media',
      peso: '2.5'
    }
  ]);

  // --- LÓGICA DE FILTRADO ---
  const enviosFiltrados = useMemo(() => {
    return envios.filter(e => 
      e.trackingId.toLowerCase().includes(terminoBusqueda.toLowerCase()) || 
      (e.nombre + " " + e.apellido).toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
  }, [envios, terminoBusqueda]);

  // --- FUNCIONES DE APOYO ---
  const mostrarNotificacion = (msj) => {
    setNotificacion(msj);
    setTimeout(() => setNotificacion(null), 3000);
  };

  const cerrarTodo = () => {
    setEnvioSeleccionado(null);
    setVista('listado');
  };

  // --- RENDERIZADO CONDICIONAL: ACCESO ---
  if (!usuario) {
    return (
      <Acceso alIngresar={(rol) => {
        setUsuario({ nombre: rol === 'Operador' ? 'Melina Scabini' : 'Ciro López', rol });
        mostrarNotificacion(`Bienvenido: Acceso como ${rol}`);
      }} />
    );
  }

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <BarraNavegacion 
        usuario={usuario} 
        alCerrarSesion={() => setUsuario(null)} 
        alIrInicio={cerrarTodo} 
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VISTA: LISTADO PRINCIPAL */}
        {vista === 'listado' && !envioSeleccionado && (
          <ListaEnvios 
            envios={enviosFiltrados.map(e => ({...e, destinatario: `${e.nombre} ${e.apellido}`}))} 
            rol={usuario.rol} 
            terminoBusqueda={terminoBusqueda} 
            alCambiarBusqueda={setTerminoBusqueda} 
            alSeleccionar={(e) => { setEnvioSeleccionado(e); setVista('detalle'); }} 
            alIrNuevo={() => setVista('alta')} 
          />
        )}

        {/* VISTA: FORMULARIO DE ALTA (REQUERIMIENTO OPERADOR) */}
        {vista === 'alta' && (
          <FormularioEnvio 
            alVolver={cerrarTodo} 
            alGuardar={(nuevo) => {
              // SIMULACIÓN DE IA: Si pesa más de 10kg o es "Frágil" en descripción, es prioridad Alta
              const esPesado = parseFloat(nuevo.peso) > 10;
              const esUrgente = nuevo.descripcion.toLowerCase().includes('urgente') || nuevo.descripcion.toLowerCase().includes('frágil');
              
              const envioFinal = {
                ...nuevo,
                destinatario: `${nuevo.nombre} ${nuevo.apellido}`, // Concatenamos para la tabla
                destino: nuevo.direccion,
                prioridad: (esPesado || esUrgente) ? 'Alta' : 'Baja'
              };

              setEnvios([envioFinal, ...envios]);
              cerrarTodo();
              mostrarNotificacion("¡Envío Registrado! La IA asignó prioridad " + envioFinal.prioridad);
            }} 
          />
        )}

        {/* VISTA: DETALLE DEL ENVÍO */}
        {vista === 'detalle' && envioSeleccionado && (
          <DetalleEnvio 
            envio={{...envioSeleccionado, destinatario: `${envioSeleccionado.nombre} ${envioSeleccionado.apellido}`}} 
            alVolver={cerrarTodo} 
          />
        )}

      </main>

      {/* COMPONENTE DE NOTIFICACIÓN (TOAST) */}
      {notificacion && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
          <AlertCircle className="text-blue-400" />
          <p className="text-sm font-bold">{notificacion}</p>
        </div>
      )}
    </div>
  );
}