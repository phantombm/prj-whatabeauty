import React, { Component } from 'react';
import { View, Alert, Keyboard } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import MagnetView from "../components/MagnetView";

class UpdatingBankAccount extends Component {
  static propTypes = {
    ssam: ProTypes.object.isRequired
  };

  state = {
    bank: this.props.ssam.profile.informationForSsam.bankAccount.bank,
    bankErrorText: this.props.ssam.profile.informationForSsam.bankAccount.bank ? '' : 'blank',
    bankAccountNumber: this.props.ssam.profile.informationForSsam.bankAccount.number,
    bankAccountNumberErrorText: this.props.ssam.profile.informationForSsam.bankAccount.number ? '' : 'blank',
    bankAccountOwner: this.props.ssam.profile.informationForSsam.bankAccount.owner,
    bankAccountOwnerErrorText: this.props.ssam.profile.informationForSsam.bankAccount.owner ? '' : 'blank'
  };

  validate = () => {
    if (this.state.bankAccountNumberErrorText != 'blank' && this.state.bankAccountNumberErrorText) {
      return false;
    }

    return true;
  };

  onPressUpdatingBankAccount = () => {
    Keyboard.dismiss();

    Meteor.call('users.update', {
      $set: {
        'profile.informationForSsam.bankAccount.bank': this.state.bank,
        'profile.informationForSsam.bankAccount.number': this.state.bankAccountNumber,
        'profile.informationForSsam.bankAccount.owner': this.state.bankAccountOwner
      }
    }, (error) => {
      if (error) {
        Alert.alert(
          'whatabeauty',
          error.reason,
          [{ text: '확인' }],
          { cancelable: false }
        );

        return;
      }

      Actions.pop();
    });
  };

  render() {
    const isValid = this.validate();

    const bankAccount = this.props.ssam.profile.informationForSsam.bankAccount;

    return (
      <Layout title="계좌 관리">
        <View style={{ flex: 1, padding: 30 }}>
          <Input
            placeholder="은행명"
            onChangeText={(text, errorText) => { this.setState({ bank: text, bankErrorText: errorText }); }}
            defaultValue={bankAccount.bank}
          />
          <Input
            placeholder="계좌번호"
            onChangeText={(text, errorText) => { this.setState({ bankAccountNumber: text, bankAccountNumberErrorText: errorText }); }}
            keyboardType="numeric"
            validator={(text) => {
              if (/[^0-9]/.test(text)) {
                return '숫자만 입력해주세요.';
              }
            }}
            marginTop={5}
            defaultValue={bankAccount.number}
          />
          <Input
            placeholder="예금주"
            onChangeText={(text, errorText) => { this.setState({ bankAccountOwner: text, bankAccountOwnerErrorText: errorText }); }}
            marginTop={5}
            defaultValue={bankAccount.owner}
          />
        </View>
        <MagnetView>
          <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressUpdatingBankAccount} isActive={isValid}>저장하기</Button>
        </MagnetView>
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    ssam: Meteor.user()
  };
}, UpdatingBankAccount);
