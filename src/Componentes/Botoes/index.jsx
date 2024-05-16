import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 409px;
  height: 40px;
  top: 852px;
  left: 516px;
  gap: 9px;
`;

const StyledSaveButton = styled(Button)`
  width: 199px;
  height: 40px;
  background: #414aba;
  border: 1px solid #414aba;
  border-radius: 2px;
  color: #ffffff;
  font-family: 'TTSupermolot-Bold';
  font-size: 18px;
  
  &:hover {
    background-color: #14B6EF !important;
    color: #ffffff !important;
  }
`;

const StyledCancelButton = styled(Button)`
  width: 201px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #414aba;
  border-radius: 2px;
  color: #414aba;
  font-family: 'TTSupermolot-Bold';
  font-size: 18px;
  
  &:hover {
    background-color: #FFFFFF !important;
    border: 2px solid #14B6EF !important;
    color: #14B6EF !important;
  }
`;
const Botoes = ({ onSave, onCancel }) => {
  const handleClickSalvar = () => {
    onSave();
  };

  return (
    <>
      <ButtonContainer>
        <StyledCancelButton onClick={onCancel}>Cancelar</StyledCancelButton>
        <StyledSaveButton onClick={handleClickSalvar}>Salvar</StyledSaveButton>
      </ButtonContainer>
    </>
  );
};

export default Botoes;