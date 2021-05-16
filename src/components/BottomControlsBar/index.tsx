import React, { ReactElement } from 'react';
import {
  Container, Grid, Hidden, IconButton,
} from '@material-ui/core';
import { ExpandLessRounded as ExpandIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { useStyles } from './styles';
import { isTruthy } from '../../utils';
import { useMusicPlayerMachine } from '../../hooks';
import { MusicControls } from '../MusicControls';
import { MusicSlider } from '../MusicSlider';
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

  const gotoMusicPlayerPage = () => {
    if (isTruthy(currentPlayingMusic?.id)) {
      history.push(`/play/${currentPlayingMusic?.id}`);
    }
  };

  return (
    <div className={styles.root}>
      <Container>
        <Grid container alignItems="center">
          <Grid
            item
            container
            alignItems="center"
            justify="space-between"
            lg={5}
            xs={12}
            sm={7}
          >
            <Grid
              item
              className={styles.expandBtnCtn}
              xs={1}
              sm={2}
            >
              <IconButton
                disabled={!currentPlayingMusic}
                onClick={gotoMusicPlayerPage}
                className={styles.expandBtn}
              >
                <ExpandIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={10}
              sm={9}
              onClick={gotoMusicPlayerPage}
              className={styles.musicTitleCtn}
            >
              <MusicName
                onClick={gotoMusicPlayerPage}
                title={currentPlayingMusic?.title}
                artists={currentPlayingMusic?.artists}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item sm={5} lg={4}>
            <Hidden only={['xs']}>
              <MusicControls size="small" />
            </Hidden>
          </Grid>
          <Grid item lg={3}>
            <Hidden only={['xs', 'sm', 'md']}>
              <MusicSlider size="small" />
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
