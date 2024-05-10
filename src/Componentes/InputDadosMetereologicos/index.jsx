import React, { useState } from "react";
import styled from "styled-components";
import { InputNumber } from "antd";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    width: 488px;
    height: 76px;
    left: 390px;
    top: 724px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
`;

const Titulo = styled.div`
    font-family: 'TTSupermolot-Regular';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #292929;
`;

const CustomInputNumber = styled(InputNumber)`
    width: 90px;
    height: 40px;
    background: #FFFFFF;
    border: 2px solid ${({ isvalid }) => (isvalid ? "#414ABA" : "#FF0000")};
    border-radius: 6px;
    padding: 8px 12px;
    input {
        font-family: 'TTSupermolot-Regular';
        font-size: 16px;
        color: #292929;
    }
`;

const InputDadosMetereologicos = () => {
    const [precipitacao, setPrecipitacao] = useState(null);
    const [umidade, setUmidade] = useState(null);
    const [velocidadeVento, setVelocidadeVento] = useState(null);

    const validatePrecipitacao = (value) => {
        return value !== null && value !== undefined && value !== "";
    };

    const validateUmidade = (value) => {
        return value !== null && value !== undefined && value !== "";
    };

    const validateVelocidadeVento = (value) => {
        return value !== null && value !== undefined && value !== "";
    };

    return (
        <Container>
            <InputContainer>
                <Titulo>Precipitação*</Titulo>
                <CustomInputNumber
                    placeholder="Digite aqui"
                    isvalid={validatePrecipitacao(precipitacao) ? 'true' : 'false'}
                    onChange={setPrecipitacao}
                />
            </InputContainer>
            <InputContainer>
                <Titulo>Umidade*</Titulo>
                <CustomInputNumber
                    placeholder="Digite aqui"
                    isvalid={validateUmidade(umidade) ? 'true' : 'false'}
                    onChange={setUmidade}
                />
            </InputContainer>
            <InputContainer>
                <Titulo>Velocidade do vento*</Titulo>
                <CustomInputNumber
                    placeholder="Digite aqui"
                    isvalid={validateVelocidadeVento(velocidadeVento) ? 'true' : 'false'}
                    onChange={setVelocidadeVento}
                />
            </InputContainer>
        </Container>
    );
};

export default InputDadosMetereologicos;