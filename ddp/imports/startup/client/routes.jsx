import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import SignInWithExternalService from '../../ui/pages/SignInWithExternalService/SignInWithExternalService';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/signInWithExternalService/:signInType/:uuidV1" component={SignInWithExternalService} />
    </div>
  </Router>
);
