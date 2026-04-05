import React, { useState, useEffect } from 'react';
import { Package, User, Lock, LogIn, AlertCircle, ShieldAlert, ArrowLeft, KeyRound, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL;

const TIEMPO_BLOQUEO_MS = 30000;
const MAX_INTENTOS = 3;

const formatoUsuarioValido = (usuario) => /^[a-zA-Z0-9._]{3,20}$/.test(usuario);

const Contador = ({ hasta, onVencido }) => {
  const [segundos, setSegundos] = useState(() => Math.ceil((hasta - Date.now()) / 1000));
  useEffect(() => {
    const intervalo = setInterval(() => {
      const restantes = Math.ceil((hasta - Date.now()) / 1000);
      if (restantes <= 0) { clearInterval(intervalo); onVencido(); }
      else setSegundos(restantes);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [hasta, onVencido]);
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-5xl font-black text-red-600 tabular-nums">{segundos}</span>
      <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">segundos</span>
    </div>
  );
};

// ─── Pantalla: Login ────────────────────────────────────────────────────────
const PantallaLogin = ({ alIngresar, alIrRecuperar }) => {
  const [datos, setDatos] = useState({ usuario: '', clave: '' });
  const [error, setError] = useState('');
  const [errorFormato, setErrorFormato] = useState('');
  const [cargando, setCargando] = useState(false);
  const [intentosFallidos, setIntentosFallidos] = useState(() => parseInt(localStorage.getItem('lt_intentos') || '0'));
  const [bloqueadoHasta, setBloqueadoHasta] = useState(() => parseInt(localStorage.getItem('lt_bloqueado') || '0') || null);
  const estaBloqueado = bloqueadoHasta && Date.now() < bloqueadoHasta;

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    if (name === 'usuario') setErrorFormato(value && !formatoUsuarioValido(value) ? 'Solo letras, números, puntos o guiones bajos (3-20 caracteres).' : '');
  };

  const registrarIntentoFallido = () => {
    const n = intentosFallidos + 1;
    setIntentosFallidos(n);
    localStorage.setItem('lt_intentos', n);
    if (n >= MAX_INTENTOS) {
      const hasta = Date.now() + TIEMPO_BLOQUEO_MS;
      setBloqueadoHasta(hasta);
      localStorage.setItem('lt_bloqueado', hasta);
    } else {
      setError(`Credenciales incorrectas. Intentos restantes: ${MAX_INTENTOS - n}`);
    }
  };

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (estaBloqueado || !formatoUsuarioValido(datos.usuario)) return;
    setCargando(true);
    try {
      const response = await axios.post(`${BASE}/auth/login`, datos);
      setIntentosFallidos(0); setBloqueadoHasta(null);
      localStorage.removeItem('lt_intentos'); localStorage.removeItem('lt_bloqueado');
      alIngresar(response.data);
    } catch { registrarIntentoFallido(); }
    finally { setCargando(false); }
  };

  const desbloquear = () => { setBloqueadoHasta(null); setIntentosFallidos(0); localStorage.removeItem('lt_bloqueado'); localStorage.removeItem('lt_intentos'); };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Ingreso al Sistema</h2>
      {estaBloqueado ? (
        <div className="flex flex-col items-center gap-5 py-6 text-center">
          <div className="bg-red-100 text-red-600 p-4 rounded-2xl"><ShieldAlert size={32} /></div>
          <p className="font-bold text-gray-800">Acceso bloqueado temporalmente</p>
          <Contador hasta={bloqueadoHasta} onVencido={desbloquear} />
          <p className="text-xs text-gray-400">Demasiados intentos fallidos.</p>
        </div>
      ) : (
        <form onSubmit={manejarLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" name="usuario" required
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 border transition-all ${errorFormato ? 'border-red-300 focus:ring-red-400' : 'border-transparent focus:ring-blue-500'}`}
                placeholder="Usuario" value={datos.usuario} onChange={manejarCambio} />
            </div>
            {errorFormato && <p className="text-[10px] text-red-500 px-1 font-medium">{errorFormato}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="password" name="clave" required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                placeholder="••••••••" value={datos.clave} onChange={manejarCambio} />
            </div>
          </div>
          {error && <div className="bg-red-50 text-red-600 text-[11px] p-3 rounded-xl flex items-center gap-2 border border-red-100"><AlertCircle size={14} /> {error}</div>}
          <button type="submit" disabled={!!errorFormato || cargando}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <LogIn size={18} /> {cargando ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
          <button type="button" onClick={alIrRecuperar} className="w-full text-center text-xs text-blue-500 hover:text-blue-700 font-medium pt-1">
            ¿Olvidaste tu contraseña?
          </button>
        </form>
      )}
    </>
  );
};

// ─── Pantalla: Solicitar recuperación ───────────────────────────────────────
const PantallaRecuperar = ({ alVolver, alObtenerToken }) => {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      const response = await axios.post(`${BASE}/auth/recuperar`, { usuario: usuarioInput });
      alObtenerToken(response.data.token);
    } catch {
      setError('No se encontró un usuario con ese nombre.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <button onClick={alVolver} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs font-medium mb-6">
        <ArrowLeft size={14} /> Volver al login
      </button>
      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Recuperar Contraseña</h2>
      <p className="text-xs text-gray-400 text-center mb-6">Ingresá tu nombre de usuario y te generaremos un token de recuperación.</p>
      <form onSubmit={manejarSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" required placeholder="Tu nombre de usuario"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
            value={usuarioInput} onChange={e => setUsuarioInput(e.target.value)} />
        </div>
        {error && <div className="bg-red-50 text-red-600 text-[11px] p-3 rounded-xl flex items-center gap-2 border border-red-100"><AlertCircle size={14} /> {error}</div>}
        <button type="submit" disabled={cargando}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
          <KeyRound size={18} /> {cargando ? 'Generando...' : 'Generar Token'}
        </button>
      </form>
    </>
  );
};

// ─── Pantalla: Ingresar token + nueva clave ─────────────────────────────────
const PantallaResetPassword = ({ tokenSimulado, alVolver, alExito }) => {
  const [form, setForm] = useState({ token: tokenSimulado || '', nuevaClave: '', confirmar: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (form.nuevaClave !== form.confirmar) { setError('Las contraseñas no coinciden.'); return; }
    if (form.nuevaClave.length < 4) { setError('La contraseña debe tener al menos 4 caracteres.'); return; }
    setCargando(true);
    try {
      await axios.post(`${BASE}/auth/reset-password`, { token: form.token, nuevaClave: form.nuevaClave });
      alExito();
    } catch {
      setError('Token inválido o expirado.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <button onClick={alVolver} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs font-medium mb-6">
        <ArrowLeft size={14} /> Volver
      </button>
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Nueva Contraseña</h2>

      {tokenSimulado && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
          <p className="font-bold mb-1">⚠ Modo desarrollo — simulación de email</p>
          <p className="mb-1">En producción este token llegaría por correo electrónico. Tu token es:</p>
          <p className="font-mono bg-white px-2 py-1 rounded border border-amber-200 break-all">{tokenSimulado}</p>
        </div>
      )}

      <form onSubmit={manejarSubmit} className="space-y-4">
        <div className="relative">
          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" required placeholder="Token de recuperación"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-transparent font-mono text-sm"
            value={form.token} onChange={e => setForm({ ...form, token: e.target.value })} />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="password" required placeholder="Nueva contraseña"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
            value={form.nuevaClave} onChange={e => setForm({ ...form, nuevaClave: e.target.value })} />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="password" required placeholder="Confirmar contraseña"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
            value={form.confirmar} onChange={e => setForm({ ...form, confirmar: e.target.value })} />
        </div>
        {error && <div className="bg-red-50 text-red-600 text-[11px] p-3 rounded-xl flex items-center gap-2 border border-red-100"><AlertCircle size={14} /> {error}</div>}
        <button type="submit" disabled={cargando}
          className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
          {cargando ? 'Guardando...' : 'Cambiar Contraseña'}
        </button>
      </form>
    </>
  );
};

// ─── Pantalla: Éxito ────────────────────────────────────────────────────────
const PantallaExito = ({ alVolver }) => (
  <div className="flex flex-col items-center gap-4 py-8 text-center">
    <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl"><CheckCircle size={36} /></div>
    <p className="font-bold text-gray-800 text-lg">¡Contraseña actualizada!</p>
    <p className="text-xs text-gray-400">Ya podés iniciar sesión con tu nueva contraseña.</p>
    <button onClick={alVolver} className="mt-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all">
      Ir al Login
    </button>
  </div>
);

// ─── Componente principal ───────────────────────────────────────────────────
const Acceso = ({ alIngresar }) => {
  const [pantalla, setPantalla] = useState('login');
  const [tokenSimulado, setTokenSimulado] = useState('');

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
          {pantalla === 'login' && (
            <PantallaLogin alIngresar={alIngresar} alIrRecuperar={() => setPantalla('recuperar')} />
          )}
          {pantalla === 'recuperar' && (
            <PantallaRecuperar
              alVolver={() => setPantalla('login')}
              alObtenerToken={(token) => { setTokenSimulado(token); setPantalla('reset'); }}
            />
          )}
          {pantalla === 'reset' && (
            <PantallaResetPassword
              tokenSimulado={tokenSimulado}
              alVolver={() => setPantalla('recuperar')}
              alExito={() => setPantalla('exito')}
            />
          )}
          {pantalla === 'exito' && (
            <PantallaExito alVolver={() => { setTokenSimulado(''); setPantalla('login'); }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Acceso;
