/// <reference types="cypress" />

const musicFiles = [
  { fileName: 'BTS - Butter.mp3' },
  { fileName: 'BLACKPINK - Pretty Savage.mp3' },
  { fileName: 'BTS - Spring Day.mp3' },
  { fileName: 'The Weeknd - Star Boy (ft. Daft Punk).mp3' },
  {
    fileName: "The Weeknd - Can't Feel My Face.mp3",
    musicTitle: "Can't Feel My Face",
    artistName: 'The Weeknd',
  },
];

let audios = [];

context('Add Music File', async () => {
  beforeEach(() => {
    audios = [];
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        const originalAudio = win.Audio;
        cy.stub(win, 'Audio').callsFake(() => {
          const aud = new originalAudio();
          audios.push(aud);
          console.log("audio fakes");
          return aud;
        });
      },
    });
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

  it('should start playing music', () => {
    cy.get('[data-testid="music-list-item"][data-loading="false"]')
      .first()
      .click()
      .then(() => {
        cy.location('pathname').should('contain',  '/play/');
        cy.waitUntil(() => audios[0]?.paused===false).then(() => {
          cy.get('[data-testid="play-button"]').as('play-button').click().then(() => {
            cy.waitUntil(() => audios[0]?.paused === true);
          })
        });
      });
  });
});
