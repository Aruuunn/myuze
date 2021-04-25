import React, { ReactElement } from 'react';
import { AlbumCover } from './index';
import '../../styles/index.css';
import '../../styles/palette.css';

export default {
  title: 'Album Cover',
  component: AlbumCover,
};

export const AlbumCoverComponent = ({
  artistName,
}: {
  artistName: string;
}): ReactElement => <AlbumCover artistName={artistName} />;

AlbumCoverComponent.args = {
  artistName: 'Ariana Grande',
};

export const Example1 = (): ReactElement => <AlbumCover artistName="IU" />;

export const Example2 = (): ReactElement => <AlbumCover artistName="BTS" />;
