import React from 'react';
import { Package, User, Shield, LogOut, Users, ShieldOff, BarChart2, ScrollText } from 'lucide-react';

const BarraNavegacion = ({ usuario, alCerrarSesion, alIrInicio, alIrUsuarios, alIrSolicitudes, cantidadSolicitudes, alIrDashboard, alIrLogs }) => (
  <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={alIrInicio}>
        <div className="bg-blue-600 p-2 rounded-lg"><Package className="text-white w-5 h-5" /></div>
        <h1 className="text-xl font-black tracking-tighter text-gray-800">Logi<span className="text-blue-600">Track</span></h1>
      </div>
      <div className="flex items-center gap-4">
        {usuario.rol === 'Supervisor' && (
          <>
            <button
              onClick={alIrDashboard}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
            >
              <BarChart2 size={14} /> Dashboard
            </button>
            <button
              onClick={alIrLogs}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50"
            >
              <ScrollText size={14} /> Logs
            </button>
            <button
              onClick={alIrUsuarios}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-purple-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-50"
            >
              <Users size={14} /> Usuarios
            </button>
            <button
              onClick={alIrSolicitudes}
              className="relative flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              <ShieldOff size={14} /> Borrado
              {cantidadSolicitudes > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cantidadSolicitudes}
                </span>
              )}
            </button>
          </>
        )}
        <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-800">{usuario.nombre}</p>
            <p className={`text-[10px] uppercase font-bold ${usuario.rol === 'Supervisor' ? 'text-purple-600' : 'text-blue-600'}`}>{usuario.rol}</p>
          </div>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${usuario.rol === 'Supervisor' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
            {usuario.rol === 'Supervisor' ? <Shield className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </div>
        </div>
        <button onClick={alCerrarSesion} className="text-gray-400 hover:text-red-600 transition-colors p-2"><LogOut className="w-5 h-5" /></button>
      </div>
    </div>
  </nav>
);

export default BarraNavegacion;
