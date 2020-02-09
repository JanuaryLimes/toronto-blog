/// <reference types="cypress" />

describe('Blog post page - test delete, edit', function() {
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

  // TODO confirm false
  // TODO delete error

  it('edit blog post', function() {
    cy.visit('/blog/a');
    cy.get('.BlogPage > ul > li').should('have.length', 2);
    cy.contains('blog post 1').click();
    cy.get('button[title="Edit post"]').click();
    cy.get('input')
      .first()
      .type(' edited');
    cy.server();
    cy.route('PUT', '/api/public/blog-post/id/*').as('update');
    cy.get('button[title="Save changes"]').click();
    cy.wait('@update');
    cy.get('.blog-post-page-element button span').click();
    cy.contains('blog post 1 edited').should('exist');
  });
});
