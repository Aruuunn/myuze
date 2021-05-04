import React, { ReactElement } from 'react';
import {
  Grid, Hidden, IconButton, useMediaQuery, useTheme,
} from '@material-ui/core';
import {
  SkipNextRounded, SkipPreviousRounded, ShuffleRounded, RepeatRounded,
} from '@material-ui/icons';

import { PlayButton } from '../PlayButton';
import { useStyles } from './styles';
import { MusicPlayerMachineEvents, MusicPlayerModes } from '../../machines';
import { useMusicPlayerMachine } from '../../hooks';

export interface MusicControllerProps {
  size: 'small' | 'large';
}

export function MusicControls(props: MusicControllerProps): ReactElement {
  const { size } = props;
  const [current, send] = useMusicPlayerMachine();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = useStyles({ size, mode: current.context.mode });

  return (
    <Grid container justify="center" className={styles.root}>
      <Grid container style={{ marginBottom: sm ? '20px' : 'auto' }} item lg={2} md={2} xs={12} justify={sm ? 'center' : 'flex-end'}>
        <Hidden only={size === 'small' ? ['sm'] : []}>
          <IconButton
            onClick={() => {
              send({
                type: MusicPlayerMachineEvents.CHANGE_MODE,
                mode: current.context.mode === MusicPlayerModes.SHUFFLE
                  ? MusicPlayerModes.NORMAL : MusicPlayerModes.SHUFFLE,
              });
            }}
            size="medium"
            className={styles.shuffle}
          >
            <ShuffleRounded style={{ transform: size === 'large' ? 'scale(0.7)' : '' }} fontSize={size} />
          </IconButton>
        </Hidden>
      </Grid>
      <Grid container item lg={5} md={6} xs={12} wrap="nowrap" justify={sm ? 'center' : 'space-between'}>
        <IconButton
          onClick={() => { send({ type: MusicPlayerMachineEvents.PREV }); }}
          size="medium"
          className={styles.controls}
        >
          <SkipPreviousRounded style={{ transform: size === 'small' ? 'scale(1.4)' : '' }} fontSize={size} />
        </IconButton>
        <PlayButton className={styles.controls} size={size} />
        <IconButton
          onClick={() => { send({ type: MusicPlayerMachineEvents.NEXT }); }}
          size="medium"
          className={styles.controls}
        >
          <SkipNextRounded style={{ transform: size === 'small' ? 'scale(1.4)' : '' }} fontSize={size} />
        </IconButton>
      </Grid>
      <Grid container item lg={2} md={2} style={{ marginTop: sm ? '20px' : 'auto' }} xs={12} justify={sm ? 'center' : 'flex-start'}>
        <Hidden only={size === 'small' ? ['sm'] : []}>
          <IconButton
            onClick={() => {
              send({
                type: MusicPlayerMachineEvents.CHANGE_MODE,
                mode: current.context.mode === MusicPlayerModes.ON_REPEAT
                  ? MusicPlayerModes.NORMAL : MusicPlayerModes.ON_REPEAT,
              });
            }}
            size="medium"
            className={styles.onRepeat}
          >
            <RepeatRounded style={{ transform: size === 'large' ? 'scale(0.7)' : '' }} fontSize={size} />
          </IconButton>
        </Hidden>
      </Grid>
    </Grid>
  );
}

export default MusicControls;
