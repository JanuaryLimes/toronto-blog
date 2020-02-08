/// <reference types="cypress" />

// https://github.com/cypress-io/cypress-example-kitchensink/tree/master/cypress/integration/examples

context('toronto-blog login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5002/login');
  });

  it('test login form', () => {
    cy.get('.username-input')
      .type('a')
      .should('have.value', 'a');

    cy.get('.password-input')
      .type('a')
      .should('have.value', 'a');

    cy.get('button.bg-green-700').click();

    cy.get('header button > span').should('have.text', 'a');
  });
});
