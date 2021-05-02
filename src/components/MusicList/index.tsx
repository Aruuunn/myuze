import React, {
  ReactElement, useEffect, useState,
} from 'react';
import { FixedSizeList as List } from 'react-window';

import { MusicListItem } from '../MusicListItem';
import { useMusicStorage } from '../../hooks';

export interface MusicListProps {
  onSelectItem?: (id: string | null) => void;
}

export function MusicList(props: MusicListProps): ReactElement {
  const { onSelectItem } = props;
  const [totalCount, setTotalCount] = useState(-1);

  const db = useMusicStorage();
  const itemSize = 85;
  const width = 500;

  useEffect(() => {
    const componentOnMount = () => db.getTotalCount().then(setTotalCount);

    componentOnMount();

    db.onChange(() => {
      componentOnMount();
    });
  }, [db]);

  if (totalCount === -1) {
    return <div />;
  }

  return (
    <>
      <List
        className="hide-scrollbar"
        itemCount={totalCount}
        width={width}
        height={window.innerHeight - 200}
        itemSize={itemSize}
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
