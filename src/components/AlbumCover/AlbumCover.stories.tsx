import { AlbumCover } from './index';
import '../../styles';

import { storyFactory } from '../../utils';

export default {
  title: 'Album Cover',
  component: AlbumCover,
};

export const AlbumCoverComponent = storyFactory(AlbumCover, {
  artistName: 'Ariana Grande',
});
export const Example1 = storyFactory(AlbumCover, { artistName: 'IU' });
export const Example2 = storyFactory(AlbumCover, { artistName: 'BTS' });
