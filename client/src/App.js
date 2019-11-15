import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Index from './views/Index/Index';
import Metric from './components/Metric/Metric';

function App() {
  return (
    <div className="App">
      <Router basename={"/grieks"}>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/ilias" exact render={() => <Metric title="ilias" />} />
          <Route path="/odyssee" exact render={() => <Metric title="odyssee" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
