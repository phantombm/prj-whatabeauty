import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Meteor, { Accounts } from 'react-native-meteor';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class EnteringName extends Component {
  static propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  };

  state = {
    name: '',
    nameErrorText: 'blank'
  };

  onPressSignInWithEmail = () => {
    Accounts.createUser({
      email: this.props.email,
      password: this.props.password,
      profile: {
        name: this.state.name,
        email: this.props.email,
        phoneNumber: this.props.phoneNumber
      }
    }, (error) => {
      if (error) {
        if (error.reason == 'Email already exists.') {
          Alert.alert(
            'whatabeauty',
            '이미 존재하는 이메일입니다.',
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

      Meteor.loginWithPassword(this.props.email, this.props.password, (error) => {
        if (error) {
          Alert.alert(
            'whatabeauty',
            error.reason,
            [{ text: '확인' }],
            { cancelable: false }
          );

          Actions.signIn({
            type: ActionConst.RESET
          });

          return;
        }

        Actions.main({
          type: ActionConst.RESET
        });
      });
    });
  };

  validate = () => {
    if (this.state.nameErrorText) {
      return false;
    }

    return true;
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="이름 입력">
        <View style={{ flex: 1, padding: 30 }}>
          <Input
            placeholder="이름"
            onChangeText={(text, errorText) => { this.setState({ name: text, nameErrorText: errorText }); }}
          />
          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <Text style={{ color: '#4990e2', fontSize: 11, textDecorationLine: 'underline' }} onPress={Actions.termsOfService}>서비스 이용약관</Text>
            <Text style={{ color: '#cfcfcf', fontSize: 11 }}>과 </Text>
            <Text style={{ color: '#4990e2', fontSize: 11, textDecorationLine: 'underline' }} onPress={Actions.privacyPolicy}>개인정보 이용방침</Text>
            <Text style={{ color: '#cfcfcf', fontSize: 11 }}>에 동의합니다.</Text>
          </View>
          <Button onPress={this.onPressSignInWithEmail} isActive={isValid} marginTop={20}>회원가입 완료</Button>
        </View>
      </Layout>
    );
  }
}
