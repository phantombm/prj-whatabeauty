import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import LoginWithGoogle from '../../ui/pages/LoginWithGoogle/LoginWithGoogle';
import LoginWithFacebook from '../../ui/pages/LoginWithFacebook/LoginWithFacebook';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/loginWithGoogle" component={LoginWithGoogle} />
      <Route exact path="/loginWithFacebook" component={LoginWithFacebook} />
    </div>
  </Router>
);
