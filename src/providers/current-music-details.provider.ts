import { createContext, Dispatch } from 'react';
import { MusicDataInterface } from '../interfaces';

export const CurrentMusicDetailsContext = createContext<
[MusicDataInterface | null, Dispatch<MusicDataInterface | null>] | null
>(null);
