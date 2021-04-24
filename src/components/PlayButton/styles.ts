import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgb(var(--primary))',
    color: 'rgb(var(--primary-dark))',
    '&:hover': {
      backgroundColor: 'rgb(var(--primary-bright))',
    },
  },

  medium: {
    padding: '20px',
  },
});
