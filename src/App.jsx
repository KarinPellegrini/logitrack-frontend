import React, { useState, useEffect } from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import axios from 'axios';

// IMPORTACIONES DE TUS COMPONENTES
import Acceso from './componentes/Acceso';
import BarraNavegacion from './componentes/BarraNavegacion';
import ListaEnvios from './componentes/ListaEnvios';
import DetalleEnvio from './componentes/DetalleEnvio';
import FormularioEnvio from './componentes/FormularioEnvio';
import ModalARCO from './componentes/ModalARCO';

const API_URL = `${import.meta.env.VITE_API_URL}/envios`;

export default function App() {
  // --- ESTADOS ---
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('listado'); 
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [notificacion, setNotificacion] = useState(null);
  const [modalARCOAbierto, setModalARCOAbierto] = useState(false);
  const [envios, setEnvios] = useState([]);

  // --- 1. NOTIFICACIÓN ---
  const mostrarNotificacion = (msj) => {
    setNotificacion(msj);
    setTimeout(() => setNotificacion(null), 4000);
  };

  // --- 2. LÓGICA DE PERSISTENCIA (POST) ---
  const guardarNuevoEnvio = async (datos) => {
    try {
      // Enviamos el objeto completo (incluyendo cpOrigen para la IA)
      const response = await axios.post(API_URL, datos);
      
      // Actualizamos la lista con el nuevo envío que ya trae la prioridad de la IA
      setEnvios([response.data, ...envios]);
      setVista('listado');
      mostrarNotificacion(`¡Envío Registrado! ID: ${response.data.trackingId}`);
    } catch (error) {
      mostrarNotificacion("Error al guardar en la base de datos");
      console.error("Post Error:", error);
    }
  };

  // --- 3. SINCRONIZACIÓN CON BACKEND Y BÚSQUEDA DE CIRO ---
  useEffect(() => {
    const ejecutarCarga = async () => {
      try {
        // MODIFICACIÓN: Si hay texto en la lupa, usamos el endpoint de búsqueda del backend
        const url = terminoBusqueda.trim() 
          ? `${API_URL}/buscar?nombre=${terminoBusqueda}` 
          : API_URL;
          
        const response = await axios.get(url);
        setEnvios(response.data); 
      } catch (error) {
        mostrarNotificacion("Error de conexión con el servidor");
        console.error("Fetch Error:", error);
      }
    };

    if (usuario) {
      ejecutarCarga();
    }
  }, [usuario, terminoBusqueda]); // Se dispara cada vez que escribís en el buscador

  const cerrarTodo = () => {
    setEnvioSeleccionado(null);
    setVista('listado');
    setTerminoBusqueda('');
  };

  // --- 4. CIERRE DE SESIÓN: limpia todo el estado para no filtrar datos entre sesiones ---
  const cerrarSesion = () => {
    setUsuario(null);
    setVista('listado');
    setTerminoBusqueda('');
    setEnvioSeleccionado(null);
    setEnvios([]);
  };

  if (!usuario) {
    return <Acceso alIngresar={(user) => { setUsuario(user); mostrarNotificacion(`Hola, ${user.nombre}`); }} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <BarraNavegacion usuario={usuario} alCerrarSesion={cerrarSesion} alIrInicio={cerrarTodo} />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full pb-20">
        {vista === 'listado' && (
          <ListaEnvios 
            envios={envios} // Ahora pasamos 'envios' directamente porque el filtrado viene del backend
            rol={usuario.rol} 
            terminoBusqueda={terminoBusqueda} 
            alCambiarBusqueda={setTerminoBusqueda} 
            alSeleccionar={(e) => { setEnvioSeleccionado(e); setVista('detalle'); }} 
            alIrNuevo={() => setVista('alta')} 
          />
        )}

        {vista === 'alta' && (
          <FormularioEnvio alVolver={cerrarTodo} alGuardar={guardarNuevoEnvio} />
        )}

        {vista === 'detalle' && envioSeleccionado && (
          <DetalleEnvio envio={envioSeleccionado} alVolver={cerrarTodo} />
        )}
      </main>

      {/* FOOTER Y MODALES */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t px-6 py-3 text-[10px] flex justify-between items-center z-40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-gray-400 uppercase">LogiTrack Sistema Operativo</span>
          </div>
          <button onClick={() => setModalARCOAbierto(true)} className="flex items-center gap-1.5 hover:text-blue-600 font-semibold uppercase">
            <ShieldCheck size={12} className="text-blue-500" /> Derechos ARCO (Ley 25.326)
          </button>
        </div>
      </footer>

      <ModalARCO abierto={modalARCOAbierto} alCerrar={() => setModalARCOAbierto(false)} />

      {notificacion && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
          <AlertCircle className="text-blue-400 w-5 h-5" />
          <p className="text-sm font-bold">{notificacion}</p>
        </div>
      )}
    </div>
  );
}
