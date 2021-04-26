import React, { ReactElement } from 'react';
import { parseBlob } from 'music-metadata-browser';
import { Container } from '@material-ui/core';

import { fileToBase64, uintToBase64Image } from '../../utils';
import { MusicStorage } from '../../core/services';

const db = new MusicStorage();

(window as any).db = db;

export function HomePage(): ReactElement {
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files: File[] = Array.from((e.target as HTMLInputElement).files ?? []);

    if (files[0]) {
      parseBlob(files[0]).then((metaData) => {
        const {
          common: {
            artists, title, picture,
          },
        } = metaData;

        console.log(metaData);

        let pictureBase64: string | undefined;
        if (picture?.[0]) {
          pictureBase64 = (uintToBase64Image(picture[0].format, picture[0].data));
        }
        db.addNewMusic({
          artists: artists || ['unknown'],
          imgURL: pictureBase64,
          title: title ?? files[0].name,
        });
      });
    }

    Promise.all(files.map((file) => (fileToBase64(file)))).then(console.log);
  };

  return (
    <>
      <Container maxWidth="lg">
        <form onSubmit={(e) => { e.preventDefault(); console.log('hey'); }}>
          <input onChange={handleFileSelected} type="file" />
          <button type="submit">
            save
          </button>
        </form>
      </Container>
    </>
  );
}
