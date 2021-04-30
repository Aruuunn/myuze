import React, { ReactElement } from 'react';

import AppProvider from './AppProvider';
import { Routes } from './Routes';

function App(): ReactElement {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
}

export default App;
