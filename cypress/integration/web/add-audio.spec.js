/// <reference types="cypress" />

const butterSongFileName = 'BTS - Butter.mp3'

context("Add Music File", async () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Label should exist to add audio file", () => {
    cy.get("label[for='upload-file'] > #upload-file-button").should('exist');
  });

  it("Should add files", () => {
      cy.get('input#upload-file').attachFile(butterSongFileName);
      cy.get('[data-testid="music-list-item"]').first().should('contain.text', butterSongFileName);
  })

});
