import { createContext } from 'react';
import { Interpreter } from 'xstate';
import { MusicPlayerMachineContext, musicPlayerService } from '../machines/music-player.machine';

export const MusicPlayerInterpreterContext = createContext<Interpreter<MusicPlayerMachineContext>>(
  musicPlayerService,
);
