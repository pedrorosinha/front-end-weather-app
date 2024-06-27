import React, { useState } from "react";
import styled from "styled-components";
import { InputNumber } from "antd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Titulo = styled.div`
  font-family: 'TTSupermolot-Regular';
  font-size: 32px;
  font-weight: 400;
  color: #292929;
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

interface InputTemperaturaProps {
  onInputChange?: (value: { min: number | null, max: number | null }) => void;
}

const InputTemperatura: React.FC<InputTemperaturaProps> = ({ onInputChange }) => {
  const [temperaturaMin, setTemperaturaMin] = useState<number | null>(null);
  const [temperaturaMax, setTemperaturaMax] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChangeMin = (value: string | number | null | undefined) => {
    const min = typeof value === 'string' ? parseFloat(value) : value as number | null;
    
    if (temperaturaMax !== null && min !== null && min > temperaturaMax) {
      setError("A temperatura mínima não pode ser maior que a máxima.");
    } else {
      setError(null);
    }
    
    setTemperaturaMin(min);
    if (onInputChange) {
      onInputChange({ min, max: temperaturaMax });
    }
  };

  const handleChangeMax = (value: string | number | null | undefined) => {
    const max = typeof value === 'string' ? parseFloat(value) : value as number | null;
    
    if (temperaturaMin !== null && max !== null && max < temperaturaMin) {
      setError("A temperatura máxima não pode ser menor que a mínima.");
    } else {
      setError(null);
    }
    
    setTemperaturaMax(max);
    if (onInputChange) {
      onInputChange({ min: temperaturaMin, max });
    }
  };

  const validateField = () => {
    return (
      temperaturaMin !== null &&
      temperaturaMax !== null
    );
  };

  return (
    <Container>
      <Titulo>Informe a Temperatura</Titulo>
      <InputGroup>
        <InputWrapper>
          <Subtitulo>Min*</Subtitulo>
          <StyledInputNumber
            value={temperaturaMin}
            onChange={handleChangeMin}
            placeholder="Mín"
            formatter={(value) => `${value}ºC`}
            parser={(value) => value ? value.replace('ºC', '') : ''}
            data-testid="input-temperatura-min"
          />
        </InputWrapper>
        <InputWrapper>
          <Subtitulo>Máx*</Subtitulo>
          <StyledInputNumber
            value={temperaturaMax}
            onChange={handleChangeMax}
            placeholder="Máx"
            formatter={(value) => `${value}ºC`}
            parser={(value) => value ? value.replace('ºC', '') : ''}
            data-testid="input-temperatura-max"
          />
        </InputWrapper>
      </InputGroup>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!validateField() && !error && (
        <div style={{ color: 'red' }}>Por favor, insira as temperaturas mínima e máxima.</div>
      )}
    </Container>
  );
};

export default InputTemperatura;
