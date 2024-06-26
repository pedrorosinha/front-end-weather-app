import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoDb from './imagem/logo-db.png';

const CabecalhoEstilizado = styled.header`
    width: 100%;
    height: 70px;
    background-color: #414ABA;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 1000;
`;

const Nav = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff;
    text-decoration: none;

    a {
        color: #fff;
        margin-right: 20px;
        text-decoration: none;
    }
`;

const Logo = styled.img`
    width: 76px;
    height: 34px;
    margin-left: 120px;
`;

const Cabecalho: React.FC = () => {
    return (
        <CabecalhoEstilizado>
            <Logo src={LogoDb} alt="Logo" />
            <Nav>
                <Link to="/">Tela Cadastro</Link>
                <Link to="/listar">Tela de Listar</Link>
            </Nav>
        </CabecalhoEstilizado>
    );
}

export default Cabecalho;