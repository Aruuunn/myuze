import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: () => ({
    height: '180px',
    width: '180px',
    backgroundColor: 'rgb(var(--primary))',
    borderRadius: '30px 30px 30px 30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '-1px 9px 36px -9px rgba(var(--primary),0.5)',
  }),
  innerText: {
    fontSize: '72px',
    fontWeight: 'bold',
    color: 'rgb(var(--primary-dark))',
  },
});
