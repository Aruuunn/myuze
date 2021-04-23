import React, { ReactElement, useState, useEffect, useContext } from "react";
import { Container, Grid } from "@material-ui/core";

import {
  MusicSlider,
  MusicSliderProps,
  MusicController,
} from "../../components";
import { useStyles } from "./styles";
import { AudioServiceContext } from "../../common/audio-service.provider";
import { AudioServiceInterface } from "../../common/interfaces/audio.service.interface";

export function MusicPlayerPage(): ReactElement {
  const [musicSliderState, setMusicSliderState] = useState<MusicSliderProps>({
    currentValue: 0,
    maxValue: 0,
  });

  const [isAudioPlaying, setAudioPlaying] = useState(false);

  const audioService: AudioServiceInterface = useContext(AudioServiceContext);

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

  useEffect(() => {
    audioService.onPlay(() => {
      setAudioPlaying(true);
    });

    audioService.onPause(() => {
      setAudioPlaying(false);
    });

    audioService.load("/sample.mp3").then(() => {
      audioService.play();

      updateSliderMaxValue(audioService.duration);
      addTimeUpdateListener();
    });

    return () => {
      audioService.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = useStyles();

  return (
    <Container>
      <Grid id="music-player-container" container className={styles.container}>
        <Grid id="music-player" item xs={8}>
          <MusicSlider
            {...musicSliderState}
            onChange={(e, currentValue) => {
              if (typeof currentValue !== "number") return;
              audioService.removeTimeUpdateListener();
              updateSliderValue(currentValue);
            }}
            onChangeCommitted={(e, timeInSeconds) => {
              if (typeof timeInSeconds !== "number") return;

              audioService.goToTime(timeInSeconds);
              audioService.play();
              addTimeUpdateListener();
            }}
          />
          <MusicController
            onPause={audioService.pause.bind(audioService)}
            onPlay={audioService.play.bind(audioService)}
            isPlaying={isAudioPlaying}
            onNextMusic={() => {}}
            onPrevMusic={() => {}}
            size="large"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MusicPlayerPage;
