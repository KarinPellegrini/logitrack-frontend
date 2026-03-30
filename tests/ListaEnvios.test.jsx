import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// ATENCIÓN ACÁ: La ruta cambia porque estamos en la carpeta /tests
import ListaEnvios from '../src/componentes/ListaEnvios'; 

describe('Componente ListaEnvios', () => {
  const enviosMock = [
    { trackingId: '123', nombre: 'Karin', estado: 'REGISTRADO', prioridad: 'ALTA' },
    { trackingId: '456', nombre: 'Ciro', estado: 'EN_TRANSITO', prioridad: null }
  ];

  it('debería renderizar la prioridad ALTA correctamente', () => {
    render(<ListaEnvios envios={enviosMock} rol="Operador" terminoBusqueda="" alCambiarBusqueda={() => {}} />);
    expect(screen.getByText('ALTA')).toBeInTheDocument();
  });

  it('debería mostrar PENDIENTE si el envío no tiene prioridad calculada', () => {
    render(<ListaEnvios envios={enviosMock} rol="Operador" terminoBusqueda="" alCambiarBusqueda={() => {}} />);
    expect(screen.getByText('PENDIENTE')).toBeInTheDocument();
  });
});