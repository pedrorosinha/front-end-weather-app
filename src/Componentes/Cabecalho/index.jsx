import styled from "styled-components";

const CabecalhoEstilizado = styled.header`
    position: fixed;
    width: 100%;
    height: 70px;
    top: 0px;
    background-color: #414ABA;
    z-index: 1000;
`
const Logo = styled.img`
    position: absolute;
    width: 76px;
    height: 34px;
    margin-left: 120px;
    margin-top: 18px;
`

const Cabecalho = () => {
    return (
        <CabecalhoEstilizado>
            <Logo src="public/Icones/logo-db.png" alt="Logo DB" />
        </CabecalhoEstilizado>
    )
}

export default Cabecalho;