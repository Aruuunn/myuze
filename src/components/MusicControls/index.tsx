import React, { ReactElement } from "react";
import { Grid } from "@material-ui/core";

import { PlayButton } from "../PlayButton";
import { useStyles } from "./styles";

type Callback = () => void;

export interface MusicControllerProps {
  onPlay: Callback;
  onPause: Callback;
  isPlaying: boolean;
  onNextMusic: Callback;
  onPrevMusic: Callback;
  size: "small" | "large";
}

export function MusicController(props: MusicControllerProps): ReactElement {
  const { onPause, onPlay, isPlaying, onNextMusic, onPrevMusic, size } = props;

  const styles = useStyles();

  return (
    <Grid container justify="center" className={styles.root}>
      <PlayButton
        size={size}
        onPause={onPause}
        onPlay={onPlay}
        isPlaying={isPlaying}
      />
    </Grid>
  );
}

export default MusicController;
