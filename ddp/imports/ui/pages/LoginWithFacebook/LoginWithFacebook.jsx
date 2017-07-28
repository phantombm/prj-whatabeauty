import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';

export default class LoginWithFacebook extends Component {
  state = {
    isSucceeded: false
  };

  componentDidMount() {
    const setIntervalId = Meteor.setInterval(() => {
      if (Meteor.user()) {
        this.setState({
          isSucceeded: true
        });

        Meteor.clearInterval(setIntervalId);

        return;
      }

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
      <div>
        { this.state.isSucceeded &&
          <div style={{ fontSize: '50px', textAlign: 'center', marginTop: '100px' }}>
            로그인에 성공했습니다.<br />
            창을 닫아주세요.
          </div>
        }
      </div>
    );
  }
}
