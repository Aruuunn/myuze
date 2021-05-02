import React, { ReactElement } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { SkipNextRounded, SkipPreviousRounded } from '@material-ui/icons';

import { PlayButton } from '../PlayButton';
import { useStyles } from './styles';
import { MusicPlayerMachineEvents, musicPlayerService } from '../../machines';

export interface MusicControllerProps {
  size: 'small' | 'large';
}

export function MusicControls(props: MusicControllerProps): ReactElement {
  const { size } = props;

  const styles = useStyles({ size });

  return (
    <Grid container justify="center" className={styles.root}>
      <IconButton
        onClick={() => { musicPlayerService.send({ type: MusicPlayerMachineEvents.PREV }); }}
        size="medium"
        className={styles.controls}
      >
        <SkipPreviousRounded fontSize={size} />
      </IconButton>
      <PlayButton size={size} />
      <IconButton
        onClick={() => { musicPlayerService.send({ type: MusicPlayerMachineEvents.NEXT }); }}
        size="medium"
        className={styles.controls}
      >
        <SkipNextRounded fontSize={size} />
      </IconButton>
    </Grid>
  );
}

export default MusicControls;
