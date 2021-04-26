import React, { ReactElement } from 'react';

import { useStyles } from './styles';

export interface MusicNameProps {
  name: string;
  artistName: string[];
}

export function MusicName(props: MusicNameProps): ReactElement {
  const {
    name,
    artistName,
  } = props;

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <span className={styles.primaryText}>{name}</span>
      {' '}
      {artistName ? (
        <span className={styles.secondaryText}>
          -
          {' '}
          {artistName.join(' , ')}
        </span>
      ) : null}
    </div>
  );
}
