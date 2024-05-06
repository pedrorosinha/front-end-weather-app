import styled from "styled-components";
import React from "react";
import { Button } from "antd";

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
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6.4px 15px;
  gap: 8px;
  width: 199px;
  height: 40px;
  background: #414aba;
  border: 1px solid #414aba;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
  border-radius: 2px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StyledCancelButton = styled(Button)`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6.4px 15px;
  gap: 8px;
  width: 201px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #414aba;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
  border-radius: 2px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const BotaoSave = ({ onClick }) => {
    return (
        <StyledSaveButton type="primary" onClick={onClick}>
            Salvar
        </StyledSaveButton>
    );
};

const BotaoCancelar = ({ onClick }) => {
    return (
        <StyledCancelButton onClick={onClick}>
            Cancelar
        </StyledCancelButton>
    );
};

const Botoes = ({ onSave, onCancel }) => {
    return (
        <ButtonContainer>
            <BotaoSave onClick={onSave} />
            <BotaoCancelar onClick={onCancel} />
        </ButtonContainer>
    );
};

export default Botoes;