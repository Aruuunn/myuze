import React, {
  ReactElement, useEffect, useState,
} from 'react';
import { List } from 'react-virtualized';

import { MusicListItem } from '../MusicListItem';
import { useMusicStorage } from '../../hooks';

export interface MusicListProps {
  onSelectItem?: (id: string | null) => void;
}

export function MusicList(props: MusicListProps): ReactElement {
  const { onSelectItem } = props;
  const [totalCount, setTotalCount] = useState(-1);

  const db = useMusicStorage();

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
        rowCount={totalCount}
        width={500}
        rowRenderer={(rowProps) => (
          <MusicListItem
            onSelectItem={onSelectItem}
            itemKey={rowProps.key}
            index={rowProps.index}
          />
        )}
        height={500}
        rowHeight={100}
      />
    </>
  );
}
