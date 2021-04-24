import React, { ReactElement, useEffect, useContext } from "react";
import { Container, Grid } from "@material-ui/core";

import { MusicSlider, MusicController } from "../../components";
import { useStyles } from "./styles";
import { AudioServiceContext } from "../../common/audio-service.provider";

export function MusicPlayerPage(): ReactElement {
  const audioService = useContext(AudioServiceContext);

  useEffect(() => {
    audioService.load("/sample.mp3").then(() => {
      audioService.play();
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
          <MusicSlider size="large" />
          <MusicController size="large" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MusicPlayerPage;
