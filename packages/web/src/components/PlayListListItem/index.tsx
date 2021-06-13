import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';

import {
  isTruthy,
  PlaylistInterface,
  usePlaylistStorage,
} from '@open-music-player/core';
import { ListItem } from '../ListItem';
import { Playlist } from '../../Playlist.enum';
import { useStyles } from './styles';
import clsx from 'clsx';

export interface PlayListItemProps {
  index: number;
  itemKey: string;
  height: number;
  width: number;
  style?: CSSProperties;
  onClickItem?: (data: { id: string; index: number } | null) => void;
}

export function PlayListItem(props: PlayListItemProps): ReactElement {
  const { index, style = {}, onClickItem, height, width } = props;

  const classes = useStyles();
  const playlistStorage = usePlaylistStorage();
  const [playlist, setPlaylist] =
    useState<Omit<PlaylistInterface, 'createdAt'>>();
  const { name } = playlist ?? {};

  const loading = !isTruthy(playlist);

  useEffect(() => {
    const componentOnMount = async () => {
      if (index === 0) {
        return setPlaylist({
          id: Playlist.DEFAULT,
          name: 'All Songs',
        });
      }

      const result = await playlistStorage.getPlaylistAt(index - 1);
      if (isTruthy(result)) {
        setPlaylist(result);
      }
    };

    componentOnMount();
  }, [index]);

  const clickHandler = () => {
    if (typeof onClickItem === 'function') {
      if (isTruthy(playlist)) {
        onClickItem({ id: playlist.id, index });
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
      secondaryText={''}
      primaryText={name}
      onClick={clickHandler}
      innerCardClassName={clsx({
        [classes.allSongs]: playlist?.id === Playlist.DEFAULT,
      })}
    />
  );
}
