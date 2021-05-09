import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { ToggleShufflePlayButton } from './index';
import { MusicPlayerModes } from '../../../../machines';
import { componentRenderFactory } from '../../../../utils/test-wrapper';

describe('<ToggleShufflePlayButton/>', () => {
  afterEach(cleanup);

  const renderPlayNextButton = componentRenderFactory('toggle-shuffle-button', ToggleShufflePlayButton);

  it('should turn on shuffle mode is it is disabled on click', () => {
    const { rootElement, musicPlayerMachineService } = renderPlayNextButton({ size: 'large' }, {
      machines: {
        musicPlayerMachine: {
          context: {
            mode: MusicPlayerModes.NORMAL,
            index: 1,
            currentPlayingMusic: {
              musicDataURL: '',
              createdAt: new Date(),
              title: 'Dope',
              id: 'id',
            },
          },
        },
      },
    });

    act(() => {
      fireEvent.click(rootElement);
    });

    expect(musicPlayerMachineService.state.context.mode === MusicPlayerModes.SHUFFLE).toBe(true);
  });

  it('should turn off shuffle mode is it is enabled on click', () => {
    const { rootElement, musicPlayerMachineService } = renderPlayNextButton({ size: 'large' }, {
      machines: {
        musicPlayerMachine: {
          context: {
            mode: MusicPlayerModes.SHUFFLE,
            index: 1,
            currentPlayingMusic: {
              musicDataURL: '',
              createdAt: new Date(),
              title: 'Dope',
              id: 'id',
            },
          },
        },
      },
    });

    act(() => {
      fireEvent.click(rootElement);
    });

    expect(musicPlayerMachineService.state.context.mode === MusicPlayerModes.NORMAL).toBe(true);
  });
});
