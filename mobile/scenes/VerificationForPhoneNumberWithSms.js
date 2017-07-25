import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Meteor from 'react-native-meteor';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class VerificationForCellPhoneNumberWithSms extends Component {
  static propTypes = {
    method: PropTypes.string.isRequired
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
    Meteor.call('sendSms', this.state.phoneNumber, (error, result) => {
      if (error) {
        Alert.alert(
          '에러',
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

        return;
      }

      Alert.alert(
        'whatabeauty',
        'whatabeauty로부터 메세지가 도착했습니다. 인증번호는 [' + result.validationNumber + '] 입니다.',
        [
          {
            text: '확인'
          }
        ],
        {
          cancelable: false
        }
      );

      this.setState({
        validationNumberToMatch: result.validationNumber,
        secondsRemained: 180
      });
    });
  };

  onPressNext = () => {
    Actions.enteringEmailAndPassword({
      method: this.props.method,
      phoneNumber: this.state.phoneNumber
    });

    if (this.state.validationNumber != this.state.validationNumberToMatch) {
      Alert.alert(
        'whatabeauty',
        '인증번호가 일치하지 않습니다.',
        [
          {
            text: '확인'
          }
        ],
        {
          cancelable: false
        }
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

    if (this.props.method == 'email') {
      Actions.enteringEmailAndPassword({
        method: this.props.method,
        phoneNumber: this.state.phoneNumber
      });
    }
  };

  validate = () => {
    return true;

    if (this.state.phoneNumberErrorText) {
      return false;
    }

    if (this.state.validationNumberErrorText) {
      return false;
    }

    if (this.state.secondsRemained <= 0) {
      return false;
    }

    return true;
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="SMS인증">
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 50 }} />
          <View style={{ flex: 140 }}>
            <Input
              placeholder="전화번호"
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
            <Input
              ref={(ref) => { this.validationNumberRef = ref; }}
              placeholder="인증번호"
              keyboardType="numeric"
              marginTop={5}
              onChangeText={(text, errorText) => { this.setState({ validationNumber: text, validationNumberErrorText: errorText }); }}
            />
            <View style={{ position: 'absolute', top: 19, right: 0 }}>
              <Button onPress={this.onPressSendingSms} isActive={!this.state.phoneNumberErrorText} buttonStyle={{ width: 58, height: 22 }} textStyle={{ fontSize: 12 }}>
                { this.state.secondsRemained == -1 ? '전송' : '재전송' }
              </Button>
            </View>
            { this.state.secondsRemained != -1 &&
              <View style={{ position: 'absolute', top: 77, right: 4, flexDirection: 'row' }}>
                <MaterialCommunityIcons name="clock" size={23} color="#3c4f5e" style={{ marginTop: -3, marginRight: 4 }} />
                <Text style={{ fontSize: 14, color: this.state.secondsRemained > 10 ? '#3c4f5e' : '#fd614d' }}>
                  { Math.floor(this.state.secondsRemained / 60) }:{ this.state.secondsRemained % 60 < 10 ? '0' : '' }{ this.state.secondsRemained % 60 }
                </Text>
              </View>
            }
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
