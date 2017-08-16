import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import Button from '../components/Button';

class BalancedMoney extends Component {
  static propTypes = {
    ssam: ProTypes.object.isRequired
  };

  render() {
    return (
      <Layout title="정산 관리" isKeyboardDismissedOnTouched={false}>
        <View style={{ height: 65, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, color: '#9b9b9b' }}>쌤 등록일 : { moment(this.props.ssam.profile.informationForSsam.registeredAt).format('YYYY년 M월 D일') }</Text>
          <Text style={{ marginTop: 10, fontSize: 12, color: '#4990e2' }}>정산기준표 보기</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Button buttonStyle={{ borderRadius: 0 }} onPress={Actions.updatingBankAccount}>계좌 관리하기</Button>
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    ssam: Meteor.user()
  };
}, BalancedMoney);
