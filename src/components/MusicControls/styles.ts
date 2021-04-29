import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ size }: { size: 'large' | 'small' }) => ({
  root: {
    padding: size === 'small' ? 0 : '30px',
  },
}));
