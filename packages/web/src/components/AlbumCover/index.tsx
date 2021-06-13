import React, { CSSProperties, ReactElement } from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useStyles } from './styles';

export interface AlbumCoverProps {
  imgURL?: string;
  artistName?: string;
  musicTitle: string;
  className?: string;
  style?: CSSProperties;
}

export function AlbumCover(props: AlbumCoverProps): ReactElement {
  const { artistName, imgURL, musicTitle, className = '', style = {} } = props;

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = useStyles({ imgURL, sm });

  const getShortName = (str: string): string => {
    const modifiedString = str
      .replace(/[\W_]+/g, ' ')
      .trim()
      .toUpperCase();

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
    <div
      style={style}
      className={`${styles.root} ${className}`}
      data-testid="album-cover">
      {!imgURL ? (
        <span className={styles.innerText}>
          {getShortName(
            typeof artistName === 'undefined' ? musicTitle : artistName,
          )}
        </span>
      ) : null}
    </div>
  );
}
