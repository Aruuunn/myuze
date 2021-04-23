import React, { CSSProperties, ReactElement } from "react";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export interface MusicSliderProps {
  maxValue: number;
  currentValue: number;
  containerStyle?: CSSProperties;
  onChangeCommitted?: (
    e: React.ChangeEvent<{}>,
    value: number | number[]
  ) => void;
  onChange?: (e: React.ChangeEvent<{}>, value: number | number[]) => void;
}

const CustomSlider = withStyles({
  root: {
    color: "var(--primary-bright)",
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

export const MusicSlider = (props: MusicSliderProps): ReactElement => {
  const {
    currentValue,
    maxValue,
    containerStyle,
    onChange,
    onChangeCommitted,
  } = props;

  return (
    <div style={containerStyle}>
      <CustomSlider
        aria-label="music slider"
        value={currentValue}
        min={0}
        max={maxValue}
        defaultValue={0}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
      />
    </div>
  );
};

export default MusicSlider;
