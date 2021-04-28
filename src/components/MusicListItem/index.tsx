import React, {
  CSSProperties,
  ReactElement, useContext, useEffect, useState,
} from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { MusicStorageContext } from '../../core/providers';
import { MusicDataInterface } from '../../core/interfaces';
import { useStyles } from './styles';

export interface MusicListItemProps {
  index: number;
  style?: CSSProperties;
}

export function MusicListItem(props: MusicListItemProps): ReactElement {
  const {
    index,
    style = {},
  } = props;

  const history = useHistory();
  const db = useContext(MusicStorageContext);
  const [musicData, setMusicData] = useState<Pick<
  MusicDataInterface,
  'title' | 'artists' | 'id'
  > | null>(null);

  useEffect(() => {
    db.getMusicAt(index).then((data) => {
      if (data) setMusicData({ artists: data.artists, title: data.title, id: data.id });
    });
  }, [db, index]);

  const styles = useStyles();

  return (
    <div className={styles.root} key={index} style={style}>
      <Paper
        className={styles.card}
        onClick={() => {
          if (!musicData) return;
          history.push(`/play/${musicData.id}`);
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={12}>
            {musicData ? musicData.title : ''}
          </Grid>
          <Grid className={styles.artists} xs={12} item>
            {musicData?.artists?.length ? musicData.artists.join(' , ') : 'unknown' }
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
