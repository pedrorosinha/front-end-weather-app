import React from 'react';
import { mount } from 'cypress/react';
import InputBusca from '../../src/Componentes/InputBusca';

describe('Teste do componente de InputBusca', () => {
  it('Deve renderizar corretamente', () => {
    mount(<InputBusca />);
    cy.get('div').contains('Buscar a cidade'); 
    cy.get('div').contains('Cidade*');
    cy.get('input').should('have.attr', 'placeholder', 'Busque por uma cidade');
  });

  it('Deve atualizar o estado quando o usuário digita', () => {
    const onInputChange = cy.stub().as('onInputChange');
    mount(<InputBusca onInputChange={onInputChange} />);
    cy.get('input').type('São Paulo');
    cy.get('@onInputChange').should('have.been.calledWith', 'São Paulo');
  });

  it('Deve exibir mensagem de erro quando o campo está vazio', () => {
    mount(<InputBusca />);
    cy.get('input').focus().blur(); 
    cy.get('div').contains('Informe a cidade').should('be.visible');
  });
});