import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgb(var(--primary))',
    color: 'rgb(var(--primary-dark))',
    '&:hover, &:disabled': {
      backgroundColor: 'rgb(var(--primary-bright))',
    },
    filter: 'drop-shadow(0px 10px 10px rgba(145, 210, 214, 0.25))',

    '&:disabled': {
      opacity: 0.6,
    },
  },

  large: {
    padding: '20px',
  },
  small: {
    padding: '10px',
  },
});
