import '@testing-library/jest-dom';
import { cleanup, fireEvent } from '@testing-library/react';
import { MachineOptions } from 'xstate';
import { act } from 'react-dom/test-utils';
import { PlayButton, PlayButtonProps } from './index';
import {
  MusicPlayerMachineContext,
  MusicPlayerMachineStates,
  MusicPlayerModes,
} from '../../../../machines';
import { renderTestComponent } from '../../../../utils/test-wrapper';

describe('<PlayButton/> should be able to toggle playing state of music player', () => {
  afterEach(cleanup);

  const renderPlayButton = (
    props: PlayButtonProps,
    configMusicPlayerMachine?: Partial<MachineOptions<any, any>>,
    musicPlayerMachineContext?: MusicPlayerMachineContext,
    initialState?: MusicPlayerMachineStates,
  ) => {
    const { renderResult, ...rest } = renderTestComponent(
      PlayButton, props, configMusicPlayerMachine, musicPlayerMachineContext,
      initialState,
    );
    const rootElement = renderResult.getByTestId('play-button');
    return {
      ...rest,
      ...renderResult,
      rootElement,
    };
  };

  it('should be disabled initially', () => {
    const { rootElement } = renderPlayButton({ size: 'large' });
    expect(rootElement).toBeDisabled();
  });

  it('should be enabled if current playing music is not null', () => {
    const { rootElement } = renderPlayButton({ size: 'large' }, {}, {
      mode: MusicPlayerModes.NORMAL,
      index: 0,
      currentPlayingMusic: {
        musicDataURL: '',
        createdAt: new Date(),
        title: 'Dope',
        id: 'id',
      },
    });

    expect(rootElement).not.toBeDisabled();
  });

  it('machine state should go to paused state on click from playing state', (done) => {
    const { rootElement } = renderPlayButton({ size: 'large' }, {
      services: {
        pauseMusic: async () => {
          done();
        },
      },
    }, {
      mode: MusicPlayerModes.NORMAL,
      index: 0,
      currentPlayingMusic: {
        musicDataURL: '',
        createdAt: new Date(),
        title: 'Dope',
        id: 'id',
      },
    }, MusicPlayerMachineStates.PLAYING);

    act(() => {
      fireEvent.click(rootElement);
    });
  });

  it('machine state should go to playing state on click from paused state', (done) => {
    const { rootElement } = renderPlayButton({ size: 'large' }, {
      services: {
        playMusic: async () => {
          done();
        },
      },
    }, {
      mode: MusicPlayerModes.NORMAL,
      index: 0,
      currentPlayingMusic: {
        musicDataURL: '',
        createdAt: new Date(),
        title: 'Dope',
        id: 'id',
      },
    }, MusicPlayerMachineStates.PAUSED);

    act(() => {
      fireEvent.click(rootElement);
    });
  });
});
