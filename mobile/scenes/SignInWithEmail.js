import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Meteor from 'react-native-meteor';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class SignInWithEmail extends Component {
  state = {
    email: '',
    emailErrorText: 'blank',
    password: '',
    paddwordErrorText: 'blank'
  };

  onPressSignInWithEmail = () => {
    Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
      if (error) {
        if (error.reason == 'User not found') {
          Alert.alert(
            'whatabeauty',
            '존재하지 않는 이메일입니다.',
            [{ text: '확인' }],
            { cancelable: false }
          );
        }
        else if (error.reason == 'Incorrect password') {
          Alert.alert(
            'whatabeauty',
            '비밀번호가 틀립니다.',
            [{ text: '확인' }],
            { cancelable: false }
          );
        }
        else {
          Alert.alert(
            'whatabeauty',
            error.reason,
            [{ text: '확인' }],
            { cancelable: false }
          );
        }

        return;
      }

      Actions.main({
        type: ActionConst.RESET
      });
    });
  };

  validate = () => {
    if (this.state.emailErrorText) {
      return false;
    }

    if (this.state.paddwordErrorText) {
      return false;
    }

    return true;
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="로그인">
        <View style={{ flex: 1, padding: 30 }}>
          <Input
            placeholder="이메일주소"
            keyboardType="email-address"
            validator={(text) => {
              if (!/[a-z0-1]+@[a-z0-1]+\.[a-z]+/.test(text)) {
                return '이메일 형식에 맞지 않습니다.';
              }
            }}
            maxLength={40}
            onChangeText={(text, errorText) => { this.setState({ email: text, emailErrorText: errorText }); }}
          />
          <Input
            placeholder="비밀번호"
            marginTop={5}
            secureTextEntry
            onChangeText={(text, errorText) => { this.setState({ password: text, paddwordErrorText: errorText }); }}
          />
          <Button onPress={this.onPressSignInWithEmail} isActive={isValid} marginTop={30}>로그인</Button>
          <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, color: '#cfcfcf' }}>비밀번호를 잃어버리셨습니까? </Text>
            <Text style={{ fontSize: 12, color: global.keyColor }}>비밀번호 찾기</Text>
          </View>
        </View>
      </Layout>
    );
  }
}
