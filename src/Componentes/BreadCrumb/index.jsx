import styled from "styled-components";

import setaMaior from './imagem/seta-maior.png';

const BreadcrumbContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 4px;
  position: absolute;
  width: 372px;
  height: 24px;
  left: 120px;
  top: 110px;
`;

const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const Inicial = styled.div`
  width: 50px;
  height: 20px;
  gap: 0;
  font-family: 'TTSupermolot-Bold';
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-align: center;
  color: #141ABA;
`;

const SimboloMaiorImage = styled.img`
  width: 7.41px;
  height: 12px;
  top: 6px;
  left: 8.59px;
  gap: 0px;
`;

const SimboloMaiorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  position: relative;
  margin-left: 4px;
  margin-right: 4px;
`;

const Cadastro = styled.span`
  width: 290px;
  height: 20px;
  font-family: 'TTSupermolot-Regular';
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.02em;
  color: #141ABA;
`;

const Breadcrumb = () => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbItem>
        <Inicial>Inicial</Inicial>
      </BreadcrumbItem>
      <SimboloMaiorContainer>
        <SimboloMaiorImage src={setaMaior} />
      </SimboloMaiorContainer>
      <BreadcrumbItem>
        <Cadastro>Cadastro de dados meteorológicos</Cadastro>
      </BreadcrumbItem>
    </BreadcrumbContainer>
  )
}

export default Breadcrumb;