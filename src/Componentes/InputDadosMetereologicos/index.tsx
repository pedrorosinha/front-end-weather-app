import React, { useState } from "react";
import styled from "styled-components";
import { InputNumber } from "antd";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 488px;
  height: 76px;
  margin-bottom: 55px;
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

const CustomInputNumber = styled(InputNumber)<{ isvalid: string }>`
  width: 90px;
  height: 40px;
  background: #FFFFFF;
  border: 2px solid ${({ isvalid }) => (isvalid === "true" ? "#414ABA" : "#FF0000")};
  border-radius: 6px;
  padding: 8px 12px;

  input {
    font-family: 'TTSupermolot-Regular';
    font-size: 16px;
    color: #292929;
  }
`;

interface InputDadosMetereologicosProps {
  onInputChange?: (data: { precipitacao: number | null; umidade: number | null; velocidadeVento: number | null }) => void;
}

const InputDadosMetereologicos: React.FC<InputDadosMetereologicosProps> = ({ onInputChange }) => {
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState({
    precipitacao: null as number | null,
    umidade: null as number | null,
    velocidadeVento: null as number | null
  });

  const handleInputChange = (field: keyof typeof dadosMeteorologicos, value: number | undefined | string | null) => {
    const parsedValue = typeof value === 'string' ? parseFloat(value) : value;

    if (!isNaN(parsedValue as number) || parsedValue === null) {
      setDadosMeteorologicos({
        ...dadosMeteorologicos,
        [field]: parsedValue
      });

      if (onInputChange) {
        onInputChange({
          ...dadosMeteorologicos,
          [field]: parsedValue
        });
      }
    }
  };

  const validateField = (value: number | null | undefined): boolean => {
    return value !== null && value !== undefined && !isNaN(value);
  };

  return (
    <Container>
      <InputContainer>
        <Titulo>Precipitação*</Titulo>
        <CustomInputNumber
          placeholder="Digite aqui"
          isvalid={validateField(dadosMeteorologicos.precipitacao) ? "true" : "false"}
          onChange={(value) => handleInputChange('precipitacao', value)}
          formatter={(value) => `${value}mm`}
          parser={(value) => value ? value.replace('mm', '') : ''}
          data-testid="input-precipitacao"
        />
      </InputContainer>
      <InputContainer>
        <Titulo>Umidade*</Titulo>
        <CustomInputNumber
          placeholder="Digite aqui"
          isvalid={validateField(dadosMeteorologicos.umidade) ? "true" : "false"}
          onChange={(value) => handleInputChange('umidade', value)}
          formatter={(value) => `${value}%`}
          parser={(value) => value ? value.replace('%', '') : ''}
          data-testid="input-umidade"
        />
      </InputContainer>
      <InputContainer>
        <Titulo>Velocidade do vento*</Titulo>
        <CustomInputNumber
          placeholder="Digite aqui"
          isvalid={validateField(dadosMeteorologicos.velocidadeVento) ? "true" : "false"}
          onChange={(value) => handleInputChange('velocidadeVento', value)}
          formatter={(value) => `${value}km/h`}
          parser={(value) => value ? value.replace('km/h', '') : ''}
          data-testid="input-velocidade-vento"
        />
      </InputContainer>
    </Container>
  );
};

export default InputDadosMetereologicos;