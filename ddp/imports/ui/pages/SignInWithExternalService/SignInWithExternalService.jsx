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
    if (!this.props.isLoginServicesConfigured) {
      return;
    }

    if (Meteor.user()) {
      Meteor.call('signInTokens.insert', Meteor.user().profile, this.props.match.params.uuid);
    }
    else {
      if (this.props.match.params.signInType == 'facebook') {
        Meteor.loginWithFacebook({
          loginStyle: 'redirect'
        });
      }
      else if (this.props.match.params.signInType == 'google') {
        Meteor.loginWithGoogle({
          loginStyle: 'redirect'
        });
      }
    }
  }

  render() {
    if (!Meteor.user()) {
      return (
        <div />
      );
    }

    return (
      <div>로그인이 완료되었습니다. 창을 닫아주세요.</div>
    );
  }
}

export default createContainer(() => {
  return {
    isLoginServicesConfigured: Accounts.loginServicesConfigured() || false
  };
}, SignInWithExternalService);
