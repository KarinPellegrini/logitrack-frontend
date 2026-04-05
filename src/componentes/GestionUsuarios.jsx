import React, { useEffect, useState } from 'react';
import { ArrowLeft, Shield, User, RefreshCw } from 'lucide-react';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/usuarios`;

const GestionUsuarios = ({ usuarioActual, alVolver, alActualizarRol }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(r => setUsuarios(r.data))
      .finally(() => setCargando(false));
  }, []);

  const cambiarRol = async (id, rolActual) => {
    const nuevoRol = rolActual === 'Operador' ? 'Supervisor' : 'Operador';
    const response = await axios.put(`${API_URL}/${id}/rol`, null, { params: { rol: nuevoRol } });
    setUsuarios(prev => prev.map(u => u.id === id ? response.data : u));
    if (id === usuarioActual.id) {
      alActualizarRol(response.data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-800 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Volver al panel
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Gestión de Usuarios</h2>

        {cargando ? (
          <p className="text-sm text-gray-400 text-center py-8">Cargando usuarios...</p>
        ) : (
          <div className="space-y-3">
            {usuarios.map(u => (
              <div key={u.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${u.rol === 'Supervisor' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    {u.rol === 'Supervisor' ? <Shield size={18} /> : <User size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{u.nombre} {u.apellido}</p>
                    <p className="text-[10px] text-gray-400 font-mono">@{u.usuario}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-md ${u.rol === 'Supervisor' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                    {u.rol.toUpperCase()}
                  </span>
                  <button
                    onClick={() => cambiarRol(u.id, u.rol)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
                  >
                    <RefreshCw size={12} />
                    Cambiar a {u.rol === 'Operador' ? 'Supervisor' : 'Operador'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionUsuarios;
