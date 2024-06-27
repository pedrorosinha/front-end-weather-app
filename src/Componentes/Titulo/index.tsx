import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  marginleft?: string;
}

const Container = styled.div<ContainerProps>`
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

interface TituloProps {
  texto?: string;
  marginLeft?: string;
}

const Titulo: React.FC<TituloProps> = ({ texto = 'Cadastro de Dados Meteorológicos', marginLeft = '121px' }) => {
  return (
    <Container marginleft={marginLeft}>
      <Texto>{texto}</Texto>
    </Container>
  );
};

export default Titulo;