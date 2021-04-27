import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    padding: '5px',
  },
  card: {
    backgroundColor: 'rgb(var(--bg-color-lighter))',
    padding: '20px',
    textOverflow: 'ellipsis',
    color: 'rgb(var(--primary))',
  },
  artists: {
    fontWeight: 'normal',
    fontSize: '14px',
    marginTop: '5px',
    color: 'rgb(var(--primary-dark))',
  },
});
