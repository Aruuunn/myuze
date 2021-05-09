import React, { ReactElement } from 'react';
import { interpret, Interpreter, MachineOptions } from 'xstate';
import { render, RenderResult } from '@testing-library/react';

import { AppProvider } from '../AppProvider';
import { AudioAPI } from '../services/audio-api';
import { MusicStorage } from '../services/music-storage';
import { AudioServiceInterface, MusicStorageInterface } from '../interfaces';
import { getMusicPlayerMachine, MusicPlayerMachineContext, MusicPlayerMachineStates } from '../machines';
import { isTruthy } from './is-truthy.util';

type RenderTestComponentResult = {
  renderResult: RenderResult,
  audioService: AudioServiceInterface,
  musicStorage: MusicStorageInterface,
  musicPlayerMachineService: Interpreter<MusicPlayerMachineContext>,
};

jest.mock('../services/audio-api');
jest.mock('../services/music-storage');

export function getMockedServices(
  configMusicPlayerMachine?: Partial<MachineOptions<MusicPlayerMachineContext, any>>,
  musicPlayerMachineContext?: MusicPlayerMachineContext,
  initialState?: MusicPlayerMachineStates,
): Omit<RenderTestComponentResult, 'renderResult'> {
  const audioService = new AudioAPI();
  const musicStorage = new MusicStorage();
  let musicPlayerMachine = getMusicPlayerMachine(musicStorage, audioService);

  if (isTruthy(musicPlayerMachineContext)) {
    musicPlayerMachine = musicPlayerMachine.withContext(musicPlayerMachineContext);
  }

  musicPlayerMachine = musicPlayerMachine.withConfig(configMusicPlayerMachine ?? ({
    services: {
      loadMusic: () => Promise.reject(),
    },
  }));
  const musicPlayerMachineService = interpret(musicPlayerMachine)
    .start(initialState ?? MusicPlayerMachineStates.NOT_LOADED);
  return {
    audioService, musicStorage, musicPlayerMachineService,
  };
}

export function renderTestComponent<Props>(
  Component: (props: Props) => ReactElement, props: Props,
  configMusicPlayerMachine?: Partial<MachineOptions<MusicPlayerMachineContext, any>>,
  musicPlayerMachineContext?: MusicPlayerMachineContext,
  initialState?: MusicPlayerMachineStates,
): RenderTestComponentResult {
  const {
    audioService,
    musicStorage,
    musicPlayerMachineService,
  } = getMockedServices(configMusicPlayerMachine, musicPlayerMachineContext, initialState);
  const renderResult = render(
    <AppProvider
      audioService={audioService}
      musicStorage={musicStorage}
      musicPlayerMachineInterpreter={musicPlayerMachineService}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </AppProvider>,
  );

  return {
    renderResult, audioService, musicStorage, musicPlayerMachineService,
  };
}
