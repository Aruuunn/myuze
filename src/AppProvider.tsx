import React, { ReactElement, ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { AudioAPI, MusicStorage } from './services';
import {
  AudioServiceContext,
  MusicStorageContext,
  MusicPlayerInterpreterContext,
} from './providers';
import { AudioServiceInterface, MusicStorageInterface } from './interfaces';
import { musicPlayerService } from './machines';

function AppProvider({ children }: { children: ReactNode }): ReactElement {
  const audioServiceInstance: AudioServiceInterface = new AudioAPI();
  const musicStorage: MusicStorageInterface = new MusicStorage();

  return (
    <>
      <MusicPlayerInterpreterContext.Provider value={musicPlayerService}>
        <AudioServiceContext.Provider value={audioServiceInstance}>
          <MusicStorageContext.Provider value={musicStorage}>
            <BrowserRouter>{children}</BrowserRouter>
          </MusicStorageContext.Provider>
        </AudioServiceContext.Provider>
      </MusicPlayerInterpreterContext.Provider>
    </>
  );
}

export default AppProvider;
