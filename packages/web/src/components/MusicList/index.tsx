import React, { ReactElement, useEffect, useState } from 'react';
import { useMusicStorage, usePlaylistStorage } from '@open-music-player/core';
import { List } from '../List';
import { MusicListItem } from '../MusicListItem';
import { Playlist } from '../../Playlist.enum';

export interface MusicListProps {
  onSelectItem: (data: { id: string; index: number } | null) => void;
  playlist: string;
}

export function MusicList(props: MusicListProps): ReactElement {
  const { onSelectItem, playlist } = props;

  const db = useMusicStorage();
  const playlistStorage = usePlaylistStorage();
  const [totalCount, setTotalCount] = useState(-1);

  useEffect(() => {
    function componentOnMount() {
      if (playlist === Playlist.DEFAULT) {
        db.getTotalCount().then(setTotalCount);
      } else {
        playlistStorage.getMusicCount(playlist).then(setTotalCount);
      }
    }

    componentOnMount();
    db.onChange(() => {
      componentOnMount();
    });

    /* eslint-disable-next-line */
  }, []);

  if (totalCount === -1) {
    return <div />;
  }

  return (
    <>
      <List totalCount={totalCount}>
        {({ index, style, itemSize, width }) => (
          <MusicListItem
            height={itemSize}
            width={width}
            onSelectItem={onSelectItem}
            itemKey={index.toString()}
            index={index}
            style={style}
            playlist={playlist}
          />
        )}
      </List>
    </>
  );
}
