import React, { useState } from 'react';
import { InputNumber } from 'antd';
import styled from 'styled-components';

const StyledInputNumber = styled(InputNumber)`
    width: 90px;
    height: 40px;

    .ant-input-number-input {
        padding: 8px 12px;
        font-family: 'TTSupermolot-Regular';
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        text-align: center;
        border: 2px solid #414ABA;
        border-radius: 6px;
        background-color: #FFFFFF;
    }

    &:not(:focus) {
        border-color: #414ABA;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    position: absolute;
    width: 329px;
    left: 120px;
    top: 462px;
`;

const Titulo = styled.div`
    width: 329px;
    height: 39px;
    font-family: 'TTSupermolot-Regular';
    font-size: 32px;
    font-weight: 400;
    line-height: 39px;
    color: #292929;
`;

const Subtitulo = styled.div`
    width: 71px;
    height: 22px;
    font-family: 'TTSupermolot-Regular';
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    color: #292929;
`;

const InputsRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 40px;
    width: 100%;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`;

const InputTemperatura = ({ onInputChange }) => {
    const [temperaturaMinima, setTemperaturaMinima] = useState(null);
    const [temperaturaMaxima, setTemperaturaMaxima] = useState(null);

    const handleMinimaChange = (value) => {
        setTemperaturaMinima(value);
        onInputChange({ temperaturaMinima: value, temperaturaMaxima });
    };

    const handleMaximaChange = (value) => {
        setTemperaturaMaxima(value);
        onInputChange({ temperaturaMinima, temperaturaMaxima: value });
    };

    return (
        <InputContainer>
            <Titulo>Informe a temperatura</Titulo>
            <InputsRow>
                <InputBox>
                    <Subtitulo>Mínima*</Subtitulo>
                    <StyledInputNumber
                        size='large'
                        placeholder='Mín'
                        value={temperaturaMinima}
                        onChange={handleMinimaChange}
                    />
                </InputBox>
                <InputBox>
                    <Subtitulo>Máxima*</Subtitulo>
                    <StyledInputNumber
                        size='large'
                        placeholder='Máx'
                        value={temperaturaMaxima}
                        onChange={handleMaximaChange}
                    />
                </InputBox>
            </InputsRow>
        </InputContainer>
    );
};

export default InputTemperatura;