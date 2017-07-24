import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

import Button from '../components/Button';

export default class SignIn extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fd614d' }}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 32, color: '#ffffff' }}>What a beauty</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Button buttonStyle={{ backgroundColor: '#ffffff', marginTop: 5 }} textStyle={{ color: '#fd614d' }}>카카오로 쉬운시작</Button>
            <Button buttonStyle={{ backgroundColor: '#ffffff', marginTop: 5 }} textStyle={{ color: '#fd614d' }}>페이스북으로 쉬운시작</Button>
            <Button buttonStyle={{ backgroundColor: '#ffffff', marginTop: 5 }} textStyle={{ color: '#fd614d' }}>구글로 쉬운시작</Button>
            <Button buttonStyle={{ backgroundColor: '#ffffff', marginTop: 5 }} textStyle={{ color: '#fd614d' }}>이메일로 로그인</Button>
            <Button onPress={() => { Actions.verificationForPhoneNumberWithSms({ method: 'email' }); }} buttonStyle={{ backgroundColor: '#ffffff', marginTop: 5 }} textStyle={{ color: '#fd614d' }}>회원가입</Button>
          </View>
        </View>
      </View>
    );
  }
}
