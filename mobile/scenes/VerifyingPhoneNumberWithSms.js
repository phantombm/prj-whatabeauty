import React, { Component } from 'react';
import { View, Text, Alert, Keyboard } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Meteor from 'react-native-meteor';
import { EvilIcons } from '@expo/vector-icons';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class VerifyingForCellPhoneNumberWithSms extends Component {
  static propTypes = {
    signInType: PropTypes.string.isRequired
  };

  state = {
    phoneNumber: '',
    phoneNumberErrorText: 'blank',
    validationNumber: '',
    validationNumberErrorText: 'blank',
    validationNumberToMatch: '',
    secondsRemained: -1
  };

  componentDidMount() {
    this.setIntervalId = setInterval(() => {
      if (this.state.secondsRemained < 1) {
        return;
      }

      this.setState((previousState) => {
        return {
          secondsRemained: previousState.secondsRemained - 1
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.setIntervalId);
  }

  onPressSendingSms = () => {
    Meteor.call('sendSms', this.state.phoneNumber, (error, validationNumber) => {
      if (error) {
        Alert.alert(
          'whatabeauty',
          error.reason,
          [{ text: '확인' }],
          { cancelable: false }
        );

        return;
      }

      Alert.alert(
        'whatabeauty',
        `whatabeauty로부터 메세지가 도착했습니다. 인증번호는 [${validationNumber}] 입니다.`,
        [{ text: '확인' }],
        { cancelable: false }
      );

      this.setState({
        validationNumberToMatch: validationNumber,
        secondsRemained: 180
      });
    });
  };

  onPressNext = () => {
    if (this.state.validationNumber != this.state.validationNumberToMatch) {
      Alert.alert(
        'whatabeauty',
        '인증번호가 일치하지 않습니다.',
        [{ text: '확인' }],
        { cancelable: false }
      );

      return;
    }

    this.setState({
      validationNumber: '',
      validationNumberErrorText: 'blank',
      validationNumberToMatch: '',
      secondsRemained: -1
    });

    this.validationNumberRef.setText('');

    Keyboard.dismiss();

    if (this.props.signInType == 'password') {
      Actions.enteringEmailAndPassword({
        phoneNumber: this.state.phoneNumber
      });
    }
    else {
      Meteor.call('users.update', {
        $set: {
          'profile.phoneNumber': this.state.phoneNumber
        }
      });

      Actions.main({
        type: ActionConst.RESET
      });
    }
  };

  validate = () => {
    if (this.state.phoneNumberErrorText) {
      return false;
    }

    if (this.state.validationNumberErrorText) {
      return false;
    }

    if (this.state.secondsRemained < 1) {
      return false;
    }

    return true;
  };

  onPressLeftIcon = () => {
    Keyboard.dismiss();

    if (this.props.signInType != 'password') {
      Meteor.logout();
    }

    Actions.pop();
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="SMS 인증" onPressLeftIcon={this.onPressLeftIcon}>
        <View style={{ flex: 1, padding: 30 }}>
          <View>
            <Input
              placeholder="핸드폰번호"
              keyboardType="numeric"
              validator={(text) => {
                if (/[^0-9]/.test(text)) {
                  return '숫자만 입력해주세요.';
                }

                if (!/^[0-9]{10,11}$/.test(text)) {
                  return '10~11자리로 입력해주세요.';
                }
              }}
              maxLength={11}
              onChangeText={(text, errorText) => { this.setState({ phoneNumber: text, phoneNumberErrorText: errorText, validationNumberToMatch: '' }); }}
            />
            <View style={{ position: 'absolute', top: 20, right: 0 }}>
              <Button
                onPress={this.onPressSendingSms}
                isActive={!this.state.phoneNumberErrorText}
                buttonStyle={{ width: 58, height: 22 }}
                textStyle={{ fontSize: 12 }}
              >{ this.state.secondsRemained == -1 ? '전송' : '재전송' }</Button>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Input
              ref={(ref) => { this.validationNumberRef = ref; }}
              placeholder="인증번호"
              keyboardType="numeric"
              maxLength={6}
              onChangeText={(text, errorText) => { this.setState({ validationNumber: text, validationNumberErrorText: errorText }); }}
            />
            { this.state.secondsRemained > -1 &&
              <View style={{ position: 'absolute', top: 20, right: 10, flexDirection: 'row' }}>
                <EvilIcons name="clock" size={18} color="#3c4f5e" />
                <Text style={{ fontSize: 10, color: this.state.secondsRemained > 10 ? '#3c4f5e' : global.keyColor, marginLeft: 3 }}>{ Math.floor(this.state.secondsRemained / 60) }:{ this.state.secondsRemained % 60 < 10 ? '0' : '' }{ this.state.secondsRemained % 60 }</Text>
              </View>
            }
          </View>
          <Button onPress={this.onPressNext} isActive={isValid} marginTop={30}>{ this.props.signInType == 'password' ? '다음' : '회원가입 완료' }</Button>
        </View>
      </Layout>
    );
  }
}
