import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: ({ size }: { size: 'small' | 'large' }) => ({
    fontSize: size === 'large' ? '16px' : '15px',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  primaryText: {
    color: 'rgb(var(--primary-bright))',
  },
  secondaryText: {
    color: 'rgb(var(--primary-dark))',
    margin: '5px',
  },
});
