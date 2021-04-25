import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { MusicPlayerPage } from './pages';

export function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <MusicPlayerPage />
    </BrowserRouter>
  );
}

export default Routes;
