import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Ilias from './views/Ilias/Ilias';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/ilias" exact component={Ilias} />
      </Router>
    </div>
  );
}

export default App;
