import React, {
  CSSProperties,
  ReactElement, useContext, useEffect, useState,
} from 'react';
import { Grid, Paper } from '@material-ui/core';
import { MusicStorageContext } from '../../core/providers';
import { MusicDataInterface } from '../../core/interfaces';
import { useStyles } from './styles';

export interface MusicListItemProps {
  key: string;
  index: number;
  style?: CSSProperties;
}

export function MusicListItem(props: MusicListItemProps): ReactElement {
  const {
    index,
    key,
    style = {},
  } = props;

  const db = useContext(MusicStorageContext);
  const [musicData, setMusicData] = useState<Pick<MusicDataInterface, 'title' | 'artists'> | null>(null);

  useEffect(() => {
    db.getMusicAt(index).then((data) => {
      if (data) setMusicData({ artists: data.artists, title: data.title });
    });
  }, []);

  const styles = useStyles();

  return (
    <div className={styles.root} key={key} style={style}>
      <Paper className={styles.card}>
        <Grid container alignItems="center">
          <Grid item xs={12} alignItems="center">
            {musicData ? musicData.title : ''}
          </Grid>
          <Grid className={styles.artists} xs={12} item alignItems="center">
            {(musicData?.artists || []).join(' , ')}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
