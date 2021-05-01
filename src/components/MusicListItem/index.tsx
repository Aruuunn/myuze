import React, {
  CSSProperties,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Grid, Paper } from '@material-ui/core';

import { MusicDataInterface } from '../../interfaces';
import { useStyles } from './styles';
import { useMusicPlayerMachine, useMusicStorage } from '../../hooks';

export interface MusicListItemProps {
  index: number;
  itemKey: string;
  style?: CSSProperties;
  onSelectItem?: (id: string | null) => void;
}

export function MusicListItem(props: MusicListItemProps): ReactElement {
  const {
    index, itemKey, style = {}, onSelectItem,
  } = props;

  const db = useMusicStorage();
  const [{
    context: {
      currentPlayingMusic,
    },
  }] = useMusicPlayerMachine();
  const [musicData, setMusicData] = useState<Pick<
  MusicDataInterface,
  'title' | 'artists' | 'id'
  > | null>(null);
  const [isCurrentPlayingMusic, setIsCurrentPlayingMusic] = useState(false);

  useEffect(() => {
    const componentOnMount = () => db.getMusicAt(index).then((data) => {
      if (data) {
        setMusicData({ artists: data.artists, title: data.title, id: data.id });
        if (currentPlayingMusic) {
          if (data.id === currentPlayingMusic?.id) {
            setIsCurrentPlayingMusic(true);
          }
        }
      }
    });

    componentOnMount();

    db.onChange(() => {
      console.log(`remounting..${index}`);
      componentOnMount();
    });
  }, [db, index, currentPlayingMusic]);

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
