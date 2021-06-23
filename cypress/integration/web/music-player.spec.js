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
      let fileUpload = cy.get('input#upload-file').as('file-upload');

      musicFiles.forEach((musicFile) => {
          fileUpload = fileUpload.then(() => {
              fileUpload
             .attachFile(musicFile.fileName);
          });
      });
    }
    cy.get('[data-testid="music-list-item"][data-loading="false"]').as('music-items');
  });

  it('should start playing music and should be able to pause the music', () => {
    cy.get('@music-items')
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

    it('Should be able to go to next songs by pressing next', () => {
      cy.window().then(win => {
         cy.get('@music-items')
        .first()
        .click()
         .waitUntil(() => win.location.pathname!=='/')
          .then(() => {
           const pathname = win.location.pathname;
            cy.get('[data-testid="play-next-button"]')
              .click()
              .waitUntil(() => win.location.pathname !== pathname, {timeout: 5000})
              .then(() => {
                cy.location('pathname').should('contain','/play/')
              })
          })
       })
    })
});
