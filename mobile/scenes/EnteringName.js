import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { Accounts } from 'react-native-meteor';

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
    if (this.props.method == 'email') {
      Accounts.createUser({
        email: this.props.email,
        password: this.props.password,
        profile: {
          name: this.state.name,
          phoneNumber: this.props.phoneNumber
        }
      }, (error) => {
        if (error) {
          if (error.reason == 'Email already exists.') {
            Alert.alert(
              'whatabeauty',
              '이미 존재하는 이메일입니다.',
              [
                {
                  text: '확인'
                }
              ],
              {
                cancelable: false
              }
            );
          }
          else {
            Alert.alert(
              'whatabeauty',
              error.reason,
              [
                {
                  text: '확인'
                }
              ],
              {
                cancelable: false
              }
            );
          }

          return;
        }

        Actions.main({
          type: ActionConst.RESET
        });
      });
    }
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
