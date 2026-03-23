import React, { useState } from 'react';
import { Package, User, Lock, LogIn, AlertCircle } from 'lucide-react';

// Usuarios de prueba para el prototipo
const USUARIOS_MOCK = [
  { id: 1, usuario: 'melina', clave: '1234', nombre: 'Melina Scabini', rol: 'Operador' },
  { id: 2, usuario: 'ciro', clave: 'admin', nombre: 'Ciro López', rol: 'Supervisor' }
];

const Acceso = ({ alIngresar }) => {
  const [datos, setDatos] = useState({ usuario: '', clave: '' });
  const [error, setError] = useState('');

  const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const manejarLogin = (e) => {
    e.preventDefault();
    setError('');

    const usuarioEncontrado = USUARIOS_MOCK.find(
      u => u.usuario === datos.usuario && u.clave === datos.clave
    );

    if (usuarioEncontrado) {
      alIngresar(usuarioEncontrado);
    } else {
      setError('Credenciales incorrectas (Probá: melina/1234 o ciro/admin)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200">
            <Package className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900">Logi<span className="text-blue-600">Track</span></h1>
          <p className="text-gray-500 mt-2 font-medium">Sistema de Gestión Logística</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Ingreso al Sistema</h2>
          <form onSubmit={manejarLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Usuario</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" name="usuario" required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-transparent transition-all"
                  placeholder="Usuario" value={datos.usuario} onChange={manejarCambio}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="password" name="clave" required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-transparent transition-all"
                  placeholder="••••••••" value={datos.clave} onChange={manejarCambio}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-[11px] p-3 rounded-xl flex items-center gap-2 border border-red-100">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-2">
              <LogIn size={18} /> Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Acceso;