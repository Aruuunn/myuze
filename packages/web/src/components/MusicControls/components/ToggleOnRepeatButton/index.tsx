import React, { CSSProperties, ReactElement } from 'react';
import { IconButton } from '@material-ui/core';
import { RepeatRounded as OnRepeatIcon } from '@material-ui/icons';
import {
  useMusicPlayerMachine,
  MusicPlayerMachineEvents,
  MusicPlayerModes,
} from '@open-music-player/core';
import { useStyles } from './styles';

export interface ToggleOnRepeatButtonProps {
  size: 'small' | 'large';
  className?: string;
  style?: CSSProperties;
}

export function ToggleOnRepeatButton(
  props: ToggleOnRepeatButtonProps,
): ReactElement {
  const { size, className, style } = props;

  const [current, send] = useMusicPlayerMachine();

  const isOnRepeatMode = current.context.mode === MusicPlayerModes.ON_REPEAT;

  const toggleOnRepeatMode = () => {
    send({
      type: MusicPlayerMachineEvents.CHANGE_MODE,
      mode: isOnRepeatMode
        ? MusicPlayerModes.NORMAL
        : MusicPlayerModes.ON_REPEAT,
    });
  };

  const styles = useStyles({ size, isOnRepeatMode });

  return (
    <IconButton
      data-testid="toggle-on-repeat-button"
      onClick={toggleOnRepeatMode}
      size="medium"
      style={style}
      className={`${styles.onRepeat} ${className ?? ''}`}>
      <OnRepeatIcon className={styles.onRepeatIcon} fontSize={size} />
    </IconButton>
  );
}
