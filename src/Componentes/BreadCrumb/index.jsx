import styled from "styled-components";

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
  opacity: 0;
`;

const Inicial = styled.div`
  width: 50px;
  height: 20px;
  gap: 0;
  opacity: 0;
  font-family: 'TTSupermolot-Bold';
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-align: center;
`;

const SimboloMaior = styled.div`
  width: 7.41px;
  height: 12px;
  top: 6px;
  left: 8.59px;
  gap: 0;
  opacity: 0;
`;

const SimboloMaiorContainer = styled.div`
  width: 24px;
  height: 24px;
  padding: 6px 8px;
  gap: 0;
  opacity: 0;
`;

const Breadcrumb = () => {
    return (
        <BreadcrumbContainer>
            <BreadcrumbItem>
                <Inicial>Inicial</Inicial>
            </BreadcrumbItem>
            <SimboloMaiorContainer>
                <SimboloMaior>
                    Teste
                </SimboloMaior>
            </SimboloMaiorContainer>
            <BreadcrumbItem>
                <span>Cadastro de dados meteorológicos</span>
            </BreadcrumbItem>
        </BreadcrumbContainer>
    )
}

export default Breadcrumb;