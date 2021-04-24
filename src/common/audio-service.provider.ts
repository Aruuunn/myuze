import { createContext } from 'react';
import { AudioAPI } from './audio-api';
import { AudioServiceInterface } from './interfaces/audio.service.interface';

export const AudioServiceContext = createContext<AudioServiceInterface>(
  new AudioAPI(),
);
