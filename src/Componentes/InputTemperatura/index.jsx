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

const InputTemperatura = ({ onInputChange }) => {
  const [temperaturaMin, setTemperaturaMin] = useState(null);
  const [temperaturaMax, setTemperaturaMax] = useState(null);
  const [error, setError] = useState(null);

  const handleChangeMin = (value) => {
    if (temperaturaMax !== null && value > temperaturaMax) {
      setError("A temperatura mínima não pode ser maior que a máxima.");
    } else {
      setError(null);
    }
    setTemperaturaMin(value);
    onInputChange({ min: value, max: temperaturaMax });
  };

  const handleChangeMax = (value) => {
    if (temperaturaMin !== null && value < temperaturaMin) {
      setError("A temperatura máxima não pode ser menor que a mínima.");
    } else {
      setError(null);
    }
    setTemperaturaMax(value);
    onInputChange({ min: temperaturaMin, max: value });
  };

  const validateField = () => {
    return (
      temperaturaMin !== null &&
      temperaturaMin !== undefined &&
      temperaturaMin !== '' &&
      temperaturaMax !== null &&
      temperaturaMax !== undefined &&
      temperaturaMax !== ''
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
            parser={(value) => value?.replace('ºC', '')}
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
            parser={(value) => value?.replace('ºC', '')}
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