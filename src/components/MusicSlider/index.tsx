import React, {
  useContext,
  ReactElement,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';

import { Slider } from './components';
import {
  AudioServiceContext,
  CurrentMusicDetailsContext,
} from '../../providers';

export interface MusicSliderProps {
  size: 'small' | 'large';
}

export function MusicSlider(props: MusicSliderProps): ReactElement {
  const { size } = props;
  const [musicSliderState, setMusicSliderState] = useState({
    currentValue: 0,
    maxValue: 0,
  });
  const currentMusicDetails = useContext(CurrentMusicDetailsContext)?.[0];
  const audioService = useContext(AudioServiceContext);
  const [disabled, setDisabled] = useState(!currentMusicDetails);

  audioService.onLoad(() => {
    setDisabled(false);
  });

  const updateSliderValue = (newCurrentValue: number) => {
    setMusicSliderState((state) => ({
      ...state,
      currentValue: newCurrentValue ?? state.currentValue,
    }));
  };

  const updateSliderMaxValue = (newMaxValue: number) => {
    if (newMaxValue === Infinity) {
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
    audioService.play();
    addTimeUpdateListener();
  };

  useEffect(() => {
    const callback = () => {
      updateSliderMaxValue(audioService.duration);
    };

    if (currentMusicDetails) callback();

    audioService.onLoad(callback);

    audioService.onDurationChange(callback);

    addTimeUpdateListener();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <Slider
      data-size={size}
      disabled={disabled}
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
