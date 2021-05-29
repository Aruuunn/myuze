import React, {
  ReactElement, useEffect, useState,
} from 'react';
import { FixedSizeList as List } from 'react-window';
import { useMusicStorage } from '@open-music-player/core';
import { MusicListItem } from '../MusicListItem';

export interface MusicListProps {
  onSelectItem?: (data: { id: string, index: number } | null) => void;
}

export function MusicList(props: MusicListProps): ReactElement {
  const { onSelectItem } = props;

  const getContainerHeight = () => window.innerHeight - 170;

  const db = useMusicStorage();
  const [totalCount, setTotalCount] = useState(-1);
  const [containerHeight, setContainerHeight] = useState(getContainerHeight());

  const itemSize = 85;
  const width = 500;

  useEffect(() => {
    const onWindowResize = () => {
      setContainerHeight(getContainerHeight());
    };

    window.addEventListener('resize', onWindowResize);

    const componentOnMount = () => db.getTotalCount().then(setTotalCount);
    componentOnMount();
    db.onChange(() => {
      componentOnMount();
    });

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  if (totalCount === -1) {
    return <div />;
  }

  return (
    <>
      <List
        className="hide-scrollbar"
        itemCount={totalCount}
        width={width}
        height={containerHeight}
        itemSize={itemSize}
        style={{ maxWidth: '100%' }}
      >
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
