import React, { useState, ChangeEvent } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from '@ant-design/icons';

interface InputBuscaProps {
  marginLeft?: string;
  marginTop?: string;
  value?: string;
  style?: React.CSSProperties;
  onInputChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

const InputContainer = styled.div<{ marginLeft?: string; marginTop?: string; }>`
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

const InputBusca: React.FC<InputBuscaProps> = ({ marginLeft, marginTop, onInputChange, onSearch }) => {
  const [cidade, setCidade] = useState<string>("");
  const [cidadeValida, setCidadeValida] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCidade(value);
    setCidadeValida(value.trim() !== ""); 

    if (onInputChange) {
      onInputChange(value);
    }
  };
  
  const handleSearch = () => {
    if (cidadeValida && onSearch) {
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
