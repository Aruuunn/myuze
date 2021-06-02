/// <reference types="cypress" />

const butterSongFileName = "BTS - Butter.mp3";

const musicFiles = [
  { fileName: "BTS - Butter.mp3" },
  { fileName: "BLACKPINK - Pretty Savage.mp3" },
  { fileName: "BTS - Spring Day.mp3" },
  { fileName: "The Weeknd - Star Boy (ft. Daft Punk).mp3" },
  {
    fileName: "The Weeknd - Can't Feel My Face.mp3",
    musicTitle: "Can't Feel My Face",
    artistName: "The Weeknd",
  },
];

context("Add Music File", async () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Label should exist to add audio file", () => {
    cy.get("label[for='upload-file'] > #upload-file-button").should("exist");
  });

  Cypress._.times(musicFiles.length, (musicFileIdx) => {
    it(`Should add audio file - ${musicFiles[musicFileIdx].fileName}`, () => {
      const musicFile = musicFiles[musicFileIdx];
      cy.get("input#upload-file")
        .attachFile(musicFile.fileName)
        .wait(1000)

        .then(() => {
          cy.get('[data-testid="music-list-item"][data-loading="false"]')
            .first()
            .should("contain.text", musicFile.musicTitle ?? musicFile.fileName)
            .should("contain.text", musicFile.artistName ?? "");
        });
    });
  });

});
