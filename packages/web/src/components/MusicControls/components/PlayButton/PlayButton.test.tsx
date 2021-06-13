import '@testing-library/jest-dom';
import { cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { PlayButton } from './index';
import {
  MusicPlayerMachineContext,
  MusicPlayerMachineStates,
  MusicPlayerModes,
} from '../../../../../../core/src/machines';
import { componentRenderFactory } from '../../../../test-wrapper';

describe('<PlayButton/> should be able to toggle playing state of music player', () => {
  afterEach(cleanup);

  const mockMusicPlayerMachineContext: MusicPlayerMachineContext = {
    mode: MusicPlayerModes.NORMAL,
    index: 0,
    currentPlayingMusic: {
      musicDataURL: '',
      createdAt: new Date(),
      title: 'Dope',
      id: 'id',
    },
  };

  const renderPlayButton = componentRenderFactory('play-button', PlayButton);

  it('should be disabled initially', () => {
    const { rootElement } = renderPlayButton(
      { size: 'large' },
      { machines: { musicPlayerMachine: {} } },
    );
    expect(rootElement).toBeDisabled();
  });

  it('should be enabled if current playing music is not null', () => {
    const { rootElement } = renderPlayButton(
      { size: 'large' },
      {
        machines: {
          musicPlayerMachine: {
            context: mockMusicPlayerMachineContext,
          },
        },
      },
    );

    expect(rootElement).not.toBeDisabled();
  });

  it('machine state should go to paused state on click from playing state', (done) => {
    const { rootElement } = renderPlayButton(
      { size: 'large' },
      {
        machines: {
          musicPlayerMachine: {
            config: {
              services: {
                pauseMusic: async () => {
                  done();
                },
              },
            },
            context: mockMusicPlayerMachineContext,
            initialState: MusicPlayerMachineStates.PLAYING,
          },
        },
      },
    );

    act(() => {
      fireEvent.click(rootElement);
    });
  });

  it('machine state should go to playing state on click from paused state', (done) => {
    const { rootElement } = renderPlayButton(
      { size: 'large' },
      {
        machines: {
          musicPlayerMachine: {
            config: {
              services: {
                playMusic: async () => {
                  done();
                },
              },
            },
            context: mockMusicPlayerMachineContext,
            initialState: MusicPlayerMachineStates.PAUSED,
          },
        },
      },
    );

    act(() => {
      fireEvent.click(rootElement);
    });
  });
});
