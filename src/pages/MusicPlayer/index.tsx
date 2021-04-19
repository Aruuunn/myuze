import React, { ReactElement, useState } from "react";
import { Container, Grid } from "@material-ui/core";

import { MusicSlider, MusicSliderProps } from "../../components";

export function MusicPlayerPage(): ReactElement {
  const [musicSliderState, setMusicSliderState] = useState<MusicSliderProps>({
    currentValue: 0,
    maxValue: 300,
  });

  return (
    <Container>
      <Grid
        container
        style={{ minHeight: "100vh" }}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <MusicSlider
            {...musicSliderState}
            onChange={(e, value) => {
              setMusicSliderState((state) => ({
                ...state,
                currentValue:
                  typeof value === "number" ? value : state.currentValue,
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
