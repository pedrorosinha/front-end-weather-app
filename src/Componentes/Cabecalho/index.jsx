import React from "react";
import styled from "styled-components";
import LogpDb from './imagem/logo-db.png';

const CabecalhoEstilizado = styled.header`
    width: 100%;
    height: 70px;
    background-color: #414ABA;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 1000;
`

const Logo = styled.img`
    width: 76px;
    height: 34px;
    margin-left: 120px;
`

const Cabecalho = () => {
    return (
        <CabecalhoEstilizado>
            <Logo src={LogpDb} />
        </CabecalhoEstilizado>
    )
}

export default Cabecalho;