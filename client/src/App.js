import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Index from './views/Index/Index';
import Ilias from './views/Ilias/Ilias';
import Odyssee from './views/Odyssee/Odyssee';

function App() {
  return (
    <div className="App">
      <Router basename={"/grieks"}>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/ilias" exact component={Ilias} />
          <Route path="/odyssee" exact component={Odyssee} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
