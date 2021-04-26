import React, { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { MusicPlayerPage, HomePage } from './pages';

export function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <Route path="/play" exact component={MusicPlayerPage} />
      <Route path="/" exact component={HomePage} />
    </BrowserRouter>
  );
}

export default Routes;
