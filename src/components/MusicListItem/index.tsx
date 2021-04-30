import React, {
  CSSProperties,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Grid, Paper } from '@material-ui/core';

import {
  CurrentMusicDetailsContext,
  MusicStorageContext,
} from '../../providers';
import { MusicDataInterface } from '../../interfaces';
import { useStyles } from './styles';

export interface MusicListItemProps {
  itemKey: string;
  index: number;
  style?: CSSProperties;
  onSelectItem?: (id: string | null) => void;
}

export function MusicListItem(props: MusicListItemProps): ReactElement {
  const {
    index, itemKey, style = {}, onSelectItem,
  } = props;

  const db = useContext(MusicStorageContext);
  const currentMusicState = useContext(CurrentMusicDetailsContext)?.[0];
  const [musicData, setMusicData] = useState<Pick<
  MusicDataInterface,
  'title' | 'artists' | 'id'
  > | null>(null);
  const [isCurrentPlayingMusic, setIsCurrentPlayingMusic] = useState(false);

  useEffect(() => {
    db.getMusicAt(index).then((data) => {
      if (data) {
        setMusicData({ artists: data.artists, title: data.title, id: data.id });
        if (currentMusicState) {
          if (data.id === currentMusicState?.id) {
            setIsCurrentPlayingMusic(true);
          }
        }
      }
    });
  }, [db, index, currentMusicState]);

  const styles = useStyles({ isCurrentPlayingMusic });

  return (
    <div className={styles.root} key={itemKey} style={style}>
      <Paper
        className={styles.card}
        onClick={() => {
          if (typeof onSelectItem === 'function') onSelectItem(musicData?.id ?? null);
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={12}>
            {musicData ? musicData.title : ''}
          </Grid>
          <Grid className={styles.artists} xs={12} item>
            {musicData?.artists?.length
              ? musicData.artists.join(' , ')
              : 'unknown'}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
