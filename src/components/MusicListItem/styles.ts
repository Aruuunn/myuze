import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({
  root: {
    padding: '2px',
  },
  card: ({ isCurrentPlayingMusic }: { isCurrentPlayingMusic: boolean }) => ({
    backgroundColor: 'rgb(var(--bg-color-lighter))',
    padding: '20px',
    textOverflow: 'ellipsis',
    color: 'rgb(var(--primary-bright))',
    fontWeight: isCurrentPlayingMusic ? 'bold' : 'normal',
  }),
  artists: {
    fontWeight: 'normal',
    fontSize: '14px',
    marginTop: '5px',
    color: 'rgb(var(--primary-dark))',
  },
}));
