import React, { ReactElement, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { OnMusicUpload } from '../../common';
import { MusicStorageContext } from '../../providers';

export function UploadNewMusic(): ReactElement {
  const db = useContext(MusicStorageContext);

  const handleFileSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const files: File[] = Array.from(
      (e.target as HTMLInputElement).files ?? [],
    );
    return OnMusicUpload(db, files);
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        onChange={handleFileSelected}
        type="file"
        id="upload-file"
      />
      <label htmlFor="upload-file">
        {' '}
        <IconButton component="span" color="primary" aria-label="upload music">
          <Add style={{ fill: 'rgb(var(--primary-dark))' }} />
        </IconButton>
      </label>
    </>
  );
}
