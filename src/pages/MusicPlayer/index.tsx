import React, { ReactElement, useState, useEffect, useRef } from "react";
import { Container, Grid } from "@material-ui/core";

import { AudioAPI } from "../../common/audio-api";
import { MusicSlider, MusicSliderProps } from "../../components";
import { useStyles } from "./styles";
import { AudioServiceInterface } from "../../common/interfaces/audio.service.interface";

/**
 * @TODO Refactor , reducing redundancy
 */

export function MusicPlayerPage(): ReactElement {
  const [musicSliderState, setMusicSliderState] = useState<MusicSliderProps>({
    currentValue: 0,
    maxValue: 300,
  });

  const audioPlayer = useRef<AudioServiceInterface>();
  const audioPlayerIntv = useRef<any>();

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

      audioPlayerIntv.current = interval;

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

              // audioPlayer.current?.pause();
              clearInterval(audioPlayerIntv.current ?? 0);

              setMusicSliderState((state) => ({
                ...state,
                currentValue: value,
              }));
            }}
            onChangeCommitted={(e, value) => {
    
              if (typeof value === "number") {
                audioPlayer.current?.goToTime(value);
              }

              audioPlayer.current?.play();

              audioPlayerIntv.current = setInterval(() => {
                if (typeof audioPlayer.current === "undefined") return;

                if (
                  audioPlayer.current?.currentTime >= musicSliderState.maxValue
                ) {
                  clearInterval(audioPlayerIntv.current ?? 0);
                }
                updateSliderValue(audioPlayer.current.currentTime);
              }, 100);
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MusicPlayerPage;
