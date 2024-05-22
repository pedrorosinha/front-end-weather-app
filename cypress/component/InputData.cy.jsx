/// <reference types="cypress" />

import React from "react";
import { mount } from "cypress/react";
import InputData from "../../src/Componentes/InputData";

describe('Teste do componente de InputData', () => {
  it('Deve renderizar o DatePicker com o placeholder correto', () => {
    mount(<InputData onInputChange={cy.stub()} />);
    cy.get('.ant-picker-input input').should('have.attr', 'placeholder', 'Selecione a data');
  });

  it('Deve chamar a função onInputChange ao selecionar uma data', () => {
    const onInputChangeSpy = cy.spy().as('onInputChangeSpy');
    mount(<InputData onInputChange={onInputChangeSpy} />);
    cy.get('.ant-picker-input input').click();
    cy.get('.ant-picker-cell-inner').first().click();
    cy.get('@onInputChangeSpy').should('have.been.called');
  });

  it('Deve mostrar uma mensagem de erro se a data não for selecionada', () => {
    mount(<InputData onInputChange={cy.stub()} />);
    cy.get('.ant-picker-input input').focus().blur();
    cy.contains('Selecione uma data.').should('be.visible');
  });
});
