import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ size }: { size: 'large' | 'small' }) => ({
  root: {
    padding: size === 'large' ? '30px' : '0px',
  },
}));
