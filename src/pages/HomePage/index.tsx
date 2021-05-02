import React, { ReactElement, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { State } from 'xstate';
import { UploadNewMusic, MusicList, BottomControlsBar } from '../../components';
import { MusicPlayerMachineEvents, musicPlayerService } from '../../machines';
import { MusicPlayerMachineContext } from '../../machines/music-player.machine';

export function HomePage(): ReactElement {
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
          onSelectItem={(selectedItem: { id: string, index: number } | null) => {
            if (!selectedItem) return;
            const { id, index } = selectedItem;
            if (id) {
              if (musicPlayerService.state.context.currentPlayingMusic?.id === id) {
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
        {' '}
      </Container>
      <BottomControlsBar />
    </>
  );
}
