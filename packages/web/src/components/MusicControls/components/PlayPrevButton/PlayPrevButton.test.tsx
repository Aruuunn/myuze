import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { PlayPrevButton } from './index';
import {
  MusicPlayerModes,
} from '../../../../machines';
import { componentRenderFactory } from '../../../../utils/test-wrapper';

describe('<PlayPrevButton/> should be able to play prev song', () => {
  afterEach(cleanup);

  const renderPlayNextButton = componentRenderFactory('play-prev-button', PlayPrevButton);

  it('should start playing song with prev index or else start from last', () => {
    let index = -1;
    const { rootElement } = renderPlayNextButton({ size: 'large' }, {
      machines: {
        musicPlayerMachine: {
          config: {
            services: {
              loadMusic: async (_, event) => {
                index = event.index;
              },
            },
          },
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

    expect(index).toEqual(0);
  });
});
