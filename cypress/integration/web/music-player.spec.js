/// <reference types="cypress" />
import { musicFiles } from '../../musicfiles';

let audios = [];
let once = false;

context('Music Player Controls', () => {
  before(() => {
    cy.visit('http://localhost:3000').then(() => {
      cy.clearIndexedDB();
    });
  });

  beforeEach(() => {
    audios = [];
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        const originalAudio = win.Audio;
        cy.stub(win, 'Audio').callsFake(() => {
          const aud = new originalAudio();
          audios.push(aud);
          return aud;
        });
      },
    });

    if (!once) {
      once = true;
      cy.get('input#upload-file')
        .as('file-upload')
        .attachFile(musicFiles[0].fileName)
        .then(() => {
          cy.get('@file-upload').attachFile(musicFiles[1].fileName);
        });
    }
  });

  it('should start playing music', () => {
    cy.get('[data-testid="music-list-item"][data-loading="false"]')
      .first()
      .click()
      .then(() => {
        cy.location('pathname').should('contain', '/play/');
        cy.waitUntil(() => audios[0]?.paused === false).then(() => {
          cy.get('[data-testid="play-button"]')
            .as('play-button')
            .click()
            .then(() => {
              cy.waitUntil(() => audios[0]?.paused === true);
            });
        });
      });
  });
});
