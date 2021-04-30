import React, { ReactElement, useContext } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { UploadNewMusic, MusicList, BottomControlsBar } from '../../components';
import {
  AudioServiceContext,
  CurrentMusicDetailsContext,
} from '../../providers';
import { useMusicStorage } from '../../hooks/use-music-storage.hook';

export function HomePage(): ReactElement {
  const history = useHistory();
  const db = useMusicStorage();
  const audioService = useContext(AudioServiceContext);
  const setCurrentMusicState = useContext(CurrentMusicDetailsContext)?.[1];
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
              if (typeof setCurrentMusicState === 'function') {
                db.getMusicUsingId(id).then((musicData) => {
                  if (musicData) {
                    audioService.load(musicData.musicDataURL).then(() => {
                      audioService.play();
                      setCurrentMusicState(musicData);
                      history.push(`/play/${id}`);
                    });
                  }
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
