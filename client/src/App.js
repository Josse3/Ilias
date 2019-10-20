import React, { useState } from 'react';
import './App.css';

import Toolbar from './components/Toolbar/Toolbar';
import Reader from './components/Reader/Reader';

function App() {
  const [userInput, setUserInput] = useState({}); // User input, to be received from Toolbar component
  const [visualPreference, setVisualPreference] = useState({}); // User's visual preference, to be received from Toolbar component

  return (
    <div className="App">
      <Toolbar
        transportUserInput={setUserInput}
        updateVisualPreference={setVisualPreference}
      />
      <Reader
        userInput={userInput}
        visualPreference={visualPreference}
      />
    </div>
  );
}

export default App;
