import '@testing-library/jest-dom';
import { act, cleanup, fireEvent } from '@testing-library/react';
import { PlayNextButton } from './index';
import {
  MusicPlayerModes,
} from '../../../../machines';
import { componentRenderFactory } from '../../../../utils/test-wrapper';

describe('<PlayButton/> should be able to toggle playing state of music player', () => {
  afterEach(cleanup);

  const renderPlayNextButton = componentRenderFactory('play-next-button', PlayNextButton);

  it('should start playing next song with next index', (done) => {
    const { rootElement } = renderPlayNextButton({ size: 'large' }, {
      machines: {
        musicPlayerMachine: {
          config: {
            services: {
              loadMusic: async (_, event) => {
                expect(event.index).toEqual(1);
                done();
              },
            },
          },
          context: {
            mode: MusicPlayerModes.NORMAL,
            index: 0,
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
  });
});
