import React, {
  ReactElement, useContext, useEffect, useState,
} from 'react';
import { List } from 'react-virtualized';

import { MusicStorageContext } from '../../providers';
import { MusicListItem } from '../MusicListItem';

export interface MusicListProps {
  onSelectItem?: (id: string | null) => void;
}

export function MusicList(props: MusicListProps): ReactElement {
  const { onSelectItem } = props;
  const [totalCount, setTotalCount] = useState(-1);

  const db = useContext(MusicStorageContext);

  useEffect(() => {
    db.getTotalCount().then(setTotalCount);
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
        height={2000}
        rowHeight={100}
      />
    </>
  );
}
