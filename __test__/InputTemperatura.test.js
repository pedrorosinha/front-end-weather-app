import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputTemperatura from '@componentes/InputTemperatura';

describe('Componente InputTemperatura', () => {
  test('deve renderizar corretamente', () => {
    render(<InputTemperatura onInputChange={() => {}} />);
    
    expect(screen.getByText('Informe a temperatura')).toBeInTheDocument();
    expect(screen.getByText('Mínima*')).toBeInTheDocument();
    expect(screen.getByText('Máxima*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mín')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Máx')).toBeInTheDocument();
  });

  test('deve chamar onInputChange com a temperatura mínima corretamente', () => {
    const mockOnInputChange = jest.fn();
    render(<InputTemperatura onInputChange={mockOnInputChange} />);
    
    const inputMinima = screen.getByPlaceholderText('Mín');
    fireEvent.change(inputMinima, { target: { value: '10' } });
    fireEvent.blur(inputMinima);

    expect(mockOnInputChange).toHaveBeenCalledWith({ temperaturaMinima: 10, temperaturaMaxima: null });
  });

  test('deve chamar onInputChange com a temperatura máxima corretamente', () => {
    const mockOnInputChange = jest.fn();
    render(<InputTemperatura onInputChange={mockOnInputChange} />);
    
    const inputMaxima = screen.getByPlaceholderText('Máx');
    fireEvent.change(inputMaxima, { target: { value: '30' } });
    fireEvent.blur(inputMaxima);

    expect(mockOnInputChange).toHaveBeenCalledWith({ temperaturaMinima: null, temperaturaMaxima: 30 });
  });

  test('deve chamar onInputChange com ambas temperaturas corretamente', () => {
    const mockOnInputChange = jest.fn();
    render(<InputTemperatura onInputChange={mockOnInputChange} />);
    
    const inputMinima = screen.getByPlaceholderText('Mín');
    const inputMaxima = screen.getByPlaceholderText('Máx');
    
    fireEvent.change(inputMinima, { target: { value: '10' } });
    fireEvent.blur(inputMinima);
    fireEvent.change(inputMaxima, { target: { value: '30' } });
    fireEvent.blur(inputMaxima);

    expect(mockOnInputChange).toHaveBeenCalledWith({ temperaturaMinima: 10, temperaturaMaxima: null });
    expect(mockOnInputChange).toHaveBeenCalledWith({ temperaturaMinima: 10, temperaturaMaxima: 30 });
  });
});
