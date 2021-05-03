import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: ({ size }: { size: 'large' | 'small' }) => ({
    padding: size === 'small' ? 0 : '30px',
    display: 'flex',
    alignItems: 'center',
  }),
  controls: ({ size }: { size: 'large' | 'small' }) => ({
    color: 'rgb(var(--primary-dark))',
    margin: `0 ${size === 'small' ? 10 : 40}px 0 ${size === 'small' ? 10 : 40}px`,
  }),
});
