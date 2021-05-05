import { makeStyles } from '@material-ui/styles';
import { MusicPlayerModes } from '../../machines';

export const useStyles = makeStyles({
  root: ({ size }: { size: 'large' | 'small', mode: MusicPlayerModes }) => ({
    padding: size === 'small' ? 0 : '20px',
    display: 'flex',
    alignItems: 'center',
  }),
  controls: ({ size }: { size: 'large' | 'small' }) => ({
    color: 'rgb(var(--primary-dark))',
    margin: `0 ${size === 'small' ? 0 : 10}px 0 ${size === 'small' ? 0 : 10}px`,
    opacity: size === 'small' ? 0.8 : 1,
  }),
  shuffle: ({ mode, size }: { mode: MusicPlayerModes, size: 'large' | 'small', }) => ({
    color: mode === MusicPlayerModes.SHUFFLE ? 'rgb(var(--primary))' : 'rgb(var(--primary-dark))',
    opacity: size === 'small' ? 0.8 : 1,
  }),
  onRepeat: ({ mode, size }: { mode: MusicPlayerModes, size: 'large' | 'small', }) => ({
    color: mode === MusicPlayerModes.ON_REPEAT ? 'rgb(var(--primary))' : 'rgb(var(--primary-dark))',
    opacity: size === 'small' ? 0.8 : 1,
  }),
});
