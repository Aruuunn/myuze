import React, { ReactElement, useState, useEffect, useRef } from "react";
import { Container, Grid } from "@material-ui/core";

import { AudioAPI } from "../../common/audio-api";
import { AudioServiceInterface } from "../../common/interfaces/audio.service.interface";

import { MusicSlider, MusicSliderProps, PlayButton } from "../../components";
import { useStyles } from "./styles";

/**
 * @TODO fix unnecessary renders of play button
 * @TODO make slider movement look smooth
 */
export function MusicPlayerPage(): ReactElement {
  const [musicSliderState, setMusicSliderState] = useState<MusicSliderProps>({
    currentValue: 0,
    maxValue: 0,
  });

  const audioPlayerRef = useRef<AudioServiceInterface>(new AudioAPI());
  let audioPlayer: AudioServiceInterface = audioPlayerRef.current;

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
    audioPlayer.onTimeUpdate((currentTime) => {
      updateSliderValue(currentTime);
    });
  };

  useEffect(() => {
    audioPlayer.load("/sample.mp3").then(() => {
      audioPlayer.play();

      updateSliderMaxValue(audioPlayer.duration);

      addTimeUpdateListener();
    });

    return () => {
      audioPlayer.clear();
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
              audioPlayer.removeTimeUpdateListener();
              updateSliderValue(currentValue);
            }}
            onChangeCommitted={(e, timeInSeconds) => {
              if (typeof timeInSeconds !== "number") return;

              audioPlayer.goToTime(timeInSeconds);
              audioPlayer.play();
              addTimeUpdateListener();
            }}
          />
          <PlayButton audioPlayer={audioPlayer} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MusicPlayerPage;
