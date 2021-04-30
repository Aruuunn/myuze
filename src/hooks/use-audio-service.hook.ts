import { useContext } from 'react';
import { AudioServiceInterface } from '../interfaces';
import { AudioServiceContext } from '../providers';

export function useAudioService(): AudioServiceInterface {
  return useContext(AudioServiceContext);
}
