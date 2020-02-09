/// <reference types="cypress" />

describe('Add blog post', function() {
  beforeEach(function() {
    cy.registerTestUser();
  });

  it('add blog post', function() {
    cy.visit('/dashboard');
    cy.get('input').type('Default title');
    cy.get('textarea').type(`## **my blog post content**


second paragraph`);
    cy.contains('button', 'Add post').click();
    cy.contains('button', 'Go to your blog').click();

    cy.get('.BlogPostTemplate').should('have.length', 1);

    cy.visit('/dashboard');
    cy.get('input').type('Default title 2');
    cy.get('textarea').type(`## **my blog post content2**


second paragraph`);
    cy.contains('button', 'Add post').click();
    cy.contains('button', 'Go to your blog').click();

    cy.get('.BlogPostTemplate').should('have.length', 2);
  });
});
