import { AudioAPI } from './audio-api';
import { AudioServiceInterface } from '../interfaces';

/** Music Storage is marked with singleton decorator,
 * so that we all ways get the same instance of the class always
 * */
export const getAudioService = (): AudioServiceInterface => new AudioAPI();
