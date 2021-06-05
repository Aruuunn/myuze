import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';

import {
  useMusicPlayerMachine,
  useMusicStorage,
  isTruthy,
  usePlaylistStorage,
} from '@open-music-player/core';
import { MusicDataInterface } from '@open-music-player/core';
import { useStyles } from './styles';
import { ListItem } from '../ListItem';
import { Omit } from '@material-ui/core';

type MusicDetails = Pick<MusicDataInterface, 'title' | 'artists' | 'id'> | null;

export interface MusicListItemProps {
  index: number;
  itemKey: string;
  height: number;
  width: number;
  playlist: string;
  style?: CSSProperties;
  onSelectItem?: (data: { id: string; index: number } | null) => void;
}

export function MusicListItem(props: MusicListItemProps): ReactElement {
  const { index, style = {}, onSelectItem, height, width, playlist } = props;

  const db = useMusicStorage();
  const [current] = useMusicPlayerMachine();
  const [musicDetails, setMusicDetails] = useState<MusicDetails>(null);
  const playlistStorage = usePlaylistStorage();
  const { currentPlayingMusic } = current.context;
  const { artists } = musicDetails ?? {};

  const loading = !isTruthy(musicDetails);
  let artistsName = isTruthy(artists) ? artists.join(' , ') : '';

  if (artistsName.length === 0) {
    artistsName = 'unknown';
  }

  async function fetchMusicDetails(
    playlist: string,
    index: number,
  ): Promise<Omit<MusicDataInterface, 'imgURL' | 'musicDataURL'> | undefined> {
    if (playlist === 'all') {
      return db.getMusicAt(index);
    } else {
      const { musicId } =
        (await playlistStorage.getMusicAt(playlist, index)) ?? {};
      if (isTruthy(musicId)) {
        const {
          musicDataURL: _,
          imgURL: _1,
          ...musicDetails
        } = (await db.getMusicUsingId(musicId)) ?? {};

        if (Object.keys(musicDetails).length === 0) return undefined;

        return musicDetails as Omit<
          MusicDataInterface,
          'imgURL' | 'musicDataURL'
        >;
      } else {
        return undefined;
      }
    }
  }

  useEffect(() => {
    const componentOnMount = async () => {
      const fetchedMusicDetails = await fetchMusicDetails(playlist, index);

      if (isTruthy(fetchedMusicDetails)) {
        setMusicDetails(fetchedMusicDetails);
      }
    };

    componentOnMount();

    db.onChange(() => {
      componentOnMount();
    });

    // eslint-disable-next-line
  }, [db, index]);

  const isCurrentPlayingMusic = Boolean(
    currentPlayingMusic?.id && currentPlayingMusic.id === musicDetails?.id,
  );

  const styles = useStyles({ isCurrentPlayingMusic });

  const clickHandler = () => {
    if (typeof onSelectItem === 'function') {
      if (isTruthy(musicDetails)) {
        onSelectItem({ id: musicDetails.id, index });
      }
    }
  };

  return (
    <ListItem
      width={width}
      style={style}
      height={height}
      loading={loading}
      className={styles.root}
      itemKey={index.toString()}
      secondaryText={artistsName}
      primaryText={musicDetails?.title}
      onClick={clickHandler}
    />
  );
}
