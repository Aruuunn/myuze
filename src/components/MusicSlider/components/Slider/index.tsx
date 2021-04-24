import { Slider as MaterialSlider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const Slider = withStyles({
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
})(MaterialSlider);
