import React, { ReactElement, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { useService } from '@xstate/react';
import { useHistory } from 'react-router-dom';
import { State } from 'xstate';
import { UploadNewMusic, MusicList, BottomControlsBar } from '../../components';
import { MusicPlayerMachineEvents, musicPlayerService } from '../../machines';
import { MusicPlayerMachineContext } from '../../machines/music-player.machine';

export function HomePage(): ReactElement {
  const [current, send] = useService(musicPlayerService);
  const history = useHistory();

  const goToMusicPlayerPage = (id: string) => {
    history.push(`/play/${id}`);
  };

  useEffect(() => {
    const eventListener = (state: State<MusicPlayerMachineContext>) => {
      if (state.event.type === 'done.invoke.load-music' && state.context.currentPlayingMusic?.id) {
        goToMusicPlayerPage(state.context.currentPlayingMusic.id);
      }
    };
    musicPlayerService.onTransition(eventListener);

    return () => {
      musicPlayerService.off(eventListener);
    };
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          style={{
            color: 'rgb(var(--primary))',
            marginTop: '50px',
            marginBottom: '10px',
            marginLeft: '10px',
          }}
        >
          <Typography
            variant="h6"
            style={{
              fontWeight: 'bold',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Your Songs
          </Typography>
          <UploadNewMusic />
        </Grid>
        <MusicList
          onSelectItem={(id: string | null) => {
            if (id) {
              if (current.context.currentPlayingMusic?.id === id) {
                goToMusicPlayerPage(id);
              } else {
                send({
                  type: MusicPlayerMachineEvents.LOAD,
                  id,
                });
              }
            }
          }}
        />
        {' '}
      </Container>
      <BottomControlsBar />
    </>
  );
}
