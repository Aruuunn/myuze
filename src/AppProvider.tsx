import React, { ReactElement, ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';
import {
  AudioServiceContext,
  MusicStorageContext,
  MusicPlayerInterpreterContext,
} from './providers';
import { AudioServiceInterface, MusicStorageInterface } from './interfaces';
import { musicPlayerService } from './machines';
import './styles';

export interface AppProviderProps {
  children: ReactNode;
  audioService: AudioServiceInterface;
  musicStorage: MusicStorageInterface;
}

export function AppProvider(props: AppProviderProps): ReactElement {
  const { audioService, musicStorage, children } = props;
  return (
    <>
      <MusicPlayerInterpreterContext.Provider value={musicPlayerService}>
        <AudioServiceContext.Provider value={audioService}>
          <MusicStorageContext.Provider value={musicStorage}>
            <BrowserRouter>{children}</BrowserRouter>
          </MusicStorageContext.Provider>
        </AudioServiceContext.Provider>
      </MusicPlayerInterpreterContext.Provider>
    </>
  );
}

export default AppProvider;
