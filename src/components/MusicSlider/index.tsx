import React, {
  useContext,
  ReactElement,
  useState,
  useEffect,
  ChangeEvent,
} from "react";

import { Slider } from "./components";
import { AudioServiceContext } from "../../common/audio-service.provider";

export interface MusicSliderProps {
  size: "small" | "large";
}

export function MusicSlider(props: MusicSliderProps): ReactElement {
  const [musicSliderState, setMusicSliderState] = useState({
    currentValue: 0,
    maxValue: 0,
  });

  const audioService = useContext(AudioServiceContext);

  const updateSliderValue = (newCurrentValue: number) => {
    setMusicSliderState((state) => ({
      ...state,
      currentValue: newCurrentValue ?? state.currentValue,
    }));
  };

  const updateSliderMaxValue = (newMaxValue: number) => {
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
    if (typeof currentValue !== "number") return;
    audioService.removeTimeUpdateListener();
    updateSliderValue(currentValue);
  };

  const onChangeCommitted = (
    e: ChangeEvent<{}>,
    timeInSeconds: number | number[]
  ) => {
    if (typeof timeInSeconds !== "number") return;

    audioService.goToTime(timeInSeconds);
    audioService.play();
    addTimeUpdateListener();
  };

  useEffect(() => {
    audioService.onLoad(() => {
      updateSliderMaxValue(audioService.duration);
      addTimeUpdateListener();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Slider
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
