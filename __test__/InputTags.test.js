import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputTags from '@componentes/InputTags';

describe('Componente InputTags', () => {
  test('deve renderizar corretamente', () => {
    render(<InputTags onInputChange={() => {}} />);
    
    expect(screen.getByText('Selecione o turno')).toBeInTheDocument();
    expect(screen.getByText('Turno*')).toBeInTheDocument();
    expect(screen.getByText('Manhã')).toBeInTheDocument();
    expect(screen.getByText('Tarde')).toBeInTheDocument();
    expect(screen.getByText('Noite')).toBeInTheDocument();
  });

  test('deve chamar onInputChange com o turno selecionado', () => {
    const mockOnInputChange = jest.fn();
    render(<InputTags onInputChange={mockOnInputChange} />);
    
    const botaoManha = screen.getByText('Manhã');
    fireEvent.click(botaoManha);

    expect(mockOnInputChange).toHaveBeenCalledWith('Manhã');
  });
});