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

  const getArtistShortName = (): string => {
    if (typeof artistName !== 'string') return '';

    const modifiedArtistName = artistName.trim().toUpperCase();

    if (modifiedArtistName.length <= 2) return modifiedArtistName;

    if (modifiedArtistName.split(' ').length >= 2) return modifiedArtistName.split(' ').slice(0, 2).map((s) => s[0]).join('');

    return modifiedArtistName.slice(0, 2);
  };

  return (
    <div className={styles.root}>
      {artistName && !imgURL
        ? <span className={styles.innerText}>{getArtistShortName()}</span>
        : null}
    </div>
  );
}
