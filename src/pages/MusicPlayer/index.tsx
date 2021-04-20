import React, { ReactElement, useState, useEffect, useRef } from "react";
import { Container, Grid } from "@material-ui/core";

import { AudioAPI } from "../../common/audio-api";
import { MusicSlider, MusicSliderProps } from "../../components";
import { useStyles } from "./styles";
import { AudioServiceInterface } from "../../common/interfaces/audio.service.interface";

export function MusicPlayerPage(): ReactElement {
  const [musicSliderState, setMusicSliderState] = useState<MusicSliderProps>({
    currentValue: 0,
    maxValue: 300,
  });

  const audioPlayer = useRef<AudioServiceInterface>();

  const updateSliderValue = (newCurrentValue: number) => {
    if (newCurrentValue > musicSliderState.maxValue) {
      return;
    }

    setMusicSliderState((state) => ({
      ...state,
      currentValue: newCurrentValue,
    }));
  };

  useEffect(() => {
    audioPlayer.current = new AudioAPI();

    let interval: any;

    audioPlayer.current.load("").then(() => {
      if (typeof audioPlayer.current === "undefined") return;

      audioPlayer.current.play();

      setMusicSliderState((state) => ({
        ...state,
        maxValue: audioPlayer.current?.duration ?? state.maxValue,
      }));

      interval = setInterval(() => {
        if (typeof audioPlayer.current === "undefined") return;

        if (audioPlayer.current.currentTime >= musicSliderState.maxValue) {
          clearInterval(interval);
        }
        updateSliderValue(audioPlayer.current.currentTime);
      }, 100);

      // audioPlayer.current.onTimeUpdate(() => {
      //   if (audioPlayer.current.currentTime < audioPlayer.current.duration) {
      //     setTimeout(() => {
      //       updateSliderValue(audioPlayer.current.currentTime)
      //     }, 300);
      //   }
      //   setMusicSliderState((state) => ({
      //     ...state,
      //     currentValue: audioPlayer.current.currentTime,
      //   }));
      // });
    });

    return () => {
      clearInterval(interval);
      audioPlayer.current?.clear();
    };
  }, []);

  const styles = useStyles();

  return (
    <Container>
      <Grid id="music-player-container" container className={styles.container}>
        <Grid id="music-player" item xs={8}>
          <MusicSlider
            {...musicSliderState}
            onChange={(e, value) => {
              if (typeof value !== "number") return;

              audioPlayer.current?.goToTime(value);
              setMusicSliderState((state) => ({
                ...state,
                currentValue: value,
              }));
            }}
            onChangeCommitted={() => {}}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MusicPlayerPage;
