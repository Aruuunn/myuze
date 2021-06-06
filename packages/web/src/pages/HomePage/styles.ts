import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
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
});
