import React, { useState } from "react";
import styled from "styled-components";
import { InputNumber } from "antd";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  width: 488px;
  height: 76px;
  left: 390px;
  top: 724px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const Titulo = styled.div`
  font-family: 'TTSupermolot-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #292929;
`;

const CustomInputNumber = styled(InputNumber)`
  width: 90px;
  height: 40px;
  background: #FFFFFF;
  border: 2px solid ${({ isvalid }) => (isvalid ? "#414ABA" : "#FF0000")};
  border-radius: 6px;
  padding: 8px 12px;

  input {
    font-family: 'TTSupermolot-Regular';
    font-size: 16px;
    color: #292929;
  }
`;

const InputDadosMetereologicos = ({ onInputChange }) => {
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState({
    precipitacao: null,
    umidade: null,
    velocidadeVento: null
  });

  const handleInputChange = (field, value) => {
    setDadosMeteorologicos({
      ...dadosMeteorologicos,
      [field]: value
    });

    if (onInputChange) {
      onInputChange({ ...dadosMeteorologicos, [field]: value });
    }
  };

  const validateField = (value) => {
    return value !== null && value !== undefined && value !== "";
  };

  return (
    <Container>
      <InputContainer>
        <Titulo>Precipitação*</Titulo>
        <CustomInputNumber
          placeholder="Digite aqui"
          isvalid={validateField(dadosMeteorologicos.precipitacao) ? "true" : "false"}
          onChange={(value) => handleInputChange('precipitacao', value)}
          data-testid="input-precipitacao"
        />
      </InputContainer>
      <InputContainer>
        <Titulo>Umidade*</Titulo>
        <CustomInputNumber
          placeholder="Digite aqui"
          isvalid={validateField(dadosMeteorologicos.umidade) ? "true" : "false"}
          onChange={(value) => handleInputChange('umidade', value)}
          data-testid="input-umidade"
        />
      </InputContainer>
      <InputContainer>
        <Titulo>Velocidade do vento*</Titulo>
        <CustomInputNumber
          placeholder="Digite aqui"
          isvalid={validateField(dadosMeteorologicos.velocidadeVento) ? "true" : "false"}
          onChange={(value) => handleInputChange('velocidadeVento', value)}
          data-testid="input-velocidade-vento"
        />
      </InputContainer>
    </Container>
  );
};

export default InputDadosMetereologicos;