import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  modalBtn: {
    width: '100%',
    backgroundColor: 'rgb(var(--primary-dark))',
    color: 'rgb(var(--primary-darker))',
    marginTop: '5px',
    opacity: 0.9,
    '&:hover, &:focus': {
      backgroundColor: 'rgb(var(--primary-dark))',
      color: 'rgb(var(--primary-darker))',
      opacity: 1,
    },
    padding: '10px',
  },
  textField: {
    marginBottom: '20px',
  },
});
