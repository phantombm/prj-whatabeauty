import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
        console.log(error);

        return;
      }

      this.setState({
        validationNumberToMatch: result.validationNumber,
        secondsRemained: 180
      });
    });
  };

  onPressNext = () => {
    if (this.state.validationNumber != this.state.validationNumberToMatch) {
      return;
    }

    this.setState({
      validationNumber: '',
      validationNumberErrorText: 'blank',
      validationNumberToMatch: '',
      secondsRemained: -1
    });

    this.validationNumberRef.clearText('frozen');

    if (this.props.method == 'email') {
      Actions.enteringEmailAndPassword({
        method: this.props.method,
        phoneNumber: this.state.phoneNumber
      });
    }
  };

  validate = () => {
    if (!this.state.phoneNumber) {
      return false;
    }

    if (!this.state.validationNumber) {
      return false;
    }

    if (this.state.phoneNumberErrorText) {
      return false;
    }

    if (this.state.validationNumberErrorText) {
      return false;
    }

    if (this.state.secondsRemained == -1) {
      return false;
    }
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="SMS인증">
        <View style={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 55 }} />
          <View style={{ flex: 140 }}>
            <Input
              ref={(ref) => { this.phoneNumberRef = ref; }}
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
            <Button onPress={this.onPressSendingSms} isActive={!this.state.phoneNumberErrorText} buttonStyle={{ width: 58, height: 22, position: 'absolute', top: 20, right: 0 }} textStyle={{ fontSize: 12 }}>
              { this.state.secondsRemained == -1 ? '전송' : '재전송' }
            </Button>
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
