import { createContext } from 'react';
import { MusicStorage } from '../services';
import { MusicStorageInterface } from '../interfaces';

export const MusicStorageContext = createContext<MusicStorageInterface>(
  new MusicStorage(),
);
