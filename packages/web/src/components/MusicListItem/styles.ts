import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: ({ isCurrentPlayingMusic }: { isCurrentPlayingMusic: boolean }) => ({
    fontWeight: isCurrentPlayingMusic ? 'bold' : 'normal',
    opacity: isCurrentPlayingMusic ? 1 : 0.8,
  }),
});
