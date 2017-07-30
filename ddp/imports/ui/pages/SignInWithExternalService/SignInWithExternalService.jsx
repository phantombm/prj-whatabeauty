/* eslint "no-undef": "off" */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class SignInWithExternalService extends Component {
  static propTypes = {
    isLoginServicesConfigured: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    if (this.props.isLoginServicesConfigured !== undefined) {
      if (this.props.match.params.signInType == 'facebook') {
        Meteor.loginWithFacebook(() => {
          Meteor.call('signInTokens.insert', Meteor.user().profile, this.props.match.params.uuidV1, () => {
            window.open('', '_self').close();
          });
        });
      }
      else if (this.props.match.params.signInType == 'google') {
        Meteor.loginWithGoogle(() => {
          Meteor.call('signInTokens.insert', Meteor.user().profile, this.props.match.params.uuidV1, () => {
            window.open('', '_self').close();
          });
        });
      }
    }
  }

  render() {
    return (
      <div>창이 자동으로 닫히지 않으면 닫아주세요.</div>
    );
  }
}

export default createContainer(() => {
  return {
    isLoginServicesConfigured: Accounts.loginServicesConfigured() || false
  };
}, SignInWithExternalService);
