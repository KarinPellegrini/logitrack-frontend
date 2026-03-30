import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('Pruebas básicas de la aplicación (App.jsx)', () => {
  it('debería renderizar la pantalla inicial de Ingreso al Sistema', () => {
    render(<App />);
    
    // Buscamos el título del login que sí está en el HTML renderizado
    const tituloLogin = screen.getByText(/Ingreso al Sistema/i);
    expect(tituloLogin).toBeInTheDocument();
  });
});