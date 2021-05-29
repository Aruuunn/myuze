import React, { CSSProperties, ReactElement } from 'react';
import { IconButton } from '@material-ui/core';
import { SkipPreviousRounded as PlayPrevIcon } from '@material-ui/icons';
import {
  MusicPlayerMachineEvents,
  useMusicPlayerMachine,
} from '@open-music-player/core';

export interface PlayPrevButtonProps {
  className?: string;
  style?: CSSProperties;
  size: 'small' | 'large'
}

export function PlayPrevButton(props: PlayPrevButtonProps): ReactElement {
  const { className, style, size } = props;
  const [, send] = useMusicPlayerMachine();

  return (
    <IconButton
      data-testid="play-prev-button"
      onClick={() => { send({ type: MusicPlayerMachineEvents.PREV }); }}
      size="medium"
      style={style}
      className={className}
    >
      <PlayPrevIcon style={{ transform: size === 'small' ? 'scale(1.4)' : '' }} fontSize={size} />
    </IconButton>
  );
}
