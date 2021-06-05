import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: ({ height, width }: { height: number; width: number }) => ({
    padding: '2px',
    boxSizing: 'border-box',
    height: `${height}px`,
    width: `${width}px`,
    maxWidth: '90vw',
  }),
  card: ({ height }: { height: number; width: number }) => ({
    backgroundColor: 'rgb(var(--bg-color-lighter))',
    padding: '20px',
    textOverflow: 'ellipsis',
    color: 'rgb(var(--primary-bright))',
    boxSizing: 'border-box',
    opacity: 0.9,
    height: `${height - 4}px`,
    '&:hover, &:focus': {
      opacity: 1,
    },
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  }),
  secondary: {
    fontWeight: 'normal',
    fontSize: '14px',
    marginTop: '5px',
    color: 'rgb(var(--primary-dark))',
  },
});
