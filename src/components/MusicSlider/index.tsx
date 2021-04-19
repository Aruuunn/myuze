import React, { CSSProperties, ReactElement } from "react";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

interface Props {
  maxValue: number;
  currentValue: number;
  containerStyle?: CSSProperties;
}

const PrettoSlider = withStyles({
  root: {
    color: "var(--primary)",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "var(--primary-dark)",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export const MusicSlider = (props: Props): ReactElement => {
  const { currentValue, maxValue, containerStyle } = props;

  return (
    <div style={containerStyle}>
      <PrettoSlider
        aria-label="pretto slider"
        value={currentValue}
        min={0}
        max={maxValue}
        defaultValue={0}
      />
    </div>
  );
};

export default MusicSlider;
