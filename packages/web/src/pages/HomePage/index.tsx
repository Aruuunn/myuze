import React, { ReactElement, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { State } from 'xstate';
import { MusicPlayerMachineEvents, MusicPlayerMachineContext, useMusicPlayerService } from '@open-music-player/core';

import {
  UploadNewMusic, MusicList, BottomControlsBar,
} from '../../components';

let autoOpenedMusicPlayerPage = false;

export function HomePage(): ReactElement {
  const history = useHistory();
  const musicPlayerService = useMusicPlayerService();

  const goToMusicPlayerPage = (id: string) => {
    history.push(`/play/${id}`);
  };

  useEffect(() => {
    const eventListener = (state: State<MusicPlayerMachineContext>) => {
      if (state.event.type === 'done.invoke.load-music' && state.context.currentPlayingMusic?.id && !autoOpenedMusicPlayerPage) {
        autoOpenedMusicPlayerPage = true;
        goToMusicPlayerPage(state.context.currentPlayingMusic.id);
      }
    };
    musicPlayerService.onTransition(eventListener);

    return () => {
      musicPlayerService.off(eventListener);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: '50px' }}>
        <Grid container justify="space-between">
          <Grid
            container
            alignItems="center"
            style={{
              color: 'rgb(var(--primary))',
              marginBottom: '10px',
              marginLeft: '10px',
            }}
          >
            <Typography
              style={{
                fontWeight: 'bold',
                fontFamily: "'Open Sans', sans-serif",
                opacity: 0.6,
                fontSize: '14px',
              }}
            >
              My Songs
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
        </Grid>
      </Container>
      <BottomControlsBar />
    </>
  );
}
