import React from "react";
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
    font-weight: ${({ isActive }) => (isActive ? 'bold' : '400')};
    line-height: 22px;
    text-align: center;
    color: ${({ isActive }) => (isActive ? '#221F52' : '#292929')};
    background-color: #BEE7F9;
    border: ${({ isActive }) => (isActive ? '1px solid #221F52' : '2px solid #414ABA')};
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#BEE7F9' : 'rgba(190, 231, 249, 0.8)')};
    color: ${({ isActive }) => (isActive ? '#221F52' : '#292929')};
    border: ${({ isActive }) => (isActive ? '1px solid #221F52' : '2px solid #414ABA')};
  }
`;

const InputTags = () => {
    const [activeTurno, setActiveTurno] = React.useState(null);

    const handleTurnoClick = (turno) => {
        setActiveTurno(turno);
        console.log(`Turno selecionado: ${turno}`);
    };

    return (
        <Container>
            <Titulo>Selecione o turno</Titulo>
            <Subtitulo>Turno*</Subtitulo>
            <ButtonGroup>

                <TurnoButton
                    isActive={activeTurno === "Manhã"}
                    onClick={() => handleTurnoClick("Manhã")}
                >
                    Manhã
                </TurnoButton>
                <TurnoButton
                    isActive={activeTurno === "Tarde"}
                    onClick={() => handleTurnoClick("Tarde")}
                >
                    Tarde
                </TurnoButton>
                <TurnoButton
                    isActive={activeTurno === "Noite"}
                    onClick={() => handleTurnoClick("Noite")}
                >
                    Noite
                </TurnoButton>
            </ButtonGroup>
        </Container>
    );
};

export default InputTags;