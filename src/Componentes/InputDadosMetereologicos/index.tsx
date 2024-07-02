import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputNumber } from 'antd';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Subtitulo = styled.div`
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: 400;
  color: #292929;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 40px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 100px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid #414ABA;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: 400;
  color: #292929;
`;

interface InputDadosMeteorologicosProps {
  value?: {
    precipitacao: number | null;
    umidade: number | null;
    velocidadeVento: number | null;
  };
  onInputChange?: (value: {
    precipitacao?: number | null;
    umidade?: number | null;
    velocidadeVento?: number | null;
  }) => void;
}

const InputDadosMeteorologicos: React.FC<InputDadosMeteorologicosProps> = ({ value = {
  precipitacao: null,
  umidade: null,
  velocidadeVento: null,
}, onInputChange }) => {
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDadosMeteorologicos(value);
  }, [value]);

  const handleChange = (field: keyof typeof dadosMeteorologicos) => (value: string | number | null | undefined) => {
    const newValue = typeof value === 'string' ? parseFloat(value) : value;

    setDadosMeteorologicos(prevState => ({
      ...prevState,
      [field]: newValue
    }));

    if (onInputChange) {
      onInputChange({
        ...dadosMeteorologicos,
        [field]: newValue
      });
    }
  };

  const validateField = () => {
    return (
      dadosMeteorologicos.precipitacao !== null &&
      dadosMeteorologicos.umidade !== null &&
      dadosMeteorologicos.velocidadeVento !== null
    );
  };

  return (
    <Container>
      <InputGroup>
        <InputWrapper>
          <Subtitulo>Precipitação*</Subtitulo>
          <StyledInputNumber
            value={dadosMeteorologicos.precipitacao}
            onChange={handleChange('precipitacao')}
            placeholder="Digite aqui"
            formatter={(value) => `${value} mm`}
            parser={(value) => value ? value.replace(' mm', '') : ''}
            data-testid="input-precipitacao"
          />
        </InputWrapper>
        <InputWrapper>
          <Subtitulo>Umidade*</Subtitulo>
          <StyledInputNumber
            value={dadosMeteorologicos.umidade}
            onChange={handleChange('umidade')}
            placeholder="Digite aqui"
            formatter={(value) => `${value}%`}
            parser={(value) => value ? value.replace('%', '') : ''}
            data-testid="input-umidade"
          />
        </InputWrapper>
        <InputWrapper>
          <Subtitulo>Velocidade do Vento*</Subtitulo>
          <StyledInputNumber
            value={dadosMeteorologicos.velocidadeVento}
            onChange={handleChange('velocidadeVento')}
            placeholder="Digite aqui"
            formatter={(value) => `${value} km/h`}
            parser={(value) => value ? value.replace(' km/h', '') : ''}
            data-testid="input-velocidade-vento"
          />
        </InputWrapper>
      </InputGroup>
      {!validateField() && !error && (
        <div style={{ color: 'red' }}>Por favor, preencha todos os campos.</div>
      )}
    </Container>
  );
};

export default InputDadosMeteorologicos;
