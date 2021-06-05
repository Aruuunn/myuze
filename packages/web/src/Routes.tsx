import React, { ReactElement } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { MusicPlayerPage, PlaylistPage, HomePage } from './pages';

export function Routes(): ReactElement {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Switch location={location} key={location.pathname}>
        <Route path="/play/:id" exact component={MusicPlayerPage} />
        <Route path="/p/:pid" exact component={PlaylistPage} />
        <Route path="/" exact component={HomePage} />
        {/* @TODO add not-found route */}
        <Redirect to="/" />
      </Switch>
    </AnimatePresence>
  );
}

export default Routes;
