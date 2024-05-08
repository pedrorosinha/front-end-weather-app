import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import CenarioErro from "../CenarioErro";

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
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
  border-radius: 2px;
  span {
    font-family: 'TTSupermolot-Bold';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #FFFF;
  }
`;

const StyledCancelButton = styled(Button)`
  width: 201px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #414aba;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
  border-radius: 2px;
  span {
    font-family: 'TTSupermolot-Bold';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #414aba;
  }
`;

const Botoes = ({ onSave, onCancel, validateFields }) => {
    const [erroVisivel, setErroVisivel] = useState(false);

    const handleClickSalvar = () => {
        if (validateFields && typeof validateFields === "function") {
            onSave();
        } else {
            setErroVisivel(true);
        }
    };

    const handleCloseErro = () => {
        setErroVisivel(false);
    };

    return (
        <>
            <ButtonContainer>
                <StyledCancelButton onClick={onCancel}>Cancelar</StyledCancelButton>
                <StyledSaveButton onClick={handleClickSalvar}>Salvar</StyledSaveButton>
            </ButtonContainer>
            <CenarioErro isOpen={erroVisivel} onClose={handleCloseErro} />
        </>
    );
};

export default Botoes;