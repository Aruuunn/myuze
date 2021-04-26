import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: ({ imgURL }: { imgURL?: string }) => ({
    height: '180px',
    width: '180px',
    backgroundColor: 'rgb(var(--primary))',
    borderRadius: '30px 30px 30px 30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '-1px 9px 36px -9px rgba(var(--primary),0.5)',
    backgroundImage: imgURL ? `url(${imgURL})` : '',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }),
  innerText: {
    fontSize: '72px',
    fontWeight: 'bold',
    color: 'rgb(var(--primary-dark))',
  },
});
