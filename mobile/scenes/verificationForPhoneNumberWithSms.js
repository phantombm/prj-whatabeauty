import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class VerificationForCellPhoneNumberWithSms extends Component {
  state = {
    phoneNumber: '',
    validationNumber: ''
  };

  onPressNex = () => {
    global.signUp = {
      phoneNumber: this.state.phoneNumber,
      validationNumber: this.state.validationNumber
    };

    Actions.enteringEmailAndPassword();
  };

  render() {
    return (
      <Layout title="SMS인증">
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 55 }} />
          <View style={{ flex: 140 }}>
            <Input
              placeholder="전화번호"
              keyboardType="numeric"
              validator={(text) => {
                if (/-/.test(text)) {
                  return '-를 제외하고 입력해주세요.';
                }
              }}
              maxLength={11}
              onChangeText={(text) => { this.setState({ phoneNumber: text }); }}
            />
            <Input placeholder="인증번호" keyboardType="numeric" maxLength={6} wrapperStyle={{ marginTop: 5 }} onChangeText={(text) => { this.setState({ validationNumber: text }); }} />
          </View>
          <View style={{ flex: 70 }}>
            <Button onPress={this.onPressNex}>다음</Button>
          </View>
          <View style={{ flex: 210 }} />
        </View>
      </Layout>
    );
  }
}
