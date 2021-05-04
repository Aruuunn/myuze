import { makeStyles } from '@material-ui/styles';
import { MusicPlayerModes } from '../../machines';

export const useStyles = makeStyles({
  root: ({ size }: { size: 'large' | 'small', mode: MusicPlayerModes }) => ({
    padding: size === 'small' ? 0 : '30px',
    display: 'flex',
    alignItems: 'center',
  }),
  controls: ({ size }: { size: 'large' | 'small' }) => ({
    color: 'rgb(var(--primary-dark))',
    margin: `0 ${size === 'small' ? 5 : 20}px 0 ${size === 'small' ? 5 : 20}px`,
  }),
  shuffle: ({ mode }: { mode: MusicPlayerModes }) => ({
    color: mode === MusicPlayerModes.SHUFFLE ? 'rgb(var(--primary))' : 'rgb(var(--primary-dark))',
  }),
  onRepeat: ({ mode }: { mode: MusicPlayerModes }) => ({
    color: mode === MusicPlayerModes.ON_REPEAT ? 'rgb(var(--primary))' : 'rgb(var(--primary-dark))',
  }),
});
