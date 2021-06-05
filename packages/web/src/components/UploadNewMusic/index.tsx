import React, { ReactElement } from 'react';
import { saveMusic, useMusicStorage } from '@open-music-player/core';

import { AddButton } from '../AddButton';

export function UploadNewMusic(): ReactElement {
  const db = useMusicStorage();

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
        <AddButton id="upload-file-button" aria-label="upload music" />
      </label>
    </>
  );
}
