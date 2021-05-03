import React, { ReactElement } from 'react';
import {
  Container, Grid, IconButton,
} from '@material-ui/core';
import { ExpandLessRounded } from '@material-ui/icons';

import { useHistory } from 'react-router-dom';
import { MusicControls } from '../MusicControls';
import { MusicSlider } from '../MusicSlider';
import { useStyles } from './styles';
import { useMusicPlayerMachine } from '../../hooks';
import { MusicName } from '../MusicName';

export function BottomControlsBar(): ReactElement {
  const styles = useStyles();
  const history = useHistory();
  const [current] = useMusicPlayerMachine();

  const {
    context: {
      currentPlayingMusic,
    },
  } = current;

  return (
    <div className={styles.root}>
      <Container>
        <Grid container alignItems="center">
          <Grid
            item
            container
            alignItems="center"
            justify="space-between"
            xs={4}
          >
            <Grid item xs={1}>
              {' '}
              <IconButton
                disabled={
                  !currentPlayingMusic
                }
                onClick={
                  () => {
                    history.push(`/play/${currentPlayingMusic?.id}`);
                  }
                }
                className={styles.expandBtn}
              >
                <ExpandLessRounded />
              </IconButton>
            </Grid>
            <Grid item xs={10} style={{ marginLeft: '5px', boxSizing: 'border-box' }}>
              <MusicName
                title={currentPlayingMusic?.title ?? ''}
                artists={currentPlayingMusic?.artists ?? []}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <MusicControls size="small" />
          </Grid>
          <Grid item xs={4}>
            <MusicSlider size="small" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
