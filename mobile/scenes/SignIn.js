import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Constants, WebBrowser } from 'expo';
import { Actions } from 'react-native-router-flux';
import { FontAwesome, EvilIcons, Entypo } from '@expo/vector-icons';

import Button from '../components/Button';

export default class SignIn extends Component {
  onPressSignInWithFacebook = async () => {
    const result = await WebBrowser.openBrowserAsync('https://www.facebook.com/v2.10/dialog/oauth?client_id=2053706978190827&redirect_uri=http://localhost/_oauth/facebook');

    console.log(result);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/images/splash_inverted.png')} />
          </View>
          <View style={{ flex: 1 }}>
            <Button backgroundColor="#fcea4e" textColor="#381e1f" icon={<Image source={require('../assets/images/kakaotalk.png')} />}>카카오로 쉬운시작</Button>
            <Button backgroundColor="#dd4b39" marginTop={8} icon={<FontAwesome name="google" size={28} color="#ffffff" />}>구글로 쉬운시작</Button>
            <Button onPress={this.onPressSignInWithFacebook} backgroundColor="#4267b2" marginTop={8} icon={<EvilIcons name="sc-facebook" size={38} color="#ffffff" />}>페이스북으로 쉬운시작</Button>
            <Button onPress={Actions.signInWithEmail} backgroundColor="#fd614d" marginTop={8} icon={<Entypo name="email" size={26} color="#ffffff" />}>이메일로 로그인</Button>
            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
              <Text style={{ fontSize: 12, color: '#cfcfcf' }}>아직 회원이 아니세요? </Text>
              <Text style={{ fontSize: 12, color: '#fd614d' }} onPress={() => { Actions.verificationForPhoneNumberWithSms({ method: 'email' }); }}>회원가입하기</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
