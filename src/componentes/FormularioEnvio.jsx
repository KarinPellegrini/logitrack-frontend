import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Package, User, MapPin } from 'lucide-react';

const REGLAS = {
  nombre:              { regex: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, msg: 'Solo se permiten letras.' },
  apellido:            { regex: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, msg: 'Solo se permiten letras.' },
  dni:                 { regex: /^\d{7,8}$/, msg: 'El DNI debe tener 7 u 8 dígitos numéricos.' },
  codigoPostalOrigen:  { regex: /^\d{4}$/, msg: 'El CP debe tener exactamente 4 dígitos.' },
  codigoPostalDestino: { regex: /^\d{4}$/, msg: 'El CP debe tener exactamente 4 dígitos.' },
};

const validarCampo = (name, value) => {
  if (!value) return 'Este campo es obligatorio.';
  if (REGLAS[name] && !REGLAS[name].regex.test(value)) return REGLAS[name].msg;
  return '';
};

const FormularioEnvio = ({ alGuardar, alVolver }) => {
  const [envio, setEnvio] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    codigoPostalOrigen: '',
    codigoPostalDestino: '',
    peso: '',
    tipoEnvio: 'Estandar'
  });

  const [errores, setErrores] = useState({});
  const [terminosAceptados, setTerminosAceptados] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnvio(prev => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: validarCampo(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrores(prev => ({ ...prev, [name]: validarCampo(name, value) }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const camposAValidar = ['nombre', 'apellido', 'dni', 'direccion', 'codigoPostalOrigen', 'codigoPostalDestino'];
    const nuevosErrores = {};
    camposAValidar.forEach(campo => {
      const error = validarCampo(campo, envio[campo]);
      if (error) nuevosErrores[campo] = error;
    });

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    if (!terminosAceptados) {
      alert("Por favor, acepta la declaración de protección de datos (Ley 25.326).");
      return;
    }

    alGuardar({ ...envio, peso: parseFloat(envio.peso) || 0 });
  };

  const inputClass = (campo) =>
    `w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 transition-all ${
      errores[campo] ? 'ring-2 ring-red-400 bg-red-50' : 'focus:ring-blue-500'
    }`;

  const ErrorMsg = ({ campo }) =>
    errores[campo] ? <p className="text-xs text-red-500 mt-1 ml-1">{errores[campo]}</p> : null;

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500 pb-10">
      <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-800 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Volver al panel
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Registrar Nuevo Envío</h2>

        <form onSubmit={manejarEnvio} className="space-y-6">
          {/* SECCIÓN 1: DESTINATARIO */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><User size={12}/> Datos del Destinatario</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input name="nombre" className={inputClass('nombre')} placeholder="Nombre *" value={envio.nombre} onChange={handleChange} onBlur={handleBlur} />
                <ErrorMsg campo="nombre" />
              </div>
              <div>
                <input name="apellido" className={inputClass('apellido')} placeholder="Apellido *" value={envio.apellido} onChange={handleChange} onBlur={handleBlur} />
                <ErrorMsg campo="apellido" />
              </div>
            </div>
            <div>
              <input name="dni" type="text" inputMode="numeric" className={inputClass('dni')} placeholder="DNI del destinatario *" value={envio.dni} onChange={handleChange} onBlur={handleBlur} />
              <ErrorMsg campo="dni" />
            </div>
            <div>
              <input name="direccion" className={inputClass('direccion')} placeholder="Dirección de entrega (Calle y nro) *" value={envio.direccion} onChange={handleChange} onBlur={handleBlur} />
              <ErrorMsg campo="direccion" />
            </div>
          </div>

          {/* SECCIÓN 2: LOGÍSTICA */}
          <div className="space-y-4 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Puntos de Control y Carga</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input name="codigoPostalOrigen" className={inputClass('codigoPostalOrigen')} placeholder="CP Origen *" value={envio.codigoPostalOrigen} onChange={handleChange} onBlur={handleBlur} />
                <ErrorMsg campo="codigoPostalOrigen" />
              </div>
              <div>
                <input name="codigoPostalDestino" className={inputClass('codigoPostalDestino')} placeholder="CP Destino *" value={envio.codigoPostalDestino} onChange={handleChange} onBlur={handleBlur} />
                <ErrorMsg campo="codigoPostalDestino" />
              </div>
            </div>
            <div className="relative">
              <input name="peso" type="number" step="0.1" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 pr-10" placeholder="Peso total de la carga *" value={envio.peso} onChange={handleChange} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">kg</span>
            </div>
            <select name="tipoEnvio" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={envio.tipoEnvio} onChange={handleChange}>
              <option value="Estandar">Estándar</option>
              <option value="Fragil">Frágil</option>
              <option value="Medica">Médica</option>
              <option value="Peligrosa">Peligrosa</option>
            </select>
          </div>

          {/* COMPROMISO DE PRIVACIDAD */}
          <div className="mt-8 p-4 bg-emerald-50 rounded-2xl flex items-start gap-3 border border-emerald-100">
            <input type="checkbox" className="mt-1 w-4 h-4 rounded text-emerald-600" checked={terminosAceptados} onChange={() => setTerminosAceptados(!terminosAceptados)} />
            <div className="text-[11px] text-gray-600 leading-tight">
              <p className="font-bold text-emerald-800 mb-1 flex items-center gap-1"><ShieldCheck size={12}/> Privacidad y Algoritmos (Ley 25.326)</p>
              Autorizo el procesamiento de estos datos para el cálculo de prioridad logística mediante el modelo RandomForest de la IA de LogiTrack.
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-50">
            <button type="button" onClick={alVolver} className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold">Cancelar</button>
            <button type="submit" className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-all">
              <Package size={18}/> Enviar a Procesamiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEnvio;
