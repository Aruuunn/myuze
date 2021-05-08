import React, { ReactElement } from 'react';

import { AppProvider } from './AppProvider';
import { Routes } from './Routes';
import { AudioServiceInterface, MusicStorageInterface } from './interfaces';
import { AudioAPI, MusicStorage } from './services';

function App(): ReactElement {
  const audioService: AudioServiceInterface = new AudioAPI();
  const musicStorage: MusicStorageInterface = new MusicStorage();

  return (
    <>
      <AppProvider audioService={audioService} musicStorage={musicStorage}>
        <Routes />
      </AppProvider>
    </>
  );
}

export default App;
