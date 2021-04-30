import { useContext } from 'react';
import { MusicStorageContext } from '../providers';
import { MusicStorageInterface } from '../interfaces';

/**
 * Note:- If you want to re-render component on changes to data stored in MusicDataStorage,
 * then use the onChange Event Handler!
 * */
export function useMusicStorage(): MusicStorageInterface {
  return useContext(MusicStorageContext);
}
