import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormularioEnvio from '../src/componentes/FormularioEnvio';

describe('Componente FormularioEnvio', () => {
  it('debería contener el campo de CP de Origen obligatorio para la IA', () => {
    render(<FormularioEnvio alGuardar={() => {}} alCancelar={() => {}} />);
    
    // En lugar de buscar un texto libre, buscamos el input por su placeholder exacto
    const inputCPOrigen = screen.getByPlaceholderText(/CP Origen \*/i);
    
    expect(inputCPOrigen).toBeInTheDocument();
  });
});