import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  },
  paper: {
    padding: '30px',
    width: '400px',
    maxWidth: '100vw',
    backgroundColor: 'rgb(var(--bg-color))',
    color: 'rgb(var(--primary-dark))',
  },
  modalBtn: {
    width: '100%',
    backgroundColor: 'rgb(var(--primary-darker))',
    color: 'rgb(var(--primary-dark))',
    marginTop: '5px',
    opacity: 0.9,
    '&:hover, &:focus': {
      backgroundColor: 'rgb(var(--primary-darker))',
      color: 'rgb(var(--primary))',
      opacity: 1,
    },
    padding: '10px',
  },
  btnGrp: {
    marginTop: '20px',
  },
  text: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});
