import React, { ReactElement, useEffect, useContext } from 'react';
import { Container, Grid } from '@material-ui/core';

import { MusicSlider, MusicController, AlbumCover } from '../../components';
import { useStyles } from './styles';
import { AudioServiceContext } from '../../common';

export function MusicPlayerPage(): ReactElement {
  const audioService = useContext(AudioServiceContext);

  useEffect(() => {
    audioService.load('/sample.mp3').then(() => {
      audioService.play();
    });

    return () => {
      audioService.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid id="music-player-container" container className={styles.container}>
        <Grid
          id="music-player"
          justify="center"
          alignItems="center"
          item
          container
          xs={8}
        >
          <Grid item container justify="center" xs={12}>
            <AlbumCover artistName="Ariana Grande" />
          </Grid>
          <Grid item xs={12}>
            <MusicSlider size="large" />
          </Grid>
          <Grid item xs={12}>
            <MusicController size="large" />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MusicPlayerPage;
