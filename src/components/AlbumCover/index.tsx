import React, { ReactElement } from 'react';
import { useStyles } from './styles';

export interface AlbumCoverProps {
  imgURL?: string;
  artistName?: string;
  musicTitle: string;
}

export function AlbumCover(props: AlbumCoverProps): ReactElement {
  const { artistName, imgURL, musicTitle } = props;

  const styles = useStyles({ imgURL });

  const getShortName = (str: string): string => {
    const modifiedString = str.trim().toUpperCase();

    if (modifiedString.length <= 2) return modifiedString;

    if (modifiedString.split(' ').length >= 2) {
      return modifiedString
        .split(' ')
        .slice(0, 2)
        .map((s) => s[0])
        .join('');
    }

    return modifiedString.slice(0, 2);
  };

  return (
    <div className={styles.root}>
      {!imgURL ? (
        <span className={styles.innerText}>
          {typeof artistName === 'undefined'
            ? getShortName(musicTitle)
            : getShortName(artistName)}
        </span>
      ) : null}
    </div>
  );
}
