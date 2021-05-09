import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { MachineOptions } from 'xstate';
import { PlayNextButtonProps, PlayNextButton } from './index';
import {
  MusicPlayerMachineContext,
  MusicPlayerMachineStates,
  MusicPlayerModes,
} from '../../../../machines';
import { renderTestComponent } from '../../../../utils/test-wrapper';

describe('<PlayButton/> should be able to toggle playing state of music player', () => {
  afterEach(cleanup);

  const renderPlayNextButton = (
    props: PlayNextButtonProps,
    configMusicPlayerMachine?: Partial<MachineOptions<any, any>>,
    musicPlayerMachineContext?: MusicPlayerMachineContext,
    initialState?: MusicPlayerMachineStates,
  ) => {
    const { renderResult, ...rest } = renderTestComponent(
      PlayNextButton, props, configMusicPlayerMachine, musicPlayerMachineContext,
      initialState,
    );
    const rootElement = renderResult.getByTestId('play-next-button');
    return {
      ...rest,
      ...renderResult,
      rootElement,
    };
  };

  it('should start playing next song with next index', (done) => {
    const { rootElement } = renderPlayNextButton({ size: 'large' }, {
      services: {
        loadMusic: async (_, event) => {
          expect(event.index).toEqual(1);
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
    });

    act(() => {
      fireEvent.click(rootElement);
    });
  });
});
