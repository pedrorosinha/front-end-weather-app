import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 43px;
    margin-left: 124px;
    width: 565px;
    height: 44px;
    top: 174px;
    left: 120px;
`

const Texto = styled.span`
    font-family: 'TTSupermolot-Bold';
    font-weight: 400;
    font-size: 36px;
    line-height: 44.46px;

    color: #292929;
`

const CadastroMeteorologico = () => {
    return (
        <Container>
            <Texto>Cadastro de Dados Meteorológicos</Texto>
        </Container>
    )
}

export default CadastroMeteorologico;