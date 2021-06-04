import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';

import {
  useMusicPlayerMachine,
  useMusicStorage,
  isTruthy,
} from '@open-music-player/core';
import { MusicDataInterface } from '@open-music-player/core';
import { ListItem } from '../ListItem';

type MusicDetails = Pick<MusicDataInterface, 'title' | 'artists' | 'id'> | null;

export interface MusicListItemProps {
  index: number;
  itemKey: string;
  height: number;
  width: number;
  style?: CSSProperties;
  onSelectItem?: (data: { id: string; index: number } | null) => void;
}

export function MusicListItem(props: MusicListItemProps): ReactElement {
  const { index, style = {}, onSelectItem, height, width } = props;

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

  const isCurrentPlayingMusic = Boolean(
    currentPlayingMusic?.id && currentPlayingMusic.id === musicDetails?.id,
  );

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
      itemKey={index.toString()}
      secondaryText={artistsName}
      primaryText={musicDetails?.title}
      onClick={clickHandler}
    />
  );
}
