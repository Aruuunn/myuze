import { createContext, Dispatch } from 'react';
import { MusicDataInterface } from '../interfaces';

export type CurrentMusicDetails = Pick<MusicDataInterface, 'artists' | 'id' | 'title'> | null;

export const CurrentMusicDetailsContext = createContext<
[CurrentMusicDetails, Dispatch<CurrentMusicDetails>] | null>(null);
