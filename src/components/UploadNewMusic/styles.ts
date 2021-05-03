import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  addBtn: {
    color: 'rgb(var(--primary-dark))',
    '&:hover, &:focus': {
      color: 'rgb(var(--primary))',
    },
  },
});
