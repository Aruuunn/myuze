import React, { ReactElement, useEffect, useState } from 'react';
import { State } from 'xstate';
import { useHistory, useParams } from 'react-router-dom';
import {
  MusicPlayerMachineEvents,
  MusicPlayerMachineContext,
  useMusicPlayerService,
  usePlaylistStorage,
  isTruthy,
  PlaylistInterface,
} from '@open-music-player/core';

import { UploadNewMusic, MusicList, ListViewLayout } from '../../components';

let autoOpenedMusicPlayerPage = false;

export function PlaylistPage(): ReactElement {
  const history = useHistory();
  const musicPlayerService = useMusicPlayerService();
  const playlistStorage = usePlaylistStorage();
  const [playlist, setPlaylist] =
    useState<Omit<PlaylistInterface, 'createdAt'>>();
  const { pid } = useParams<{ pid: string }>();

  const goToMusicPlayerPage = (id: string) => {
    history.push(`/play/${id}`);
  };

  useEffect(() => {
    if (pid === 'all') {
      setPlaylist({
        id: 'all',
        name: 'All Songs',
      });
    } else {
      playlistStorage.getPlaylistUsingId(pid).then((playlist) => {
        if (!isTruthy(playlist)) {
          history.push('/not-found');
        } else {
          setPlaylist(playlist);
        }
      });
    }

    const eventListener = (state: State<MusicPlayerMachineContext>) => {
      if (
        state.event.type === 'done.invoke.load-music' &&
        state.context.currentPlayingMusic?.id &&
        !autoOpenedMusicPlayerPage
      ) {
        autoOpenedMusicPlayerPage = true;
        goToMusicPlayerPage(state.context.currentPlayingMusic.id);
      }
    };
    musicPlayerService.onTransition(eventListener);

    return () => {
      musicPlayerService.off(eventListener);
    };

    // eslint-disable-next-line
  }, [pid]);

  return (
    <>
      <ListViewLayout
        primaryText={playlist?.name || ''}
        actions={<UploadNewMusic />}>
        <MusicList
          playlist={pid}
          onSelectItem={(
            selectedItem: { id: string; index: number } | null,
          ) => {
            if (!selectedItem) return;
            const { id, index } = selectedItem;
            if (id) {
              if (
                musicPlayerService.state.context.currentPlayingMusic?.id === id
              ) {
                goToMusicPlayerPage(id);
              } else {
                musicPlayerService.send({
                  type: MusicPlayerMachineEvents.LOAD,
                  index,
                });
              }
            }
          }}
        />
      </ListViewLayout>
    </>
  );
}
