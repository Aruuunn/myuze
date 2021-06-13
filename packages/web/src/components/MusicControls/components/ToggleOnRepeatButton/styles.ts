import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  onRepeat: ({
    isOnRepeatMode,
    size,
  }: {
    isOnRepeatMode: boolean;
    size: 'large' | 'small';
  }) => ({
    color: isOnRepeatMode ? 'rgb(var(--primary))' : 'rgb(var(--primary-dark))',
    opacity: size === 'small' ? 0.8 : 1,
    marginRight: '30px',
  }),
  onRepeatIcon: ({ size }: { size: 'large' | 'small' }) => ({
    transform: size === 'large' ? 'scale(0.7)' : '',
  }),
});
