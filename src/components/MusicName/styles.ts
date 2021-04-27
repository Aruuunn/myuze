import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    fontSize: '16px',
  },
  primaryText: {
    color: 'rgb(var(--primary-bright))',
    fontWeight: 'bold',
  },
  secondaryText: {
    color: 'rgb(var(--primary-dark))',
  },
});
