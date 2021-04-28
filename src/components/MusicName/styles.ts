import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    fontSize: '16px',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: 'rgb(var(--primary-bright))',
    fontWeight: 'bold',
  },
  secondaryText: {
    color: 'rgb(var(--primary-dark))',
    margin: '5px',
  },
});
