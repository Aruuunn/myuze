import React, { ReactElement } from 'react';

import { interpret } from 'xstate';
import {
  AudioServiceInterface,
  MusicStorageInterface,
  AudioAPI, MusicStorage,
  addMusicPlayListeners,
  musicPlayerMachine,
} from '@open-music-player/core';

import { Routes } from './Routes';
import { AppProvider } from './AppProvider';

function App(): ReactElement {
  const audioService: AudioServiceInterface = new AudioAPI();
  const musicStorage: MusicStorageInterface = new MusicStorage();
  const musicPlayerMachineService = interpret(musicPlayerMachine).start();

  addMusicPlayListeners(musicPlayerMachineService);

  return (
    <>
      <AppProvider
        audioService={audioService}
        musicStorage={musicStorage}
        musicPlayerMachineInterpreter={musicPlayerMachineService}
      >
        <Routes />
      </AppProvider>
    </>
  );
}

export default App;
