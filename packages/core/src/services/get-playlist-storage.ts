import { PlaylistStorage } from './playlist-storage';
import { PlaylistStorageInterface } from '../interfaces/playlist-storage';

export const getPlaylistStorage = (): PlaylistStorageInterface =>
  new PlaylistStorage();
