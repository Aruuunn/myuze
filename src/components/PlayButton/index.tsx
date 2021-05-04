import React, { ReactElement } from 'react';
import { useService } from '@xstate/react';
import { IconButton, SvgIcon } from '@material-ui/core';
import { motion } from 'framer-motion';

import { useStyles } from './styles';
import { MusicPlayerMachineEvents, musicPlayerService, MusicPlayerMachineStates } from '../../machines';

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

  return (
    <motion.div
      whileTap={{ scale: isDisabled() ? 1 : 0.9 }}
      whileHover={{ scale: isDisabled() ? 1 : 1.05 }}
    >
      <IconButton
        className={`${styles.root} ${styles[size]} ${className ?? ''}`}
        color="primary"
        disabled={isDisabled()}
        onClick={() => send({
          type: currentState === MusicPlayerMachineStates.PLAYING
            ? MusicPlayerMachineEvents.PAUSE : MusicPlayerMachineEvents.PLAY,
        })}
      >
        <SvgIcon>
          {currentState === MusicPlayerMachineStates.PLAYING ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path
                d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path
                d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"
                fill="currentColor"
              />
            </svg>
          )}
        </SvgIcon>
      </IconButton>
    </motion.div>
  );
}
