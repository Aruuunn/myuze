import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    backgroundColor: 'var(--primary)',
    color: 'var(--primary-dark)',
    '&:hover': {
      backgroundColor: 'var(--primary-bright)',
    },
  },

  medium: {
    padding: '20px',
  },
});
