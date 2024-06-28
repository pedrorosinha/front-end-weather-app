import React, { useState } from "react";
import styled from "styled-components";

enum Turno {
  MANHA = "MANHA",
  TARDE = "TARDE",
  NOITE = "NOITE",
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 49px;
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

interface TurnoButtonProps {
  isactive: boolean;
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const TurnoButton = styled.button<TurnoButtonProps>`
  width: 77px;
  height: 40px;
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: ${({ isactive }) => (isactive ? 'bold' : '400')};
  color: ${({ isactive }) => (isactive ? '#221F52' : '#292929')};
  background-color: ${({ isactive }) => (isactive ? '#BEE7F9' : '#FFFFFF')};
  border: ${({ isactive }) => (isactive ? '1px solid #221F52' : '2px solid #414ABA')};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ isactive }) => (isactive ? '#BEE7F9' : 'rgba(190, 231, 249, 0.8)')};
    color: ${({ isactive }) => (isactive ? '#221F52' : '#292929')};
    border: ${({ isactive }) => (isactive ? '1px solid #221F52' : '2px solid #414ABA')};
  }
`;

interface InputTagsProps {
  value: Turno | null;
  onInputChange?: (turno: Turno) => void;
}

const InputTags: React.FC<InputTagsProps> = ({ value, onInputChange }) => {
  const [activeTurno, setActiveTurno] = useState<Turno | null>(value);

  const handleTurnoClick = (turno: Turno) => {
    setActiveTurno(turno);
    if (onInputChange) {
      onInputChange(turno);
    }
  };

  const validateField = () => {
    return activeTurno !== null;
  };

  return (
    <Container data-testid="input-tags">
      <Titulo>Informe o Turno</Titulo>
      <Subtitulo>Turno*</Subtitulo>
      <ButtonGroup>
        <TurnoButton
          data-testid="button-manha"
          isactive={activeTurno === Turno.MANHA}
          onClick={() => handleTurnoClick(Turno.MANHA)}
        >
          Manhã
        </TurnoButton>
        <TurnoButton
          data-testid="button-tarde"
          isactive={activeTurno === Turno.TARDE}
          onClick={() => handleTurnoClick(Turno.TARDE)}
        >
          Tarde
        </TurnoButton>
        <TurnoButton
          data-testid="button-noite"
          isactive={activeTurno === Turno.NOITE}
          onClick={() => handleTurnoClick(Turno.NOITE)}
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