import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class VerificationForCellPhoneNumberWithSms extends Component {
  static propTypes = {
    method: PropTypes.string.isRequired
  };

  state = {
    phoneNumber: '',
    phoneNumberErrorText: '',
    validationNumber: '',
    validationNumberErrorText: ''
  };

  onPressNext = () => {
    if (this.props.method == 'email') {
      Actions.enteringEmailAndPassword({
        method: this.props.method,
        phoneNumber: this.state.phoneNumber,
        validationNumber: this.state.validationNumber
      });
    }
  };

  validate = () => {
    if (!this.state.phoneNumber) {
      return false;
    }

    if (!this.state.validationNumber) {
      return false;
    }

    if (this.state.phoneNumberErrorText) {
      return false;
    }

    if (this.state.validationNumberErrorText) {
      return false;
    }
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="SMS인증">
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 55 }} />
          <View style={{ flex: 140 }}>
            <Input
              placeholder="전화번호"
              keyboardType="numeric"
              validator={(text) => {
                if (/[^0-9]/.test(text)) {
                  return '숫자만 입력해주세요.';
                }

                if (!/^[0-9]{10,11}$/.test(text)) {
                  return '10~11자리로 입력해주세요.';
                }
              }}
              maxLength={11}
              onChangeText={(text, errorText) => { this.setState({ phoneNumber: text, phoneNumberErrorText: errorText }); }}
            />
            <Input
              placeholder="인증번호"
              keyboardType="numeric"
              marginTop={5}
              onChangeText={(text, errorText) => { this.setState({ validationNumber: text, validationNumberErrorText: errorText }); }}
            />
          </View>
          <View style={{ flex: 70 }}>
            <Button onPress={this.onPressNext} isActive={isValid}>다음</Button>
          </View>
          <View style={{ flex: 210 }} />
        </View>
      </Layout>
    );
  }
}
