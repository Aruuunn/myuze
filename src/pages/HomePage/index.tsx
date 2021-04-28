import React, { ReactElement } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { UploadNewMusic, MusicList, BottomControlsBar } from '../../components';

export function HomePage(): ReactElement {
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
        <MusicList />
        {' '}
      </Container>
      <BottomControlsBar />
    </>
  );
}
