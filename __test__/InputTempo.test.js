import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputTempo from '@componentes/InputTempo';

describe('Componente InputTempo', () => {
  test('deve renderizar corretamente', () => {
    render(<InputTempo onInputChange={() => {}} />);
    
    expect(screen.getByText('Informe o clima')).toBeInTheDocument();
    expect(screen.getByText('Clima*')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('deve exibir mensagem de erro quando nenhuma opção é selecionada', () => {
    render(<InputTempo onInputChange={() => {}} />);

    fireEvent.click(document.body);
    
    expect(screen.getByText('Por favor, selecione um clima.')).toBeInTheDocument();
  });

  test('não deve exibir mensagem de erro quando uma opção é selecionada', () => {
    render(<InputTempo onInputChange={() => {}} />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText('Ensolarado'));
    
    expect(screen.queryByText('Por favor, selecione um clima.')).not.toBeInTheDocument();
  });
});
