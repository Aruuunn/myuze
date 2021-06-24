/// <reference types="cypress" />
import { musicFiles } from '../../musicfiles';

let audios = [];
let once = false;
const MUSIC_ITEM_SELECTOR =
  '[data-testid="music-list-item"][data-loading="false"]';

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
          fileUpload.attachFile(musicFile.fileName);
        });
      });
    }
    cy.get('[data-testid="music-list-item"][data-loading="false"]').as(
      'music-items',
    );
  });

  it('should start playing music and should be able to pause the music', () => {
    cy.get('@music-items')
      .first()
      .as('first-el')
      .invoke('attr', 'data-music-id')
      .then((musicId) => {
        cy.get('@first-el')
          .click()
          .then(() => {
            cy.location('pathname').should('eq', `/play/${musicId}`);
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

  it('Should be able to go to next songs by pressing next and go to previous song by pressing prev button', () => {
    cy.window().then((win) => {
      cy.waitUntil(
        () => win.document.querySelectorAll(MUSIC_ITEM_SELECTOR).length > 2,
      ).then(() => {
        cy.get(MUSIC_ITEM_SELECTOR)
          .eq(1)
          .invoke('attr', 'data-music-id')
          .then((secondMusicId) => {
            cy.get('@music-items')
              .first()
              .as('first-el')
              .invoke('attr', 'data-music-id')
              .then((musicId) => {
                cy.get('@first-el')
                  .click()
                  .waitUntil(() => win.location.pathname === `/play/${musicId}`)
                  .then(() => {
                    let pathname = win.location.pathname;
                    cy.get('[data-testid="play-next-button"]')
                      .click()
                      .waitUntil(() => win.location.pathname !== pathname)
                      .then(() => {
                        pathname = `/play/${secondMusicId}`;
                        cy.location('pathname').should('eq', pathname);
                        cy.get('[data-testid="play-prev-button"]')
                          .click()
                          .waitUntil(() => win.location.pathname !== pathname)
                          .then(() => {
                            cy.location('pathname').should(
                              'eq',
                              `/play/${musicId}`,
                            );
                          });
                      });
                  });
              });
          });
      });
    });
  });
});
