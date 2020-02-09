/// <reference types="cypress" />

describe('Register without ui', function() {
  beforeEach(function() {
    cy.task('clearDB');
  });

  it('registers', function() {
    cy.request('POST', '/api/auth/register', {
      username: 'a',
      password: '1qaz@WSX'
    });

    cy.visit('/');
    cy.getCookie('u').should('exist');
    cy.get('.logged-user').should('contain', 'a');
  });

  it('registers with command', function() {
    cy.registerTestUser();
    cy.visit('/');
    cy.getCookie('u').should('exist');
    cy.get('.logged-user').should('contain', 'a');
  });
});
