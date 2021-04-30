import React, { ReactElement, useContext, useState } from 'react';
import { IconButton, SvgIcon } from '@material-ui/core';
import { motion } from 'framer-motion';

import {
  AudioServiceContext,
  CurrentMusicDetailsContext,
} from '../../providers';
import { useStyles } from './styles';

export interface PlayButtonProps {
  size: 'small' | 'large';
}

export function PlayButton(props: PlayButtonProps): ReactElement {
  const { size } = props;
  const audioService = useContext(AudioServiceContext);
  const [isPlaying, setIsPlaying] = useState(audioService.isPlaying());
  const currentMusicDetails = useContext(CurrentMusicDetailsContext)?.[0];
  const [disabled, setDisabled] = useState(!currentMusicDetails);
  const styles = useStyles();

  audioService.onPlay(() => {
    setIsPlaying(true);
  });

  audioService.onLoad(() => {
    setDisabled(false);
  });

  audioService.onPause(() => {
    setIsPlaying(false);
  });

  return (
    <motion.div
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
    >
      <IconButton
        className={`${styles.root} ${styles[size]}`}
        color="primary"
        disabled={disabled}
        onClick={() => (isPlaying ? audioService.pause() : audioService.play())}
      >
        <SvgIcon fontSize={size}>
          {isPlaying ? (
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
