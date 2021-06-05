import React, { ReactElement, useEffect, useState } from 'react';
import { usePlaylistStorage } from '@open-music-player/core';
import { List } from '../List';
import { PlayListItem } from '../PlayListListItem';

export interface PlayListListProps {
  onClickItem: (data: { id: string; index: number } | null) => void;
}

export function PlayListList(props: PlayListListProps): ReactElement {
  const { onClickItem } = props;

  const playlistStorage = usePlaylistStorage();
  const [totalCount, setTotalCount] = useState(-1);

  useEffect(() => {
    function componentOnMount() {
      playlistStorage.getTotalCount().then(setTotalCount);
    }

    componentOnMount();

    playlistStorage.onChange(() => {
      componentOnMount();
    });
    /* eslint-disable-next-line */
  }, []);

  if (totalCount === -1) {
    return <div />;
  }

  return (
    <>
      <List totalCount={totalCount + 1}>
        {({ index, style, itemSize, width }) => (
          <PlayListItem
            height={itemSize}
            width={width}
            onClickItem={onClickItem}
            itemKey={index.toString()}
            index={index}
            style={style}
          />
        )}
      </List>
    </>
  );
}
