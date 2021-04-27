import React, { ReactElement } from 'react';
import { Container, Grid } from '@material-ui/core';

import { UploadNewMusic, MusicList } from '../../components';

export function HomePage(): ReactElement {
  return (
    <>
      <Container maxWidth="lg">
        <Grid style={{ color: 'rgb(var(--primary))' }}>
          New Music
          <UploadNewMusic />
        </Grid>

        <MusicList />
        {' '}
      </Container>
    </>
  );
}
