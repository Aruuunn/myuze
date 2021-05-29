import { createContext } from 'react';
import { getMusicStorage } from '../services';
import { MusicStorageInterface } from '../../../core/src/interfaces';

const db = getMusicStorage();

export const MusicStorageContext = createContext<MusicStorageInterface>(
  db,
);
