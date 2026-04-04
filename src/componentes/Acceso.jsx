import React, { useState } from 'react';
import { Package, User, Lock, LogIn, AlertCircle, ShieldAlert } from 'lucide-react';

// Usuarios de prueba para el prototipo
const USUARIOS_MOCK = [
  { id: 1, usuario: 'melina', clave: '1234', nombre: 'Melina Scabini', rol: 'Operador' },
  { id: 2, usuario: 'ciro', clave: 'admin', nombre: 'Ciro López', rol: 'Supervisor' }
];

const TIEMPO_BLOQUEO_MS = 30000; // 30 segundos
const MAX_INTENTOS = 3;

// CA-01: el usuario solo puede tener letras, números, puntos y guiones bajos (sin espacios ni caracteres raros)
const formatoUsuarioValido = (usuario) => /^[a-zA-Z0-9._]{3,20}$/.test(usuario);

const Acceso = ({ alIngresar }) => {
  const [datos, setDatos] = useState({ usuario: '', clave: '' });
  const [error, setError] = useState('');
  const [errorFormato, setErrorFormato] = useState('');
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [bloqueadoHasta, setBloqueadoHasta] = useState(null);

  const estaBloqueado = bloqueadoHasta && Date.now() < bloqueadoHasta;
  const segundosRestantes = estaBloqueado
    ? Math.ceil((bloqueadoHasta - Date.now()) / 1000)
    : 0;

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });

    // CA-01: validar formato del usuario en tiempo real
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

    // Bloqueo activo
    if (estaBloqueado) return;

    // CA-01: no dejar avanzar si el formato es inválido
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
      alIngresar(usuarioEncontrado);
    } else {
      const nuevosIntentos = intentosFallidos + 1;
      setIntentosFallidos(nuevosIntentos);

      // CA-04: bloquear tras MAX_INTENTOS
      if (nuevosIntentos >= MAX_INTENTOS) {
        setBloqueadoHasta(Date.now() + TIEMPO_BLOQUEO_MS);
        setError(`Demasiados intentos fallidos. Esperá 30 segundos.`);
      } else {
        // CA-03: mensaje genérico, no indica cuál campo falló
        setError(`Credenciales incorrectas. Intentos restantes: ${MAX_INTENTOS - nuevosIntentos}`);
      }
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

          {/* Pantalla de bloqueo */}
          {estaBloqueado ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                <ShieldAlert size={32} />
              </div>
              <p className="font-bold text-gray-800">Acceso bloqueado temporalmente</p>
              <p className="text-sm text-gray-500">
                Podés intentar de nuevo en <span className="font-black text-red-600">{segundosRestantes}s</span>
              </p>
              {/* Forzar re-render para actualizar la cuenta regresiva */}
              <Contador hasta={bloqueadoHasta} />
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

// Componente auxiliar que se re-renderiza cada segundo para actualizar la cuenta regresiva
const Contador = ({ hasta }) => {
  const [, setTick] = useState(0);

  React.useEffect(() => {
    const intervalo = setInterval(() => {
      setTick(t => t + 1);
      if (Date.now() >= hasta) clearInterval(intervalo);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [hasta]);

  return null;
};

export default Acceso;