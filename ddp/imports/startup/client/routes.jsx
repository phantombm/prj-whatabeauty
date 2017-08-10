import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import SignInWithExternalService from '../../ui/pages/SignInWithExternalService/SignInWithExternalService';
import Payment from '../../ui/pages/Payment/Payment';
import PaymentCompletion from '../../ui/pages/PaymentCompletion/PaymentCompletion';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/signInWithExternalService/:signInType/:uuidV1" component={SignInWithExternalService} />
      <Route exact path="/payment/:payMethod/:merchantUid/:name/:amount/:buyerEmail/:buyerName/:buyerTel/:buyerAddr" component={Payment} />
      <Route path="/paymentCompletion" component={PaymentCompletion} />
    </div>
  </Router>
);
