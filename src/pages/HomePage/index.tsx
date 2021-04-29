import React, { ReactElement, useContext } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { UploadNewMusic, MusicList, BottomControlsBar } from '../../components';
import { CurrentMusicDetailsContext } from '../../core/providers';

export function HomePage(): ReactElement {
  const history = useHistory();
  const setCurrentMusicState = useContext(CurrentMusicDetailsContext)?.[1];
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          style={{
            color: 'rgb(var(--primary))', marginTop: '50px', marginBottom: '10px', marginLeft: '10px',
          }}
        >
          <Typography variant="h6" style={{ fontWeight: 'bold', fontFamily: '\'Open Sans\', sans-serif' }}>
            Your Songs
          </Typography>
          <UploadNewMusic />
        </Grid>
        <MusicList onSelectItem={(musicData) => {
          if (musicData) {
            if (typeof setCurrentMusicState === 'function') {
              setCurrentMusicState(musicData);
            }
            history.push(`/play/${musicData.id}`);
          }
        }}
        />
        {' '}
      </Container>
      <BottomControlsBar />
    </>
  );
}
