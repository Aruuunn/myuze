import React from 'react';
import { Slider } from "./components/slider"

function App() {
  return (
    <div>
      <Slider maxValue={300} currentValue={10} />
    </div>
  );
}

export default App;
