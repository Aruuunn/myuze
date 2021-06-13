import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  shuffle: ({
    isShuffleMode,
    size,
  }: {
    isShuffleMode: boolean;
    size: 'large' | 'small';
  }) => ({
    color: isShuffleMode ? 'rgb(var(--primary))' : 'rgb(var(--primary-dark))',
    opacity: size === 'small' ? 0.8 : 1,
    marginLeft: '30px',
  }),
  shuffleIcon: ({ size }: { size: 'large' | 'small' }) => ({
    transform: size === 'large' ? 'scale(0.7)' : '',
  }),
});
