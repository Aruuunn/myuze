import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: ({ size }: { size: 'large' | 'small' }) => ({
    padding: size === 'small' ? 0 : '30px',
  }),
  controls: {
    color: 'rgb(var(--primary))',
    margin: '0 40px 0 40px',
  },
});
