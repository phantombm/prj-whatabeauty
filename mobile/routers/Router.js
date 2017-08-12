import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Tutorial from '../scenes/Tutorial';
import SignIn from '../scenes/SignIn';
import VerifyingPhoneNumberWithSms from '../scenes/VerifyingPhoneNumberWithSms';
import EnteringEmailAndPassword from '../scenes/EnteringEmailAndPassword';
import EnteringName from '../scenes/EnteringName';
import SignInWithEmail from '../scenes/SignInWithEmail';
import Main from '../scenes/Main';
import Services from '../scenes/Services';
import Service from '../scenes/Service';
import SelectingServiceQuantity from '../scenes/SelectingServiceQuantity';
import Reserving from '../scenes/Reserving';
import SelectingAddress from '../scenes/SelectingAddress';
import EnteringAddress from '../scenes/EnteringAddress';
import EnteringAddressDetail from '../scenes/EnteringAddressDetail';
import SelectingDateTime from '../scenes/SelectingDateTime';
import WritingMemo from '../scenes/WritingMemo';
import Ssams from '../scenes/Ssams';
import Ssam from '../scenes/Ssam';
import Portfolio from '../scenes/Portfolio';
import Reservation from '../scenes/Reservation';
import Paying from '../scenes/Paying';
import Settings from '../scenes/Settings';
import TermsOfService from '../scenes/TermsOfService';
import PrivacyPolicy from '../scenes/PrivacyPolicy';
import Notices from '../scenes/Notices';
import Notice from '../scenes/Notice';
import Faqs from '../scenes/Faqs';
import Account from '../scenes/Account';
import UpdatingInformation from '../scenes/UpdatingInformation';
import ChangingPassword from '../scenes/ChangingPassword';
import Reservations from '../scenes/Reservations';


export default class _Router extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="tutorial" component={Tutorial} panHandlers={null} />
          <Scene key="signIn" component={SignIn} panHandlers={null} />
          <Scene key="signInWithEmail" component={SignInWithEmail} panHandlers={null} />
          <Scene key="verifyingPhoneNumberWithSms" component={VerifyingPhoneNumberWithSms} panHandlers={null} />
          <Scene key="enteringEmailAndPassword" component={EnteringEmailAndPassword} panHandlers={null} />
          <Scene key="enteringName" component={EnteringName} panHandlers={null} />
          <Scene key="main" component={Main} panHandlers={null} />
          <Scene key="services" component={Services} panHandlers={null} />
          <Scene key="service" component={Service} panHandlers={null} />
          <Scene key="selectingServiceQuantity" component={SelectingServiceQuantity} panHandlers={null} direction="vertical" />
          <Scene key="reserving" component={Reserving} panHandlers={null} />
          <Scene key="selectingAddress" component={SelectingAddress} panHandlers={null} />
          <Scene key="enteringAddress" component={EnteringAddress} panHandlers={null} />
          <Scene key="enteringAddressDetail" component={EnteringAddressDetail} panHandlers={null} />
          <Scene key="selectingDateTime" component={SelectingDateTime} panHandlers={null} />
          <Scene key="writingMemo" component={WritingMemo} panHandlers={null} />
          <Scene key="ssams" component={Ssams} panHandlers={null} />
          <Scene key="ssam" component={Ssam} panHandlers={null} />
          <Scene key="portfolio" component={Portfolio} panHandlers={null} direction="vertical" />
          <Scene key="reservation" component={Reservation} panHandlers={null} />
          <Scene key="paying" component={Paying} panHandlers={null} />
          <Scene key="settings" component={Settings} panHandlers={null} />
          <Scene key="termsOfService" component={TermsOfService} panHandlers={null} />
          <Scene key="privacyPolicy" component={PrivacyPolicy} panHandlers={null} />
          <Scene key="notices" component={Notices} panHandlers={null} />
          <Scene key="notice" component={Notice} panHandlers={null} />
          <Scene key="faqs" component={Faqs} panHandlers={null} />
          <Scene key="account" component={Account} panHandlers={null} />
          <Scene key="updatingInformation" component={UpdatingInformation} panHandlers={null} />
          <Scene key="changingPassword" component={ChangingPassword} panHandlers={null} />
          <Scene key="reservations" component={Reservations} panHandlers={null} />
        </Scene>
      </Router>
    );
  }
}
