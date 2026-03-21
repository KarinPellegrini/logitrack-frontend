import React from 'react';
import { Package, User, Shield, ChevronRight } from 'lucide-react';

const Acceso = ({ alIngresar }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      <div className="text-center mb-10">
        <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200">
          <Package className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-gray-900">Logi<span className="text-blue-600">Track</span></h1>
        <p className="text-gray-500 mt-2">Sistema de Gestión Logística con IA</p>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Seleccionar Perfil de Acceso</h2>
        <div className="space-y-4">
          <button onClick={() => alIngresar('Operador')} className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-50 hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><User /></div>
              <div className="text-left"><p className="font-bold text-gray-800">Operador</p><p className="text-xs text-gray-500">Alta y búsqueda de envíos</p></div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
          <button onClick={() => alIngresar('Supervisor')} className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-50 hover:border-purple-500 hover:bg-purple-50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors"><Shield /></div>
              <div className="text-left"><p className="font-bold text-gray-800">Supervisor</p><p className="text-xs text-gray-500">Gestión de estados y auditoría</p></div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Acceso;