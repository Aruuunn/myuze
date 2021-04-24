import React, { ReactElement } from 'react';
import { useStyles } from './styles';

export interface AlbumCoverProps {
  imgURL?: string;
  artistName?: string;
}

export function AlbumCover(props: AlbumCoverProps): ReactElement {
  const {
    artistName, imgURL,
  } = props;

  const styles = useStyles({ imgURL });

  return (
    <div className={styles.root}>
      {artistName ? <span className={styles.innerText}>{artistName}</span> : null}
    </div>
  );
}
