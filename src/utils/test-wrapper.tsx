import React, { ReactElement } from 'react';
import {interpret, Interpreter, MachineOptions} from 'xstate';
import { render, RenderResult } from '@testing-library/react';

import { AppProvider } from '../AppProvider';
import { AudioAPI, MusicStorage } from '../services';
import { AudioServiceInterface, MusicStorageInterface } from '../interfaces';
import { getMusicPlayerMachine, MusicPlayerMachineContext, MusicPlayerMachineStates } from '../machines';
import { isTruthy } from './is-truthy.util';

type RenderTestComponentResult = {
  renderResult: RenderResult,
  audioService: AudioServiceInterface,
  musicStorage: MusicStorageInterface,
  musicPlayerMachineService: Interpreter<MusicPlayerMachineContext>,
};

export function renderTestComponent<Props>(
  Component: (props: Props) => ReactElement, props: Props,
  configMusicPlayerMachine?: Partial<MachineOptions<MusicPlayerMachineContext, any>>,
  musicPlayerMachineContext?: MusicPlayerMachineContext,
  initialState?: MusicPlayerMachineStates,
): RenderTestComponentResult {
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
  const musicPlayerMachineService = interpret(musicPlayerMachine).start(initialState ?? MusicPlayerMachineStates.NOT_LOADED);

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
