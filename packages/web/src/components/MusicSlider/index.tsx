import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';

import { send } from 'xstate';
import {
  MusicPlayerMachineEvents,
  MusicPlayerMachineStates,
  useAudioService,
  useMusicPlayerMachine,
} from '@open-music-player/core';

import { Slider } from './components';

export interface MusicSliderProps {
  size: 'small' | 'large';
}

export function MusicSlider(props: MusicSliderProps): ReactElement {
  const { size } = props;
  const [musicSliderState, setMusicSliderState] = useState({
    currentValue: 0,
    maxValue: 0,
  });
  const audioService = useAudioService();
  const [current] = useMusicPlayerMachine();
  const currentState = current.value;

  const updateSliderValue = (newCurrentValue: number) => {
    setMusicSliderState((state) => ({
      ...state,
      currentValue: newCurrentValue ?? state.currentValue,
    }));
  };

  const updateSliderMaxValue = (newMaxValue: number) => {
    if (!Number.isFinite(newMaxValue)) {
      return;
    }
    setMusicSliderState((state) => ({
      ...state,
      maxValue: newMaxValue ?? state.maxValue,
    }));
  };

  const addTimeUpdateListener = () => {
    audioService.onTimeUpdate((currentTime) => {
      updateSliderValue(currentTime);
    });
  };

  const onChange = (e: ChangeEvent<{}>, currentValue: number | number[]) => {
    if (typeof currentValue !== 'number') return;
    audioService.removeTimeUpdateListener();
    updateSliderValue(currentValue);
  };

  const onChangeCommitted = (
    e: ChangeEvent<{}>,
    timeInSeconds: number | number[],
  ) => {
    if (typeof timeInSeconds !== 'number') return;

    audioService.goToTime(timeInSeconds);
    send({
      type: MusicPlayerMachineEvents.PLAY,
    });
    addTimeUpdateListener();
  };

  const callback = () => {
    updateSliderMaxValue(audioService.duration);
  };

  useEffect(() => {
    audioService.onLoad(callback);

    audioService.onDurationChange(callback);

    addTimeUpdateListener();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentState !== MusicPlayerMachineStates.NOT_LOADED) {
      callback();
      updateSliderValue(audioService.currentTime);
    }
    // eslint-disable-next-line
  }, [current]);

  return (
    <Slider
      data-size={size}
      disabled={currentState === MusicPlayerMachineStates.NOT_LOADED}
      aria-label="music slider"
      value={musicSliderState.currentValue}
      min={0}
      max={musicSliderState.maxValue}
      defaultValue={0}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
    />
  );
}

export default MusicSlider;
