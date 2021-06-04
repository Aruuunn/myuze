import React, { ReactElement, useEffect, useState } from 'react';
import { useMusicStorage } from '@open-music-player/core';
import { List } from '../List';
import { MusicListItem } from '../MusicListItem';

export interface MusicListProps {
  onSelectItem: (data: { id: string; index: number } | null) => void;
}

export function MusicList(props: MusicListProps): ReactElement {
  const { onSelectItem } = props;

  const db = useMusicStorage();
  const [totalCount, setTotalCount] = useState(-1);

  const itemSize = 85;
  const width = 500;

  useEffect(() => {
    const componentOnMount = () => db.getTotalCount().then(setTotalCount);
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
        {({ index, style }) => (
          <MusicListItem
            height={itemSize}
            width={width}
            onSelectItem={onSelectItem}
            itemKey={index.toString()}
            index={index}
            style={style}
          />
        )}
      </List>
    </>
  );
}
