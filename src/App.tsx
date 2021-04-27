import React, { ReactElement } from 'react';

import { AudioAPI, MusicStorage } from './core/services';
import { AudioServiceContext, MusicStorageContext } from './core/providers';
import {
  AudioServiceInterface,
  MusicStorageInterface,
} from './core/interfaces';
import { Routes } from './Routes';

function App(): ReactElement {
  const audioServiceInstance: AudioServiceInterface = new AudioAPI();
  const musicStorage: MusicStorageInterface = new MusicStorage();

  return (
    <>
      <MusicStorageContext.Provider value={musicStorage}>
        <AudioServiceContext.Provider value={audioServiceInstance}>
          <Routes />
        </AudioServiceContext.Provider>
      </MusicStorageContext.Provider>
    </>
  );
}

export default App;
