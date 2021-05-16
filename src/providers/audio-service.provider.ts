import { createContext } from 'react';
import { getAudioService } from '../services';
import { AudioServiceInterface } from '../interfaces';

const audioService = getAudioService();

export const AudioServiceContext = createContext<AudioServiceInterface>(
  audioService,
);
