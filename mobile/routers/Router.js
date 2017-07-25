import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Main from '../scenes/Main';
import Tutorial from '../scenes/Tutorial';
import SignIn from '../scenes/SignIn';
import VerificationForPhoneNumberWithSms from '../scenes/VerificationForPhoneNumberWithSms';
import EnteringEmailAndPassword from '../scenes/EnteringEmailAndPassword';
import EnteringName from '../scenes/EnteringName';
import SignInWithEmail from '../scenes/SignInWithEmail';

export default class _Router extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="tutorial" component={Tutorial} panHandlers={null} />
          <Scene key="signIn" component={SignIn} panHandlers={null} />
          <Scene key="signInWithEmail" component={SignInWithEmail} panHandlers={null} />
          <Scene key="verificationForPhoneNumberWithSms" component={VerificationForPhoneNumberWithSms} panHandlers={null} />
          <Scene key="enteringEmailAndPassword" component={EnteringEmailAndPassword} panHandlers={null} />
          <Scene key="enteringName" component={EnteringName} panHandlers={null} />
          <Scene key="main" component={Main} panHandlers={null} />
        </Scene>
      </Router>
    );
  }
}
