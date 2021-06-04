import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: ({ height, width }: { height: number; width: number }) => ({
    padding: '2px',
    boxSizing: 'border-box',
    height: `${height}`,
    width: `${width}`,
    maxWidth: '90vw',
  }),
  card: () => ({
    backgroundColor: 'rgb(var(--bg-color-lighter))',
    padding: '20px',
    textOverflow: 'ellipsis',
    color: 'rgb(var(--primary-bright))',
    boxSizing: 'border-box',
    '&:hover, &:focus': {
      opacity: 1,
    },
    cursor: 'pointer',
  }),
  secondary: {
    fontWeight: 'normal',
    fontSize: '14px',
    marginTop: '5px',
    color: 'rgb(var(--primary-dark))',
  },
});
