import React, { useState } from "react";
import styled from "styled-components";
import { Select } from "antd";

const { Option } = Select;

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

const StyledSelect = styled(Select)`
  width: 200px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid #414ABA;

  .ant-select-item-option {
    border: 2px solid #414ABA;
    border-radius: 6px;
  }

  .ant-select-item-option-active {
    background-color: #85D4F4;
    border-color: #414ABA;
    .ant-select-item-option-content {
      color: #141ABA;
    }
  }

  .ant-select-arrow {
    width: 10.18px;
    height: 6.86px;
    color: #414ABA;
  }
`;

const CustomOption = styled(Option)`
  .ant-select-item-option-content {
    color: inherit;
  }
`;

const InputTempo = ({ onInputChange }) => {
  const [clima, setClima] = useState(null);

  const handleSelectChange = (value) => {
    setClima(value);
    onInputChange(value);
  };

  return (
    <Container>
      <Titulo>Informe o Clima</Titulo>
      <Subtitulo>Clima*</Subtitulo>
      <StyledSelect
        defaultValue="Selecione"
        placeholder="Selecione"
        onChange={handleSelectChange}
        value={clima}
        data-testid="input-clima"
      >
        <CustomOption 
          value="CHUVOSO"
          data-testid="option-chuvoso"
        >Chuvoso</CustomOption>
        <CustomOption 
          value="ENSOLARADO"
          data-testid="option-ensolarado"
        >Ensolarado</CustomOption>
        <CustomOption 
          value="GAROANDO"
          data-testid="option-garoando"
        >Garoando</CustomOption>
        <CustomOption 
          value="NEVANDO"
          data-testid="option-nevando"
        >Nevando</CustomOption>
        <CustomOption 
        value="NUBLADO"
        data-testid="option-nublado"
        >Nublado</CustomOption>
      </StyledSelect>
      {clima === null && (
        <div style={{ color: 'red' }}>Por favor, selecione um clima.</div>
      )}
    </Container>
  );
};

export default InputTempo;