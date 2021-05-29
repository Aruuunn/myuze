import { useContext } from 'react';
import { MusicPlayerInterpreterContext } from '../providers';

export function useMusicPlayerService() {
  return useContext(MusicPlayerInterpreterContext);
}
