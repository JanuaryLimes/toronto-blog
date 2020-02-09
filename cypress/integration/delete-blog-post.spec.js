/// <reference types="cypress" />

describe('Delete blog post', function() {
  beforeEach(function() {
    cy.registerTestUser();
    cy.request('POST', '/api/secure/dashboard/create-new-blog-post', {
      title: 'blog post 1',
      content: 'blog content 1',
      blogName: 'a'
    });
    cy.request('POST', '/api/secure/dashboard/create-new-blog-post', {
      title: 'blog post 2',
      content: 'blog content 2',
      blogName: 'a'
    });
  });

  it('delete blog post', function() {
    cy.visit('/blog/a');
    cy.get('.BlogPage > ul > li').should('have.length', 2);

    cy.on('window:confirm', () => {
      return true;
    });
    cy.get('button > svg')
      .first()
      .click();
    cy.get('.BlogPage > ul > li').should('have.length', 1);
  });
});
