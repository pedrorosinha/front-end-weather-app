import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 43px;
  margin-left: ${({ marginleft }) => marginleft || '0px'};
  width: 565px;
  height: 44px;
  top: 174px;
  left: 120px;
`;

const Texto = styled.span`
  font-family: 'TTSupermolot-Bold';
  font-weight: 400;
  font-size: 36px;
  line-height: 44.46px;
  color: #292929;
`;

const Titulo = ({ texto = "Cadastro de Dados Meteorológicos", marginleft = "121px" }) => {
  return (
    <Container marginleft={marginleft}>
      <Texto>{texto}</Texto>
    </Container>
  );
};

export default Titulo;
