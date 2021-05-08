import React, { ReactElement } from 'react';
import { useService } from '@xstate/react';
import { IconButton, SvgIcon } from '@material-ui/core';
import { PlayArrowRounded, PauseRounded } from '@material-ui/icons';
import { motion } from 'framer-motion';

import { useStyles } from './styles';
import {
  MusicPlayerMachineEvents,
  musicPlayerService, MusicPlayerMachineStates,
} from '../../../../machines';

export interface PlayButtonProps {
  size: 'small' | 'large';
  className?: string;
}

export function PlayButton(props: PlayButtonProps): ReactElement {
  const { size, className } = props;
  const [current, send] = useService(musicPlayerService);
  const styles = useStyles();

  const { currentPlayingMusic } = current.context;
  const currentState = current.value;

  const isDisabled = () => !currentPlayingMusic;
  const isPlaying = () => currentState === MusicPlayerMachineStates.PLAYING;
  const pause = () => {
    send({
      type: MusicPlayerMachineEvents.PAUSE,
    });
  };

  const play = () => {
    send({
      type: MusicPlayerMachineEvents.PLAY,
    });
  };

  const togglePlay = () => {
    if (isPlaying()) {
      pause();
    } else {
      play();
    }
  };

  return (
    <motion.div
      whileTap={{ scale: isDisabled() ? 1 : 0.9 }}
      whileHover={{ scale: isDisabled() ? 1 : 1.05 }}
    >
      <IconButton
        className={`${styles.root} ${styles[size]} ${className ?? ''}`}
        color="primary"
        disabled={isDisabled()}
        onClick={togglePlay}
        data-testid="play-button"
      >
        <SvgIcon>
          {isPlaying() ? (
            <PauseRounded fontSize={size} />
          ) : (
            <PlayArrowRounded fontSize={size} />
          )}
        </SvgIcon>
      </IconButton>
    </motion.div>
  );
}
