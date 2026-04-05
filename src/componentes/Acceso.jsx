import React, { useState, useEffect } from 'react';
import { Package, User, Lock, LogIn, AlertCircle, ShieldAlert } from 'lucide-react';

// Usuarios de prueba para el prototipo
const USUARIOS_MOCK = [
  { id: 1, usuario: 'melina', clave: '1234', nombre: 'Melina Scabini', rol: 'Operador' },
  { id: 2, usuario: 'ciro', clave: 'admin', nombre: 'Ciro López', rol: 'Supervisor' }
];

const TIEMPO_BLOQUEO_MS = 30000; // 30 segundos
const MAX_INTENTOS = 3;

const formatoUsuarioValido = (usuario) => /^[a-zA-Z0-9._]{3,20}$/.test(usuario);

// Contador regresivo: maneja su propio tick y muestra los segundos
const Contador = ({ hasta, onVencido }) => {
  const [segundos, setSegundos] = useState(Math.ceil((hasta - Date.now()) / 1000));

  useEffect(() => {
    const intervalo = setInterval(() => {
      const restantes = Math.ceil((hasta - Date.now()) / 1000);
      if (restantes <= 0) {
        clearInterval(intervalo);
        onVencido();
      } else {
        setSegundos(restantes);
      }
    }, 1000);
    return () => clearInterval(intervalo);
  }, [hasta]);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-5xl font-black text-red-600 tabular-nums">{segundos}</span>
      <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">segundos</span>
    </div>
  );
};

const Acceso = ({ alIngresar }) => {
  const [datos, setDatos] = useState({ usuario: '', clave: '' });
  const [error, setError] = useState('');
  const [errorFormato, setErrorFormato] = useState('');

  const [intentosFallidos, setIntentosFallidos] = useState(
    () => parseInt(localStorage.getItem('lt_intentos') || '0')
  );
  const [bloqueadoHasta, setBloqueadoHasta] = useState(
    () => parseInt(localStorage.getItem('lt_bloqueado') || '0') || null
  );

  const estaBloqueado = bloqueadoHasta && Date.now() < bloqueadoHasta;

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });

    if (name === 'usuario') {
      if (value && !formatoUsuarioValido(value)) {
        setErrorFormato('Solo letras, números, puntos o guiones bajos (3-20 caracteres).');
      } else {
        setErrorFormato('');
      }
    }
  };

  const manejarLogin = (e) => {
    e.preventDefault();
    setError('');

    if (estaBloqueado) return;

    if (!formatoUsuarioValido(datos.usuario)) {
      setErrorFormato('Formato de usuario inválido.');
      return;
    }

    const usuarioEncontrado = USUARIOS_MOCK.find(
      u => u.usuario === datos.usuario && u.clave === datos.clave
    );

    if (usuarioEncontrado) {
      setIntentosFallidos(0);
      setBloqueadoHasta(null);
      localStorage.removeItem('lt_intentos');
      localStorage.removeItem('lt_bloqueado');
      alIngresar(usuarioEncontrado);
    } else {
      const nuevosIntentos = intentosFallidos + 1;
      setIntentosFallidos(nuevosIntentos);
      localStorage.setItem('lt_intentos', nuevosIntentos);

      if (nuevosIntentos >= MAX_INTENTOS) {
        const nuevoBloqueadoHasta = Date.now() + TIEMPO_BLOQUEO_MS;
        setBloqueadoHasta(nuevoBloqueadoHasta);
        localStorage.setItem('lt_bloqueado', nuevoBloqueadoHasta);
      } else {
        setError(`Credenciales incorrectas. Intentos restantes: ${MAX_INTENTOS - nuevosIntentos}`);
      }
    }
  };

  const desbloquear = () => {
    setBloqueadoHasta(null);
    setIntentosFallidos(0);
    localStorage.removeItem('lt_bloqueado');
    localStorage.removeItem('lt_intentos');
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

          {estaBloqueado ? (
            <div className="flex flex-col items-center gap-5 py-6 text-center">
              <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                <ShieldAlert size={32} />
              </div>
              <p className="font-bold text-gray-800">Acceso bloqueado temporalmente</p>
              <Contador hasta={bloqueadoHasta} onVencido={desbloquear} />
              <p className="text-xs text-gray-400">Demasiados intentos fallidos. Esperá para volver a intentar.</p>
            </div>
          ) : (
            <form onSubmit={manejarLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Usuario</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text" name="usuario" required
                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 border transition-all ${
                      errorFormato ? 'border-red-300 focus:ring-red-400' : 'border-transparent focus:ring-blue-500'
                    }`}
                    placeholder="Usuario" value={datos.usuario} onChange={manejarCambio}
                  />
                </div>
                {errorFormato && (
                  <p className="text-[10px] text-red-500 px-1 font-medium">{errorFormato}</p>
                )}
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

              <button
                type="submit"
                disabled={!!errorFormato}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogIn size={18} /> Iniciar Sesión
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Acceso;