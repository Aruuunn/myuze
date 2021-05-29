import React, { ReactElement, ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Interpreter } from 'xstate';
import {
  AudioServiceContext,
  MusicStorageContext,
  MusicPlayerInterpreterContext,
  AudioServiceInterface, MusicStorageInterface, MusicPlayerMachineContext,
} from '@open-music-player/core';

import './styles';

export interface AppProviderProps {
  children: ReactNode;
  audioService: AudioServiceInterface;
  musicStorage: MusicStorageInterface;
  musicPlayerMachineInterpreter: Interpreter<MusicPlayerMachineContext>;
}

export function AppProvider(props: AppProviderProps): ReactElement {
  const {
    audioService,
    musicStorage,
    musicPlayerMachineInterpreter,
    children,
  } = props;
  return (
    <>
      <MusicPlayerInterpreterContext.Provider
        value={musicPlayerMachineInterpreter}
      >
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
