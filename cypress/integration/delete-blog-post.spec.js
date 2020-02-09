/// <reference types="cypress" />

describe('Delete blog post', function() {
  beforeEach(function() {
    cy.registerTestUser();
  });

  it('delete blog post', function() {
    cy.server();
    cy.route('**/api/public/blogs/a', 'fixture:blog-a.json');
    cy.visit('/blog/a');
    cy.get('.BlogPage > ul > li').should('have.length', 1);

    cy.route('**/api/public/blogs/a', '{"user":"a","userBlogPosts":[]}');
    cy.route('DELETE', '**/api/public/blog-post/id/*', '{}');
    cy.on('window:confirm', () => {
      return true;
    });
    cy.get('button > svg').click();
    cy.get('.BlogPage > ul').should('be.empty');
  });
});
