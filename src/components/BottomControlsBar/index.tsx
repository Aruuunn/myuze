import React, { ReactElement } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useStyles } from './styles';
import { MusicControls } from '../MusicControls';
import { MusicSlider } from '../MusicSlider';

export function BottomControlsBar(): ReactElement {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={5}>
            <MusicControls size="small" />
          </Grid>
          <Grid item xs={5}>
            <MusicSlider size="small" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
