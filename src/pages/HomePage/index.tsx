import React, { ReactElement } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { UploadNewMusic, MusicList } from '../../components';

export function HomePage(): ReactElement {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container alignItems="center" style={{ color: 'rgb(var(--primary))' }}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Your Songs
          </Typography>
          <UploadNewMusic />
        </Grid>
        <MusicList />
        {' '}
      </Container>
    </>
  );
}
