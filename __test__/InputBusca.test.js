import React from 'react';
import InputBusca from '@componentes/InputBusca';
import { render, fireEvent } from '@testing-library/react';

describe('Componente do input de buscar a cidade', () => {
  it('Deve  preencher o campo do input de buscar a cidade colocando uma cidade', () => {
    const { getByTestId } = render(<InputBusca />);
    const input = getByTestId('input-busca');

    fireEvent.change(input, { target: { value: 'Porto Alegre' } });

    expect(input.value).toBe('Porto Alegre');
  });
});
