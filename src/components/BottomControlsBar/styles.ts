import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    position: 'fixed',
    height: '60px',
    backgroundColor: 'rgb(var(--primary-darker))',
    bottom: 0,
    left: 0,
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
  },
});
