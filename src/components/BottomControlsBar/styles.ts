import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    position: 'fixed',
    height: '60px',
    backgroundColor: 'rgb(var(--primary-darker))',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  expandBtn: {
    color: 'rgb(var(--primary-dark))',
    '&:hover, &:focus': {
      color: 'rgb(var(--primary))',
    },
  },
  musicTitleCtn: {
    marginLeft: '5px',
    boxSizing: 'border-box',
  },
  expandBtnCtn: {
    justifySelf: 'flex-start',
  },
});
