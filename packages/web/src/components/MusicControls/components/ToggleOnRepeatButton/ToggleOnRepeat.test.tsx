import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { ToggleOnRepeatButton } from './index';
import { MusicPlayerModes } from '../../../../../../core/src/machines';
import { componentRenderFactory } from '../../../../test-wrapper';

describe('<ToggleOnRepeatButton/>', () => {
  afterEach(cleanup);

  const renderPlayNextButton = componentRenderFactory('toggle-on-repeat-button', ToggleOnRepeatButton);

  it('should turn on on-repeat mode is it is disabled on click', () => {
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

    expect(musicPlayerMachineService.state.context.mode === MusicPlayerModes.ON_REPEAT).toBe(true);
  });

  it('should turn off on-repeat mode is it is enabled on click', () => {
    const { rootElement, musicPlayerMachineService } = renderPlayNextButton({ size: 'large' }, {
      machines: {
        musicPlayerMachine: {
          context: {
            mode: MusicPlayerModes.ON_REPEAT,
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
