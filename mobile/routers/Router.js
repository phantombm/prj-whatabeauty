import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Main from '../scenes/Main';
import Tutorial from '../scenes/Tutorial';
import SignIn from '../scenes/SignIn';
import verificationForPhoneNumberWithSms from '../scenes/verificationForPhoneNumberWithSms';
import enteringEmailAndPassword from '../scenes/enteringEmailAndPassword';

export default class _Router extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="tutorialRouter" initial hideNavBar>
            <Scene key="tutorial" component={Tutorial} />
          </Scene>
          <Scene key="mainRouter" hideNavBar>
            <Scene key="signIn" component={SignIn} panHandlers={null} />
            <Scene key="verificationForPhoneNumberWithSms" component={verificationForPhoneNumberWithSms} panHandlers={null} />
            <Scene key="enteringEmailAndPassword" component={enteringEmailAndPassword} panHandlers={null} />
            <Scene key="main" component={Main} panHandlers={null} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
