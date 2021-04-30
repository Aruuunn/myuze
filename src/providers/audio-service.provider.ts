import { createContext } from 'react';
import { AudioAPI } from '../services';
import { AudioServiceInterface } from '../interfaces';

export const AudioServiceContext = createContext<AudioServiceInterface>(
  new AudioAPI(),
);
