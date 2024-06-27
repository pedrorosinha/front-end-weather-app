describe('Cadastro de Cidade', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve cadastrar uma cidade com sucesso', () => {

    cy.get('input[data-testid="input-busca"]').type('Pelotas');
    
    cy.get('input[data-testid="input-data"]').type('25/06/2024');
    
    cy.get('input[data-testid="input-temperatura-min"]')
        .click({force: true})
        .clear({force: true})
        .type('18');
    
    cy.get('input[data-testid="input-temperatura-max"]')
      .click({force: true})
      .clear({force: true})
      .type('30');
  
    cy.get('button[data-testid="button-manha"]').click();
    
    cy.get('.ant-select-selector').click();

    cy.contains('.ant-select-item-option-content', 'Ensolarado').click();
    
    cy.get('input[data-testid="input-precipitacao"]').type('5');
    cy.get('input[data-testid="input-umidade"]').type('60');
    cy.get('input[data-testid="input-velocidade-vento"]').type('10');

     cy.get('button[data-testid="botao-salvar"]').click();
  });
});