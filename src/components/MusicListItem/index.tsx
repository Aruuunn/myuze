import React, {
  CSSProperties,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { MusicDataInterface } from '../../interfaces';
import { useStyles } from './styles';
import { useMusicPlayerMachine, useMusicStorage } from '../../hooks';

export interface MusicListItemProps {
  index: number;
  itemKey: string;
  style?: CSSProperties;
  onSelectItem?: (data: { id: string, index: number } | null) => void;
  height: number;
  width: number;
}

export function MusicListItem(props: MusicListItemProps): ReactElement {
  const {
    index, style = {}, onSelectItem,
    height, width,
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

  useEffect(() => {
    const componentOnMount = () => {
      db.getMusicAt(index).then((data) => {
        if (data) {
          setMusicData(data);
        }
      });
    };

    componentOnMount();

    db.onChange(() => {
      componentOnMount();
    });
  }, [db, index, currentPlayingMusic]);

  const styles = useStyles(
    {
      isCurrentPlayingMusic: (!!currentPlayingMusic && musicData?.id === currentPlayingMusic?.id),
      height,
      width,
    },
  );

  return (
    <div className={styles.root} key={index} style={style}>
      {/* eslint-disable jsx-a11y/tabindex-no-positive */}
      <Paper
        tabIndex={1}
        className={styles.card}
        onClick={() => {
          if (typeof onSelectItem === 'function') onSelectItem(musicData?.id ? ({ id: musicData.id, index }) : null);
        }}
      >
        <Grid container alignItems="center">
          <Grid
            item
            xs={12}
            style={{
              whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
            }}
          >
            {(musicData) ? musicData.title : <Skeleton />}
          </Grid>
          <Grid className={styles.artists} item xs={12}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {(musicData) ? musicData?.artists?.length
              ? musicData.artists.join(' , ')
              : 'unknown' : <Skeleton style={{ width: '60%' }} /> }
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
