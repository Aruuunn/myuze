import React, { ReactElement } from 'react';

import { render, RenderResult } from '@testing-library/react';
import { AppProvider } from '../AppProvider';
import { AudioAPI, MusicStorage } from '../services';
import { AudioServiceInterface, MusicStorageInterface } from '../interfaces';

type RenderTestComponentResult = {
  renderResult: RenderResult,
  audioService: AudioServiceInterface,
  musicStorage: MusicStorageInterface
};

export function renderTestComponent<Props>(
  Component: (props: Props) => ReactElement, props: Props,
): RenderTestComponentResult {
  const audioService = new AudioAPI();
  const musicStorage = new MusicStorage();

  const renderResult = render(
    <AppProvider audioService={audioService} musicStorage={musicStorage}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </AppProvider>,
  );

  return { renderResult, audioService, musicStorage };
}
