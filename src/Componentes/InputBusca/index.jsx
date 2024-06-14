import React, { useState } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from '@ant-design/icons';

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: 16px;
  width: 466px;
  margin-left: ${({ marginLeft }) => marginLeft || '0px'};
  margin-top: ${({ marginTop }) => marginTop || '0px'};
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

const StyledInput = styled(Input)`
  &.ant-input {
    width: 100%;
    height: 40px;
    background-color: #FFFFFF;
    font-family: 'TTSupermolot-Regular';
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    padding-right: 40px;
  }

  &:not(:focus) {
    border: 2px solid #414ABA;  
  }
`;

const StyledSearchIcon = styled(SearchOutlined)`
  font-size: 18px;
  color: #414ABA;
  border-radius: 50%;
  cursor: pointer;
  padding: 4px; 
`;

const InputBusca = ({ marginLeft, marginTop, onInputChange, onSearch }) => {
  const [cidade, setCidade] = useState("");
  const [cidadeValida, setCidadeValida] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCidade(value);
    setCidadeValida(value.trim() !== ""); 

    if (typeof onInputChange === 'function') {
      onInputChange(value);
    }
  };
  
  const handleSearch = () => {
    if (cidadeValida && typeof onSearch === 'function') {
      onSearch(cidade);
    }
  };

  return (
    <InputContainer marginLeft={marginLeft} marginTop={marginTop}>
      <Titulo>Buscar Cidade</Titulo>
      <Subtitulo>Cidade*</Subtitulo>
      <StyledInput
        size='large'
        placeholder='Busque por uma cidade'
        suffix={<StyledSearchIcon onClick={handleSearch} />} 
        value={cidade}
        onChange={handleInputChange}
        className={cidadeValida ? "valid" : "invalid"}
        data-testid="input-busca"
        onPressEnter={handleSearch}
      />
      {!cidadeValida && <div style={{ color: 'red' }}>Informe a cidade</div>}
    </InputContainer>
  );
};

export default InputBusca;