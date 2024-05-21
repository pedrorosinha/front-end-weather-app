import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputData from '@componentes/InputData';

jest.mock('antd', () => ({
  DatePicker: ({ onChange, placeholder }) => (
    <input
      data-testid="datepicker"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value, e.target.value)}
    />
  ),
}));

describe('Componente InputData', () => {
  test('renderiza corretamente', () => {
    render(<InputData onInputChange={() => {}} />);

    expect(screen.getByText('Selecione a data')).toBeInTheDocument();
    expect(screen.getByText('Data*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Selecione a data')).toBeInTheDocument();
  });

  test('chama onInputChange quando uma data é selecionada', () => {
    const handleInputChange = jest.fn();
    render(<InputData onInputChange={handleInputChange} />);

    fireEvent.change(screen.getByTestId('datepicker'), {
      target: { value: '2024-05-21' },
    });

    expect(handleInputChange).toHaveBeenCalledWith('2024-05-21');
  });

  test('mostra mensagem de erro se uma data não for selecionada', () => {
    render(<InputData onInputChange={() => {}} />);

    fireEvent.blur(screen.getByTestId('datepicker'));

    expect(screen.getByText('Selecione uma data.')).toBeInTheDocument();
  });
});
