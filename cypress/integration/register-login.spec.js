/// <reference types="cypress" />

// https://github.com/cypress-io/cypress-example-kitchensink/tree/master/cypress/integration/examples

context('toronto-blog login', () => {
  beforeEach(() => {
    cy.task('clearDB');
  });

  it('test register and login form', () => {
    cy.visit('http://localhost:5001/register');
    cy.get('.username-input')
      .type('a')
      .should('have.value', 'a');
    cy.get('.password-input').type('1qaz@WSX');
    cy.get('.repeat-password-input').type('1qaz@WSX');
    cy.get('.register-button').click();
    cy.get('.logged-user').should('have.text', 'a');

    cy.visit('http://localhost:5001/login');
    cy.get('.username-input')
      .type('a')
      .should('have.value', 'a');
    cy.get('.password-input').type('1qaz@WSX');
    cy.get('.login-button').click();
    cy.get('.logged-user').should('have.text', 'a');
  });
});
