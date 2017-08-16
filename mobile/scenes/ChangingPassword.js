import React, { Component } from 'react';
import { View, Alert, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Accounts } from 'react-native-meteor';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class ChangingPassword extends Component {
  state = {
    oldPassword: '',
    oldPasswordErrorText: 'blank',
    password: '',
    paddwordErrorText: 'blank',
    passwordConfirmed: '',
    passwordConfirmedErrorText: 'blank'
  };

  onPressChangingPassword = () => {
    Accounts.changePassword(this.state.oldPassword, this.state.password, (error) => {
      if (error) {
        if (error.reason == 'Incorrect password') {
          Alert.alert(
            'whatabeauty',
            '패스워드가 틀립니다.',
            [{ text: '확인' }],
            { cancelable: false }
          );
        }

        return;
      }

      Alert.alert(
        'whatabeauty',
        '패스워드가 변경되었습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              Keyboard.dismiss();

              Actions.pop();
            }
          }
        ],
        { cancelable: false }
      );
    });
  };

  validate = () => {
    if (this.state.oldPasswordErrorText) {
      return false;
    }

    if (this.state.paddwordErrorText) {
      return false;
    }

    if (this.state.passwordConfirmedErrorText) {
      return false;
    }

    return true;
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="비밀번호 재설정">
        <View style={{ flex: 1, padding: 30 }}>
          <Input
            placeholder="현재 비밀번호"
            secureTextEntry
            onChangeText={(text, errorText) => { this.setState({ oldPassword: text, oldPasswordErrorText: errorText }); }}
          />
          <Input
            placeholder="비밀번호"
            validator={(text) => {
              if (text.length < 6) {
                return '비밀번호는 6자 이상으로 해주세요.';
              }
            }}
            marginTop={5}
            secureTextEntry
            onChangeText={(text, errorText) => { this.setState({ password: text, paddwordErrorText: errorText }); }}
          />
          <Input
            placeholder="비밀번호 확인"
            validator={(text) => {
              if (text != this.state.password) {
                return '비밀번호가 일치하지 않습니다.';
              }
            }}
            marginTop={5}
            secureTextEntry
            onChangeText={(text, errorText) => { this.setState({ passwordConfirmed: text, passwordConfirmedErrorText: errorText }); }}
          />
          <Button onPress={this.onPressChangingPassword} isActive={isValid} marginTop={30}>변경하기</Button>
        </View>
      </Layout>
    );
  }
}
