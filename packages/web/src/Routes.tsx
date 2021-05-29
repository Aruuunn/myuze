import React, { ReactElement } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { MusicPlayerPage, HomePage } from './pages';

export function Routes(): ReactElement {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Switch location={location} key={location.pathname}>
        <Route path="/play/:id" exact component={MusicPlayerPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </AnimatePresence>
  );
}

export default Routes;
