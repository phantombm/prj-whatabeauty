import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class EnteringName extends Component {
  static propTypes = {
    method: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  };

  state = {
    name: '',
    nameErrorText: 'blank'
  };

  onPressNext = () => {
    Actions.enteringName({
      method: this.props.method,
      phoneNumber: this.props.phoneNumber,
      email: this.props.email,
      password: this.props.password,
      name: this.state.name
    });
  };

  validate = () => {
    // return true;

    if (this.state.nameErrorText) {
      return false;
    }

    return true;
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="E-mail 계정">
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 30 }} />
          <View style={{ flex: 100 }}>
            <Input
              placeholder="이름입력"
              onChangeText={(text, errorText) => { this.setState({ name: text, nameErrorText: errorText }); }}
            />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ color: '#4990e2', fontSize: 11, textDecorationLine: 'underline' }}>서비스이용약관</Text>
              <Text style={{ color: '#cfcfcf', fontSize: 11 }}>과 </Text>
              <Text style={{ color: '#4990e2', fontSize: 11, textDecorationLine: 'underline' }}>개인정보이용방침</Text>
              <Text style={{ color: '#cfcfcf', fontSize: 11 }}>에 동의합니다.</Text>
            </View>
          </View>
          <View style={{ flex: 70 }}>
            <Button onPress={this.onPressNext} isActive={isValid}>회원가입 완료</Button>
          </View>
          <View style={{ flex: 210 }} />
        </View>
      </Layout>
    );
  }
}
