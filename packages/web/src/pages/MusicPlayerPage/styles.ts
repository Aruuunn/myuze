import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurBg: ({ imgURL }: { imgURL?: string }) => ({
    backgroundImage: imgURL ? `url('${imgURL}')` : '',
    filter: 'blur(100px)',
    height: '100vh',
    width: '100vw',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    left: 0,
  }),
  blurBg2: () => ({
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.6,
  }),
  musicPlayerBg: {
    backgroundColor: 'rgb(var(--bg-dark))',
  },
});
