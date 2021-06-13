import React, { ReactElement, useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { isTruthy, usePlaylistStorage } from '@open-music-player/core';

import {
  AddButton,
  ListViewLayout,
  PlayListList,
  Modal,
  TextField,
} from '../../components';
import { useStyles } from './styles';

export function HomePage(): ReactElement {
  const history = useHistory();
  const classes = useStyles();
  const playlistStorage = usePlaylistStorage();
  const inputRef = useRef<HTMLInputElement>();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        text={''}
        actions={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const playListName = inputRef.current?.value ?? '';
              // @TODO handle if the playlist already exists
              playlistStorage.addNewPlaylist(playListName);
              setOpen(false);
            }}>
            <TextField
              inputProps={{
                style: {
                  color: 'white',
                },
              }}
              InputLabelProps={{ style: { color: 'rgb(var(--primary-dark))' } }}
              autoFocus
              fullWidth
              required
              inputRef={inputRef}
              className={classes.textField}
              label={'Playlist name'}
            />
            <Button
              type="submit"
              className={classes.modalBtn}
              variant="contained">
              Add
            </Button>
          </form>
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
