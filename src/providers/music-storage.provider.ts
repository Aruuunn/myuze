import { createContext } from 'react';
import { MusicStorage } from '../common/services';
import { MusicStorageInterface } from '../interfaces';

export const MusicStorageContext = createContext<MusicStorageInterface>(
  new MusicStorage(),
);
