import React, { ReactElement } from 'react';
import { parseBlob } from 'music-metadata-browser';

import { Container } from '@material-ui/core';
import { fileToBase64, uintToBase64Image } from '../../utils';

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
        if (picture?.[0]) console.log(uintToBase64Image(picture[0].format, picture[0].data));
        console.log(artists, title, picture);
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
