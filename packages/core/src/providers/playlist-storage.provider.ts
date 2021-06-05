import { createContext } from 'react';
import { PlaylistStorageInterface } from '../interfaces/playlist-storage';
import { getPlaylistStorage } from '../services';

const playlistStorage = getPlaylistStorage();

export const PlaylistStorageContext =
  createContext<PlaylistStorageInterface>(playlistStorage);
