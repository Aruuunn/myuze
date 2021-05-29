import React, { CSSProperties, ReactElement } from 'react';
import { IconButton } from '@material-ui/core';
import { ShuffleRounded } from '@material-ui/icons';
import { MusicPlayerMachineEvents, MusicPlayerModes, useMusicPlayerMachine } from '@open-music-player/core';

import { useStyles } from './styles';

export interface ToggleShufflePlayButtonProps {
  size: 'small' | 'large';
  className?: string;
  style?: CSSProperties;
}

export function ToggleShufflePlayButton(props: ToggleShufflePlayButtonProps): ReactElement {
  const { size, className, style } = props;

  const [current, send] = useMusicPlayerMachine();

  const isShuffleMode = current.context.mode === MusicPlayerModes.SHUFFLE;

  const toggleShuffleMode = () => {
    send({
      type: MusicPlayerMachineEvents.CHANGE_MODE,
      mode: isShuffleMode ? MusicPlayerModes.NORMAL : MusicPlayerModes.SHUFFLE,
    });
  };

  const styles = useStyles({ size, isShuffleMode });

  return (
    <IconButton
      data-testid="toggle-shuffle-button"
      onClick={toggleShuffleMode}
      size="medium"
      style={style}
      className={`${styles.shuffle} ${className ?? ''}`}
    >
      <ShuffleRounded
        className={styles.shuffleIcon}
        fontSize={size}
      />
    </IconButton>
  );
}
