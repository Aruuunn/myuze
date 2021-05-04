import React, { ReactElement } from 'react';
import { Grid, IconButton } from '@material-ui/core';
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

  const styles = useStyles({ size, mode: current.context.mode });

  return (
    <Grid container justify="center" className={styles.root}>
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
      <IconButton
        onClick={() => { send({ type: MusicPlayerMachineEvents.PREV }); }}
        size="medium"
        className={styles.controls}
      >
        <SkipPreviousRounded fontSize={size} />
      </IconButton>
      <PlayButton className={styles.controls} size={size} />
      <IconButton
        onClick={() => { send({ type: MusicPlayerMachineEvents.NEXT }); }}
        size="medium"
        className={styles.controls}
      >
        <SkipNextRounded fontSize={size} />
      </IconButton>
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
    </Grid>
  );
}

export default MusicControls;
