import React, { ReactElement } from 'react';

import { interpret } from 'xstate';
import { AppProvider } from './AppProvider';
import { Routes } from './Routes';
import { AudioServiceInterface, MusicStorageInterface } from './interfaces';
import { AudioAPI, MusicStorage } from './services';
import { addMusicPlayListeners, getMusicPlayerMachine } from './machines';

function App(): ReactElement {
  const audioService: AudioServiceInterface = new AudioAPI();
  const musicStorage: MusicStorageInterface = new MusicStorage();
  const musicPlayerMachine = getMusicPlayerMachine(musicStorage, audioService);
  const musicPlayerMachineService = interpret(musicPlayerMachine).start();

  addMusicPlayListeners(audioService, musicPlayerMachineService);

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
