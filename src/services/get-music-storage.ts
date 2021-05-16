import { MusicStorage } from './music-storage';
import { MusicStorageInterface } from '../interfaces';

/** Music Storage is marked with singleton decorator,
 * so that we all ways get the same instance of the class always
 * */
export const getMusicStorage = (): MusicStorageInterface => new MusicStorage();
