import { Slider as MaterialSlider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export const Slider = withStyles({
  root: {
    color: 'rgb(var(--primary))',
    height: 8,
    '&[data-size="small"]': {
      height: 6,
    },
    '&:hover .MuiSlider-thumb': {
      display: 'block',
    },
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: 'rgb(var(--primary-dark))',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    display: 'none',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    '[data-size="small"] &': {
      transform: 'scale(0.6)',
      marginTop: -9,
    },
  },
  active: {},
  disabled: {
    opacity: 0.3,
    '& .MuiSlider-thumb': {
      display: 'none',
    },
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
    '[data-size="small"] &': {
      height: 6,
    },
  },
  rail: {
    height: 8,
    borderRadius: 4,
    '[data-size="small"] &': {
      height: 6,
    },
  },
})(MaterialSlider);
