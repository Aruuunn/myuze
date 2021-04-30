import React, { ReactElement, useState } from 'react';

import { AudioAPI, MusicStorage } from './services';
import {
  AudioServiceContext,
  MusicStorageContext,
  CurrentMusicDetailsContext,
} from './providers';
import {
  AudioServiceInterface,
  MusicDataInterface,
  MusicStorageInterface,
} from './interfaces';
import './machines/music-player.machine';
import { Routes } from './Routes';

function App(): ReactElement {
  const audioServiceInstance: AudioServiceInterface = new AudioAPI();
  const musicStorage: MusicStorageInterface = new MusicStorage();
  const currentMusicState = useState<MusicDataInterface | null>(null);

  return (
    <>
      <AudioServiceContext.Provider value={audioServiceInstance}>
        <MusicStorageContext.Provider value={musicStorage}>
          <CurrentMusicDetailsContext.Provider value={currentMusicState}>
            <Routes />
          </CurrentMusicDetailsContext.Provider>
        </MusicStorageContext.Provider>
      </AudioServiceContext.Provider>
    </>
  );
}

export default App;
