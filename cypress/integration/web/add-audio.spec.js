/// <reference types="cypress" />
import { musicFiles } from '../../musicfiles';

context('Add Music File', async () => {
  before(() => {
    cy.visit('http://localhost:3000').then(() => {
      cy.clearIndexedDB();
    });
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Label should exist to add audio file', () => {
    cy.get("label[for='upload-file'] > #upload-file-button").should('exist');
  });

  Cypress._.times(musicFiles.length, (musicFileIdx) => {
    it(`Should add audio file - ${musicFiles[musicFileIdx].fileName}`, () => {
      const musicFile = musicFiles[musicFileIdx];
      cy.get('input#upload-file')
        .attachFile(musicFile.fileName)
        .wait(1000)
        .then(() => {
          cy.get('[data-testid="music-list-item"][data-loading="false"]')
            .first()
            .should('contain.text', musicFile.musicTitle ?? musicFile.fileName)
            .should('contain.text', musicFile.artistName ?? '');
        });
    });
  });
});
