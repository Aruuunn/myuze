import { withStyles, TextField as MaterialTextField } from '@material-ui/core';

export const TextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'rgb(var(--primary))',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(var(--primary-dark))',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(var(--primary))',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(var(--primary))',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(var(--primary))',
      },
    },
  },
})(MaterialTextField);
