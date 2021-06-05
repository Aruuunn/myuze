import { useContext } from 'react';
import { PlaylistStorageContext } from '../providers';

export function usePlaylistStorage() {
  return useContext(PlaylistStorageContext);
}
