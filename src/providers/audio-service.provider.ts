import { createContext } from 'react';
import { getAudiService } from '../services';
import { AudioServiceInterface } from '../interfaces';

const audioService = getAudiService();

export const AudioServiceContext = createContext<AudioServiceInterface>(
  audioService,
);
