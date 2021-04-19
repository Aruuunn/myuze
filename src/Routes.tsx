import React from "react";
import { BrowserRouter } from "react-router-dom";

import { MusicPlayerPage } from "./pages";

export function Routes() {
  return (
    <BrowserRouter>
      <MusicPlayerPage />
    </BrowserRouter>
  );
}

export default Routes;
