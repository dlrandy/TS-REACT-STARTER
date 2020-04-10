import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from '@Containers/Home/index.antd';

export default () => (
  <Router>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </React.Suspense>
  </Router>
);
