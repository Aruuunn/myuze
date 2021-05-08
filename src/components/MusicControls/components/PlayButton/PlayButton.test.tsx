import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { PlayButton, PlayButtonProps } from './index';
import { renderTestComponent } from '../../../../utils';

describe('<PlayButton/> should be able to toggle playing state of music player', () => {
  afterEach(cleanup);

  const renderPlayButton = (props: PlayButtonProps) => {
    const { renderResult, ...rest } = renderTestComponent(PlayButton, props);
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
});
