import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: ({ imgURL, sm }: { imgURL?: string, sm: boolean }) => ({
    height: sm ? '150px' : '180px',
    width: sm ? '150px' : '180px',
    backgroundColor: 'rgb(var(--primary))',
    borderRadius: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: imgURL ? 'none' : '-1px 9px 36px -9px rgba(var(--primary),0.3)',
    backgroundImage: imgURL ? `url(${imgURL})` : '',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }),
  innerText: ({ sm }: { imgURL?: string, sm: boolean }) => ({
    fontSize: sm ? '58px' : '72px',
    fontWeight: 'bold',
    color: 'rgb(var(--primary-dark))',
  }),
});
