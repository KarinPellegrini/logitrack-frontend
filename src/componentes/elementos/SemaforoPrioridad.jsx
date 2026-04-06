import React from 'react';

const CONFIG = {
  ALTA:  { dot: 'bg-red-500',     bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     label: 'ALTA' },
  MEDIA: { dot: 'bg-amber-400',   bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   label: 'MEDIA' },
  BAJA:  { dot: 'bg-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'BAJA' },
};

const SemaforoPrioridad = ({ prioridad, size = 'sm' }) => {
  const c = CONFIG[prioridad];
  if (!c) return <span className="text-[10px] text-gray-300 italic font-semibold">PENDIENTE</span>;

  if (size === 'lg') {
    return (
      <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border ${c.bg} ${c.border}`}>
        <span className={`w-3 h-3 rounded-full shrink-0 ${c.dot}`} />
        <span className={`text-sm font-black ${c.text}`}>{c.label}</span>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2 py-1 rounded-md border ${c.bg} ${c.border} ${c.text}`}>
      <span className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
};

export default SemaforoPrioridad;
