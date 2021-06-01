import React, {
  CSSProperties,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useMusicPlayerMachine, useMusicStorage, isTruthy } from '@open-music-player/core';
import { MusicDataInterface } from '../../../../core/src/interfaces';
import { useStyles } from './styles';

type MusicDetails = Pick<MusicDataInterface, 'title' | 'artists' | 'id'> | null;

export interface MusicListItemProps {
  index: number;
  itemKey: string;
  height: number;
  width: number;
  style?: CSSProperties;
  onSelectItem?: (data: { id: string, index: number } | null) => void;
}

export function MusicListItem(props: MusicListItemProps): ReactElement {
  const {
    index, style = {}, onSelectItem,
    height, width,
  } = props;

  const db = useMusicStorage();
  const [current] = useMusicPlayerMachine();
  const [musicDetails, setMusicDetails] = useState<MusicDetails>(null);
  const { currentPlayingMusic } = current.context;
  const { artists } = musicDetails ?? {};

  const loading = !isTruthy(musicDetails);
  let artistsName = isTruthy(artists) ? artists.join(' , ') : '';

  if (artistsName.length === 0) {
    artistsName = 'unknown';
  }

  useEffect(() => {
    const componentOnMount = async () => {
      const fetchedMusicDetails = await db.getMusicAt(index);
      if (isTruthy(fetchedMusicDetails)) {
        setMusicDetails(fetchedMusicDetails);
      }
    };

    componentOnMount();

    db.onChange(() => {
      componentOnMount();
    });
  }, [db, index]);

  const styles = useStyles(
    {
      isCurrentPlayingMusic: (!!currentPlayingMusic
          && musicDetails?.id === currentPlayingMusic?.id),
      height,
      width,
    },
  );

  return (
    <div className={styles.root} key={index} style={style}>
      {/* eslint-disable jsx-a11y/tabindex-no-positive */}
      <Paper
        tabIndex={1}
        data-testid="music-list-item"
        className={styles.card}
        onClick={() => {
          if (typeof onSelectItem === 'function') {
            if (isTruthy(musicDetails)) {
              onSelectItem({ id: musicDetails.id, index });
            }
          }
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
            {!loading ? musicDetails?.title : <Skeleton />}
          </Grid>
          <Grid className={styles.artists} item xs={12}>
            {!loading ? artistsName : <Skeleton style={{ width: '60%' }} /> }
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
