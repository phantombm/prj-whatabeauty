import React, { Component } from 'react';
import { View, Text, Alert, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Meteor from 'react-native-meteor';
import { EvilIcons } from '@expo/vector-icons';

import Button from '../components/Button';
import Layout from '../layouts/Layout';
import Input from '../components/Input';

export default class UpdatingInformation extends Component {
  state = {
    name: Meteor.user().profile.name,
    nameErrorText: '',
    email: Meteor.user().profile.email,
    emailErrorText: '',
    phoneNumber: Meteor.user().profile.phoneNumber,
    phoneNumberErrorText: '',
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

  onPressUpdatingInformation = () => {
    if (this.state.validationNumber != this.state.validationNumberToMatch) {
      Alert.alert(
        'whatabeauty',
        '인증번호가 일치하지 않습니다.',
        [{ text: '확인' }],
        { cancelable: false }
      );

      return;
    }

    Meteor.call('users.update', {
      $set: {
        'profile.name': this.state.name,
        'profile.email': this.state.email,
        'profile.phoneNumber': this.state.phoneNumber
      }
    });

    Actions.pop();
  };

  validate = () => {
    if (this.state.nameErrorText) {
      return false;
    }

    if (this.state.emailErrorText) {
      return false;
    }

    if (this.state.phoneNumberErrorText) {
      return false;
    }

    if (this.state.phoneNumber != Meteor.user().profile.phoneNumber) {
      if (this.state.validationNumberErrorText) {
        return false;
      }

      if (this.state.secondsRemained < 1) {
        return false;
      }
    }

    if (this.state.name == Meteor.user().profile.name && this.state.email == Meteor.user().profile.email && this.state.phoneNumber == Meteor.user().profile.phoneNumber) {
      return false;
    }

    return true;
  };

  onPressLeftIcon = () => {
    Keyboard.dismiss();

    Actions.pop();
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="내 정보" onPressLeftIcon={this.onPressLeftIcon}>
        <View style={{ flex: 1, padding: 30 }}>
          <Input
            placeholder="이름"
            onChangeText={(text, errorText) => { this.setState({ name: text, nameErrorText: errorText }); }}
            defaultValue={Meteor.user().profile.name}
          />
          <Input
            placeholder="이메일주소"
            keyboardType="email-address"
            validator={(text) => {
              if (!/^[a-z0-9]+@[a-z]+\.[a-z]+$/.test(text)) {
                return '이메일 형식에 맞지 않습니다.';
              }
            }}
            onChangeText={(text, errorText) => { this.setState({ email: text, emailErrorText: errorText }); }}
            defaultValue={Meteor.user().profile.email}
            isActive={Meteor.user().profile.signInType == 'password' ? true : false}
          />
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
              marginTop={5}
              maxLength={11}
              onChangeText={(text, errorText) => { this.setState({ phoneNumber: text, phoneNumberErrorText: errorText, validationNumberToMatch: '' }); }}
              defaultValue={Meteor.user().profile.phoneNumber}
            />
            { this.state.phoneNumber != Meteor.user().profile.phoneNumber &&
              <View style={{ position: 'absolute', top: 20, right: 0 }}>
                <Button
                  onPress={this.onPressSendingSms}
                  isActive={!this.state.phoneNumberErrorText}
                  buttonStyle={{ width: 58, height: 22 }}
                  textStyle={{ fontSize: 12 }}
                >{ this.state.secondsRemained == -1 ? '전송' : '재전송' }</Button>
              </View>
            }
          </View>
          <View style={{ marginTop: 5 }}>
            { this.state.phoneNumber != Meteor.user().profile.phoneNumber &&
              <Input
                ref={(ref) => { this.validationNumberRef = ref; }}
                placeholder="인증번호"
                keyboardType="numeric"
                maxLength={6}
                onChangeText={(text, errorText) => { this.setState({ validationNumber: text, validationNumberErrorText: errorText }); }}
              />
            }
            { this.state.secondsRemained != -1 &&
              <View style={{ position: 'absolute', top: 20, right: 10 }}>
                { this.state.phoneNumber != Meteor.user().profile.phoneNumber &&
                  <View style={{ flexDirection: 'row' }}>
                    <EvilIcons name="clock" size={18} color="#3c4f5e" />
                    <Text style={{ fontSize: 10, color: this.state.secondsRemained > 10 ? '#3c4f5e' : global.keyColor, marginLeft: 3 }}>{ Math.floor(this.state.secondsRemained / 60) }:{ this.state.secondsRemained % 60 < 10 ? '0' : '' }{ this.state.secondsRemained % 60 }</Text>
                  </View>
                }
              </View>
            }
          </View>
          <Button onPress={this.onPressUpdatingInformation} isActive={isValid} marginTop={30}>수정하기</Button>
        </View>
      </Layout>
    );
  }
}
