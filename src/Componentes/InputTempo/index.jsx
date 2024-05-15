import React, { useState } from "react";
import styled from "styled-components";
import { Select } from "antd";

const { Option } = Select;

const Container = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const Titulo = styled.div`
  position: absolute;
  width: 224px;
  height: 39px;
  left: 120px;
  top: 669px;
  font-family: 'TTSupermolot-Regular';
  font-size: 32px;
  font-weight: 400;
  line-height: 39.36px;
  color: #292929;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  position: absolute;
  width: 207px;
  height: 70px;
  left: 120px;
  top: 724px;
`;

const Subtitulo = styled.div`
  width: 52px;
  height: 22px;
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  color: #292929;
`;

const StyledSelect = styled(Select)`
  width: 100%;
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
      <Titulo>Informe o clima</Titulo>
      <SelectContainer>
        <Subtitulo>Clima*</Subtitulo>
        <StyledSelect
          defaultValue="Selecione"
          onChange={handleSelectChange}
          value={clima}
        >
          <CustomOption value="chuvoso">Chuvoso</CustomOption>
          <CustomOption value="ensolarado">Ensolarado</CustomOption>
          <CustomOption value="garoando">Garoando</CustomOption>
          <CustomOption value="nevando">Nevando</CustomOption>
          <CustomOption value="nublado">Nublado</CustomOption>
        </StyledSelect>
        {clima === null && (
          <div style={{ color: 'red' }}>Por favor, selecione um clima.</div>
        )}
      </SelectContainer>
    </Container>
  );
};

export default InputTempo;