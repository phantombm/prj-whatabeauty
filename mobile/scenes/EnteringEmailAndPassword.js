import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class EnteringEmailAndPassword extends Component {
  static propTypes = {
    method: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  };

  state = {
    email: '',
    emailErrorText: 'blank',
    password: '',
    paddwordErrorText: 'blank',
    passwordConfirmed: '',
    passwordConfirmedErrorText: 'blank'
  };

  onPressNext = () => {
    Actions.enteringName({
      method: this.props.method,
      phoneNumber: this.props.phoneNumber,
      email: this.state.email,
      password: this.state.password
    });
  };

  validate = () => {
    return true;

    if (this.state.emailErrorText) {
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
      <Layout title="E-mail 계정">
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 190 }}>
            <Input
              placeholder="이메일주소"
              keyboardType="email-address"
              validator={(text) => {
                if (!/.+@.+\..+/.test(text)) {
                  return '이메일 형식에 맞지 않습니다.';
                }
              }}
              onChangeText={(text, errorText) => { this.setState({ email: text, emailErrorText: errorText }); }}
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
