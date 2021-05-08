import { createContext } from 'react';
import { interpret } from 'xstate';
import { getMusicPlayerMachine } from '../machines';
import { AudioAPI, MusicStorage } from '../services';

const db = new MusicStorage();
const audioService = new AudioAPI();

export const MusicPlayerInterpreterContext = createContext(
  interpret(getMusicPlayerMachine(db, audioService)),
);
