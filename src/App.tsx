import React from "react";

import { AudioAPI } from "./common/audio-api";
import { AudioServiceContext } from "./common/audio-service.provider";
import { AudioServiceInterface } from "./common/interfaces/audio.service.interface";
import Routes from "./Routes";

function App() {
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
