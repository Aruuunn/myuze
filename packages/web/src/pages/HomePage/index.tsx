import React, { ReactElement, useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { isTruthy } from '@open-music-player/core';

import {
  AddButton,
  ListViewLayout,
  PlayListList,
  Modal,
} from '../../components';
import { useStyles } from './styles';

export function HomePage(): ReactElement {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        text={'What do you want to add?'}
        actions={
          <>
            <Button className={classes.modalBtn} variant="contained">
              New Playlist
            </Button>
            <Button className={classes.modalBtn} variant="contained">
              New Music
            </Button>
          </>
        }
      />
      <ListViewLayout
        primaryText={'playlists'}
        actions={
          <AddButton
            onClick={() => {
              setOpen(true);
            }}
          />
        }>
        <PlayListList
          onClickItem={(data) => {
            if (isTruthy(data)) {
              const { id } = data;
              history.push(`/p/${id}`);
            }
          }}
        />
      </ListViewLayout>
    </>
  );
}
