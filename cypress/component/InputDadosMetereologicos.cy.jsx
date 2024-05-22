/// <reference types="cypress" />

import React from "react";
import { mount } from "cypress/react";
import InputDadosMetereologicos from "../../src/Componentes/InputDadosMetereologicos";

describe('Teste do componente de InputDadosMetereologicos', () => {
  it('Deve renderizar os campos de entrada com os placeholders corretos', () => {
    mount(<InputDadosMetereologicos />);

    cy.get('[data-testid="input-precipitacao"]').should('have.attr', 'placeholder', 'Digite aqui');
    cy.get('[data-testid="input-umidade"]').should('have.attr', 'placeholder', 'Digite aqui');
    cy.get('[data-testid="input-velocidade-vento"]').should('have.attr', 'placeholder', 'Digite aqui');
  });

  it('Deve chamar a função onInputChange ao alterar os valores dos campos de entrada', () => {
    const onInputChangeSpy = cy.spy().as('onInputChangeSpy');
    mount(<InputDadosMetereologicos onInputChange={onInputChangeSpy} />);

    cy.get('[data-testid="input-precipitacao"]').type('10');
    cy.get('@onInputChangeSpy').should('have.been.called');
  });
});