import React, { ReactElement } from 'react';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { saveMusic, useMusicStorage } from '@open-music-player/core';

import { useStyles } from './styles';

export function UploadNewMusic(): ReactElement {
  const db = useMusicStorage();
  const styles = useStyles();

  const handleFileSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const files: File[] = Array.from(
      (e.target as HTMLInputElement).files ?? [],
    );
    return saveMusic(db, files);
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        onChange={handleFileSelected}
        type="file"
        accept="audio/*"
        id="upload-file"
      />
      <label htmlFor="upload-file">
        {' '}
        <IconButton
          className={styles.addBtn}
          id="upload-file-button"
          component="span"
          color="primary"
          aria-label="upload music"
        >
          <Add fontSize="small" />
        </IconButton>
      </label>
    </>
  );
}
