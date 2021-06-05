import React, { ReactElement } from 'react';

import { ListViewLayout, PlayListList, UploadNewMusic } from '../../components';
import { isTruthy } from '@open-music-player/core';
import { useHistory } from 'react-router-dom';

export function HomePage(): ReactElement {
  const history = useHistory();

  return (
    <ListViewLayout primaryText={'playlists'} actions={<UploadNewMusic />}>
      <PlayListList
        onClickItem={(data) => {
          if (isTruthy(data)) {
            const { id } = data;
            history.push(`/p/${id}`);
          }
        }}
      />
    </ListViewLayout>
  );
}
