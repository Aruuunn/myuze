import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { AlbumCover, AlbumCoverProps } from './index';
import { renderTestComponent } from '../../utils';

const imgURL = 'imageURl';

describe('AlbumCover', () => {
  afterEach(cleanup);

  const renderAlbumCover = (props: AlbumCoverProps) => {
    const { renderResult } = renderTestComponent(AlbumCover, props);
    const rootElement = renderResult.getByTestId('album-cover');
    return ({
      ...renderResult,
      rootElement,
    });
  };

  describe('Should render an shortcode of artist name if imgURL has not been passed', () => {
    const testShortCodeRendered = (props: AlbumCoverProps, expectedTextContent: string) => {
      it(`Should have ${expectedTextContent} text inside`, () => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        const { rootElement } = renderAlbumCover(props);
        expect(rootElement).toHaveTextContent(expectedTextContent);
      });
    };

    testShortCodeRendered({ artistName: 'BTS', musicTitle: 'Dope' }, 'BT');
    testShortCodeRendered({ artistName: 'Ariana Grande', musicTitle: 'One last time' }, 'AG');
    testShortCodeRendered({ artistName: 'X-1-2', musicTitle: 'music' }, 'X1');
    testShortCodeRendered({ musicTitle: 'Crazy Over You' }, 'CO');
  });

  it('Should render an image if imgURL has been passed', () => {
    const { rootElement } = renderAlbumCover({ musicTitle: 'Celebrity', imgURL });
    expect(rootElement).toHaveStyle(`backgroundImage: url(${imgURL})`);
  });
  it('Should render an image if imgURL has been passed', () => {
    const { rootElement } = renderAlbumCover({ musicTitle: 'Celebrity', imgURL, artistName: 'IU' });
    expect(rootElement).toHaveStyle(`backgroundImage: url(${imgURL})`);
  });
});
