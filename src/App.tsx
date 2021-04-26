import React, { ReactElement } from 'react';

import { AudioAPI } from './core/services';
import { AudioServiceContext } from './core/providers';
import { AudioServiceInterface } from './core/interfaces';
import { Routes } from './Routes';

function App(): ReactElement {
  const audioServiceInstance: AudioServiceInterface = new AudioAPI();

  return (
    <>
      <AudioServiceContext.Provider value={audioServiceInstance}>
        <Routes />
      </AudioServiceContext.Provider>
    </>
  );
}

export default App;
