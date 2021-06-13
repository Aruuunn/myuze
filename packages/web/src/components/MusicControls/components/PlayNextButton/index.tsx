import React, { CSSProperties, ReactElement } from 'react';
import { IconButton } from '@material-ui/core';
import { SkipNextRounded as PlayNextIcon } from '@material-ui/icons';
import {
  MusicPlayerMachineEvents,
  useMusicPlayerMachine,
} from '@open-music-player/core';

export interface PlayNextButtonProps {
  className?: string;
  style?: CSSProperties;
  size: 'small' | 'large';
}

export function PlayNextButton(props: PlayNextButtonProps): ReactElement {
  const { className, style, size } = props;
  const [, send] = useMusicPlayerMachine();

  return (
    <IconButton
      data-testid="play-next-button"
      onClick={() => {
        send({ type: MusicPlayerMachineEvents.NEXT });
      }}
      size="medium"
      style={style}
      className={className}>
      <PlayNextIcon
        style={{ transform: size === 'small' ? 'scale(1.4)' : '' }}
        fontSize={size}
      />
    </IconButton>
  );
}
