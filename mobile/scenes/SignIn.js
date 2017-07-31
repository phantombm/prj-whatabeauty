import React, { Component } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import { Constants, WebBrowser } from 'expo';
import { Actions, ActionConst } from 'react-native-router-flux';
import { FontAwesome, EvilIcons, Entypo } from '@expo/vector-icons';
import Meteor from 'react-native-meteor';
import uuidV1 from 'uuid/v1';

import Button from '../components/Button';

export default class SignIn extends Component {
  constructor() {
    super();

    this.uuidV1 = uuidV1;
  }

  onPressSignIn = async (signInType) => {
    const uuidV1 = this.uuidV1();

    await WebBrowser.openBrowserAsync(`http://${global.ddpServerIp}/signInWithExternalService/${signInType}/${uuidV1}`);

    Meteor.call('signInTokens.findOne', {
      uuidV1: uuidV1
    }, (error, signInToken) => {
      if (error) {
        Alert.alert(
          'whatabeauty',
          error.reason,
          [{ text: '확인' }],
          { cancelable: false }
        );
      }

      if (!signInToken) {
        return;
      }

      Meteor.loginWithPassword(signInToken.signInId, signInToken.uuidV1, (error) => {
        if (error) {
          Alert.alert(
            'whatabeauty',
            error.reason,
            [{ text: '확인' }],
            { cancelable: false }
          );
        }

        if (Meteor.user().profile.phoneNumber) {
          Actions.main({
            type: ActionConst.RESET
          });
        }
        else {
          Actions.verificationForPhoneNumberWithSms({
            signInType: 'external service'
          });
        }
      });
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/images/splash_inverted.png')} style={{ width: 100, height: 100 }} />
          </View>
          <View style={{ flex: 2 }}>
            <Button onPress={() => { this.onPressSignIn('google'); }} backgroundColor="#dd4b39" marginTop={8} icon={<FontAwesome name="google" size={28} color="#ffffff" />}>구글로 쉬운시작</Button>
            <Button onPress={() => { this.onPressSignIn('facebook'); }} backgroundColor="#4267b2" marginTop={8} icon={<EvilIcons name="sc-facebook" size={38} color="#ffffff" />}>페이스북으로 쉬운시작</Button>
            <Button onPress={Actions.signInWithEmail} backgroundColor="#fd614d" marginTop={8} icon={<Entypo name="email" size={26} color="#ffffff" />}>이메일로 로그인</Button>
            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
              <Text style={{ fontSize: 12, color: '#cfcfcf' }}>아직 회원이 아니세요? </Text>
              <Text style={{ fontSize: 12, color: '#fd614d' }} onPress={() => { Actions.verificationForPhoneNumberWithSms({ signInType: 'password' }); }}>회원가입하기</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
