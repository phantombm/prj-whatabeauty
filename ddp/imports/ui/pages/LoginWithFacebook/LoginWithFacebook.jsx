import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';

export default class LoginWithFacebook extends Component {
  componentDidMount() {
    const setIntervalId = Meteor.setInterval(() => {
      if (Accounts.loginServicesConfigured()) {
        Meteor.loginWithFacebook({
          loginStyle: 'redirect'
        }, (error) => {
          if (error) {
            throw error;
          }
        });

        Meteor.clearInterval(setIntervalId);
      }
    }, 50);
  }

  render() {
    return (
      <div />
    );
  }
}
