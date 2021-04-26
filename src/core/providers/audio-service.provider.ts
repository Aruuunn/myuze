import { createContext } from 'react';
import { AudioAPI } from '../services/audio-api.service';
import { AudioServiceInterface } from '../interfaces/audio.service.interface';

export const AudioServiceContext = createContext<AudioServiceInterface>(
  new AudioAPI(),
);
