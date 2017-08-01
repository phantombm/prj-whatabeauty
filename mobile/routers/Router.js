import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Tutorial from '../scenes/Tutorial';
import SignIn from '../scenes/SignIn';
import VerificationForPhoneNumberWithSms from '../scenes/VerificationForPhoneNumberWithSms';
import EnteringEmailAndPassword from '../scenes/EnteringEmailAndPassword';
import EnteringName from '../scenes/EnteringName';
import SignInWithEmail from '../scenes/SignInWithEmail';
import Main from '../scenes/Main';
import Services from '../scenes/Services';
import Service from '../scenes/Service';
import Reserving from '../scenes/Reserving';
import SelectingServiceQuantity from '../scenes/SelectingServiceQuantity';

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
          <Scene key="services" component={Services} panHandlers={null} />
          <Scene key="service" component={Service} panHandlers={null} />
          <Scene key="reserving" component={Reserving} panHandlers={null} />
          <Scene key="selectingServiceQuantity" component={SelectingServiceQuantity} panHandlers={null} direction="vertical" />
        </Scene>
      </Router>
    );
  }
}
