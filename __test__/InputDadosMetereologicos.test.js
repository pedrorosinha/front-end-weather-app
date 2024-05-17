import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputDadosMetereologicos from '@componentes/InputDadosMetereologicos';

describe('Componente do InputDadosMetereologicos', () => {
    it('Deve preencher os campos nos inputs', () => {
        const { getByTestId } = render(<InputDadosMetereologicos />);
        const inputPrecipitacao = getByTestId('input-precipitacao');
        const inputUmidade = getByTestId('input-umidade');
        const inputVelocidadeVento = getByTestId('input-velocidade-vento');

        fireEvent.change(inputPrecipitacao, { target: { value: 10 } });
        fireEvent.change(inputUmidade, { target: { value: 50 } });
        fireEvent.change(inputVelocidadeVento, { target: { value: 20 } });

        expect(inputPrecipitacao.value).toBe('10');
        expect(inputUmidade.value).toBe('50');
        expect(inputVelocidadeVento.value).toBe('20');
    });

    it('Deve chamar onInputChange com valores corretos', () => {
        const mockOnInputChange = jest.fn();
        const { getByTestId } = render(<InputDadosMetereologicos onInputChange={mockOnInputChange} />);
        const inputPrecipitacao = getByTestId('input-precipitacao');
        const inputUmidade = getByTestId('input-umidade');
        const inputVelocidadeVento = getByTestId('input-velocidade-vento');

        fireEvent.change(inputPrecipitacao, { target: { value: 10 } });
        fireEvent.change(inputUmidade, { target: { value: 50 } });
        fireEvent.change(inputVelocidadeVento, { target: { value: 20 } });

        expect(mockOnInputChange).toHaveBeenCalledTimes(3);
        expect(mockOnInputChange).toHaveBeenCalledWith({
            precipitacao: 10,
            umidade: 50,
            velocidadeVento: 20
        });
    });

    it('Deve validar os campos corretamente', () => {
        const { getByTestId } = render(<InputDadosMetereologicos />);
        const inputPrecipitacao = getByTestId('input-precipitacao');
        const inputUmidade = getByTestId('input-umidade');
        const inputVelocidadeVento = getByTestId('input-velocidade-vento');

        fireEvent.change(inputPrecipitacao, { target: { value: '' } });
        fireEvent.change(inputUmidade, { target: { value: null } });
        fireEvent.change(inputVelocidadeVento, { target: { value: undefined } });

        expect(inputPrecipitacao).toHaveAttribute('isvalid', 'false');
        expect(inputUmidade).toHaveAttribute('isvalid', 'false');
        expect(inputVelocidadeVento).toHaveAttribute('isvalid', 'false');
    });
});
