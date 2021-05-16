import { createContext } from 'react';
import { interpret } from 'xstate';
import { musicPlayerMachine } from '../machines';

export const MusicPlayerInterpreterContext = createContext(
  interpret(musicPlayerMachine),
);
