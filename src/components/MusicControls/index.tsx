import React, { ReactElement } from "react";
import { Grid } from "@material-ui/core";

import { PlayButton } from "../PlayButton";
import { useStyles } from "./styles";

export interface MusicControllerProps {
  size: "small" | "large";
}

export function MusicController(props: MusicControllerProps): ReactElement {
  const {  size } = props;

  const styles = useStyles();

  return (
    <Grid container justify="center" className={styles.root}>
      <PlayButton
        size={size}
      />
    </Grid>
  );
}

export default MusicController;
