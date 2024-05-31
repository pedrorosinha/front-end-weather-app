import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 256px;
  height: 125px;
  left: 709px;
  top: 465px;
`;

const Titulo = styled.div`
  width: 252px;
  height: 39px;
  font-family: 'TTSupermolot-Regular';
  font-size: 32px;
  font-weight: 400;
  line-height: 39px;
  color: #292929;
`;

const Subtitulo = styled.div`
  width: 55px;
  height: 22px;
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  color: #292929;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const TurnoButton = styled.button`
  width: 77px;
  height: 40px;
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: ${({ isactive }) => (isactive ? 'bold' : '400')};
  line-height: 22px;
  text-align: center;
  color: ${({ isactive }) => (isactive ? '#221F52' : '#292929')};
  background-color: ${({ isactive }) => (isactive ? '#BEE7F9' : '#FFFFFF')};
  border: ${({ isactive }) => (isactive ? '1px solid #221F52' : '2px solid #414ABA')};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;

  &:hover {
    background-color: ${({ isactive }) => (isactive ? '#BEE7F9' : 'rgba(190, 231, 249, 0.8)')};
    color: ${({ isactive }) => (isactive ? '#221F52' : '#292929')};
    border: ${({ isactive }) => (isactive ? '1px solid #221F52' : '2px solid #414ABA')};
  }
`;

const InputTags = ({ onInputChange }) => {
  const [activeTurno, setActiveTurno] = useState(null);

  const handleTurnoClick = (turno) => {
    setActiveTurno(turno);
    onInputChange(turno);
  };

  const validateField = () => {
    return activeTurno !== null;
  };

  return (
    <Container>
      <Titulo>Selecione o turno</Titulo>
      <Subtitulo>Turno*</Subtitulo>
      <ButtonGroup>
        <TurnoButton
          isactive={activeTurno === "MANHA" ? "true" : "false"}
          onClick={() => handleTurnoClick("MANHA")}
        >
          Manhã
        </TurnoButton>
        <TurnoButton
          isactive={activeTurno === "TARDE" ? "true" : "false"}
          onClick={() => handleTurnoClick("TARDE")}
        >
          Tarde
        </TurnoButton>
        <TurnoButton
          isactive={activeTurno === "NOITE" ? "true" : "false"}
          onClick={() => handleTurnoClick("NOITE")}
        >
          Noite
        </TurnoButton>
      </ButtonGroup>
      {!validateField() && (
        <div style={{ color: 'red' }}>Por favor, selecione um turno.</div>
      )}
    </Container>
  );
};

export default InputTags;