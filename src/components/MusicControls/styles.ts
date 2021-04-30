import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: ({ size }: { size: 'large' | 'small' }) => ({
    padding: size === 'small' ? 0 : '30px',
  }),
});
