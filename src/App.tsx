import React, { ReactElement, useState } from 'react';

import { AudioAPI, MusicStorage } from './core/services';
import {
  AudioServiceContext,
  MusicStorageContext,
  CurrentMusicDetailsContext,
  CurrentMusicDetails,
} from './core/providers';
import {
  AudioServiceInterface,
  MusicStorageInterface,
} from './core/interfaces';
import { Routes } from './Routes';

function App(): ReactElement {
  const audioServiceInstance: AudioServiceInterface = new AudioAPI();
  const musicStorage: MusicStorageInterface = new MusicStorage();
  const currentMusicState = useState<CurrentMusicDetails>(null);

  return (
    <>
      <MusicStorageContext.Provider value={musicStorage}>
        <AudioServiceContext.Provider value={audioServiceInstance}>
          <CurrentMusicDetailsContext.Provider value={currentMusicState}>
            <Routes />
          </CurrentMusicDetailsContext.Provider>
        </AudioServiceContext.Provider>
      </MusicStorageContext.Provider>
    </>
  );
}

export default App;
