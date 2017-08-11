import React, { Component } from 'react';
import { View, Text, Alert, Animated, Dimensions, Easing } from 'react-native';
import { WebBrowser } from 'expo';
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

  animatedValue = new Animated.Value(0);

  animatedTranslateX = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(Dimensions.get('window').width * 2)],
  });

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.animatedValue, {
        toValue: 1,
        easing: Easing.linear,
        duration: 20 * 1000
      })
    ).start();
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
      <View style={{ flex: 1 }}>
        <Animated.Image source={require('../assets/images/sign_in_background.png')} style={{ width: Dimensions.get('window').width * 3, height: Dimensions.get('window').width * 3 * 187 / 699, transform: [{ translateX: this.animatedTranslateX }] }} />
        <View style={{ flex: 1, padding: 30, justifyContent: 'center' }}>
          <Button onPress={() => { this.onPressSignIn('google'); }} backgroundColor="#dd4b39" icon={<FontAwesome name="google" size={28} color="#ffffff" />}>구글로 쉬운시작</Button>
          <Button onPress={() => { this.onPressSignIn('facebook'); }} backgroundColor="#4267b2" marginTop={8} icon={<EvilIcons name="sc-facebook" size={38} color="#ffffff" />}>페이스북으로 쉬운시작</Button>
          <Button onPress={Actions.signInWithEmail} backgroundColor="#fd614d" marginTop={8} icon={<Entypo name="email" size={26} color="#ffffff" />}>이메일로 로그인</Button>
          <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, color: '#cfcfcf' }}>아직 회원이 아니세요? </Text>
            <Text style={{ fontSize: 12, color: '#fd614d' }} onPress={() => { Actions.verificationForPhoneNumberWithSms({ signInType: 'password' }); }}>회원가입하기</Text>
          </View>
        </View>
      </View>
    );
  }
}
