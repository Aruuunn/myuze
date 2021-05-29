import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { AlbumCover, AlbumCoverProps } from './index';
import { componentRenderFactory, ServiceConfig } from '../../utils/test-wrapper';

const imgURL = 'imageURl';

describe('AlbumCover', () => {
  afterEach(cleanup);

  const serviceConfig: ServiceConfig = {
    machines: {
      musicPlayerMachine: {
      },
    },
  };

  const renderAlbumCover = componentRenderFactory('album-cover', AlbumCover);

  describe('Should render an shortcode of artist name if imgURL has not been passed', () => {
    const testShortCodeRendered = (props: AlbumCoverProps, expectedTextContent: string) => {
      it(`Should have ${expectedTextContent} text inside`, () => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        const { rootElement } = renderAlbumCover(props, serviceConfig);
        expect(rootElement).toHaveTextContent(expectedTextContent);
      });
    };

    testShortCodeRendered({ artistName: 'BTS', musicTitle: 'Dope' }, 'BT');
    testShortCodeRendered({ artistName: 'Ariana Grande', musicTitle: 'One last time' }, 'AG');
    testShortCodeRendered({ artistName: 'X-1-2', musicTitle: 'music' }, 'X1');
    testShortCodeRendered({ musicTitle: 'Crazy Over You' }, 'CO');
  });

  it('Should render an image if imgURL has been passed', () => {
    const { rootElement } = renderAlbumCover({ musicTitle: 'Celebrity', imgURL }, serviceConfig);
    expect(rootElement).toHaveStyle(`backgroundImage: url(${imgURL})`);
  });
  it('Should render an image if imgURL has been passed', () => {
    const { rootElement } = renderAlbumCover({ musicTitle: 'Celebrity', imgURL, artistName: 'IU' }, serviceConfig);
    expect(rootElement).toHaveStyle(`backgroundImage: url(${imgURL})`);
  });
});
