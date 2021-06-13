import React, { ReactElement } from 'react';
import { Grid, Hidden, useMediaQuery, useTheme } from '@material-ui/core';

import { useMusicPlayerMachine } from '@open-music-player/core';
import {
  PlayButton,
  PlayNextButton,
  PlayPrevButton,
  ToggleOnRepeatButton,
  ToggleShufflePlayButton,
} from './components';
import { useStyles } from './styles';

export interface MusicControllerProps {
  size: 'small' | 'large';
}

export function MusicControls(props: MusicControllerProps): ReactElement {
  const { size } = props;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [current] = useMusicPlayerMachine();

  const styles = useStyles({ size, mode: current.context.mode });

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={styles.root}>
      <Grid
        container
        style={{ marginBottom: sm ? '10px' : 'auto' }}
        item
        lg={2}
        md={2}
        xs={12}
        justify={sm ? 'center' : 'flex-end'}>
        <Hidden only={['xs', 'sm']}>
          <ToggleShufflePlayButton size={size} />
        </Hidden>
      </Grid>
      <Grid
        container
        item
        lg={4}
        md={5}
        xs={12}
        wrap="nowrap"
        justify={sm ? 'center' : 'space-between'}>
        <PlayPrevButton size={size} className={styles.controls} />
        <PlayButton className={styles.controls} size={size} />
        <PlayNextButton size={size} className={styles.controls} />
      </Grid>
      <Grid
        container
        item
        lg={2}
        md={2}
        wrap="nowrap"
        alignItems="center"
        style={{ marginTop: sm ? '10px' : 'auto' }}
        xs={12}
        justify={sm ? 'center' : 'flex-start'}>
        <Hidden only={size === 'small' ? ['sm'] : []}>
          <Hidden mdUp>
            <ToggleShufflePlayButton size={size} />
            <div style={{ margin: '10px' }} />
          </Hidden>
          <ToggleOnRepeatButton size={size} />
        </Hidden>
      </Grid>
    </Grid>
  );
}

export default MusicControls;
