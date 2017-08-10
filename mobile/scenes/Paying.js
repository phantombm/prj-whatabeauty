import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import Meteor from 'react-native-meteor';
import { Actions, ActionConst } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { WebBrowser } from 'expo';
import _ from 'lodash';
import { FontAwesome, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

export default class Paying extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired,
    ssam: PropTypes.object.isRequired,
    totalAmount: PropTypes.number.isRequired
  };

  onPressPaying = (paymentMethod) => {
    const service = _.clone(this.props.service);

    service.scheduledAt = service.scheduledAt.toDate();

    const reservation = {
      userId: Meteor.userId(),
      ssamId: this.props.ssam._id,
      service: service,
      price: {
        amount: this.props.totalAmount,
        unit: this.props.service.price.unit
      },
      balancedMoney: {
        amount: 0,
        unit: '원'
      },
      isBalanced: false,
      progress: 'not paid',
      createAt: new Date()
    };

    Meteor.call('reservations.insert', reservation, async (error, reservationId) => {
      if (error) {
        Alert.alert(
          'whatabeauty',
          error.reason,
          [{ text: '확인' }],
          { cancelable: false }
        );

        return;
      }

      Meteor.subscribe('reservations', {
        _id: reservationId
      });

      const merchantUid = `${Meteor.userId()}_${reservationId}`;

      const encodedUri = encodeURI(`http://${global.ddpServerIp}/payment/${paymentMethod}/${merchantUid}/${service.name}/${this.props.totalAmount}/${Meteor.user().profile.email}/${Meteor.user().profile.name}/${Meteor.user().profile.phoneNumber}/${service.address.address} ${service.address.detail}`);

      await WebBrowser.openBrowserAsync(encodedUri);

      const reservations = Meteor.collection('reservations').find({
        _id: reservationId
      });

      if (reservations[0].progress == 'reserved') {
        Actions.main({
          type: ActionConst.RESET
        });
      }
    });
  };

  renderPaymentMethods = () => {
    const PaymentMethods = [
      {
        name: '신용카드',
        method: 'card',
        icon: <FontAwesome name="credit-card" size={20} color="#3c4f5e" />
      },
      {
        name: '휴대폰 소액결제',
        method: 'phone',
        icon: <FontAwesome name="mobile" size={32} color="#3c4f5e" />
      },
      {
        name: '실시간 계좌이체',
        method: 'trans',
        icon: <SimpleLineIcons name="book-open" size={20} color="#3c4f5e" />
      },
      {
        name: '가장계좌',
        method: 'vbank',
        icon: <FontAwesome name="dollar" size={25} color="#3c4f5e" />
      },
      {
        name: '삼성페이',
        method: 'samsung',
        icon: <MaterialCommunityIcons name="credit-card-scan" size={25} color="#3c4f5e" />
      }
    ];

    return PaymentMethods.map((paymentMethod, index) => {
      return (
        <Touchable key={index} onPress={() => { this.onPressPaying(paymentMethod.method); }}>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              borderRadius: 5,
              elevation: 2,
              shadowOpacity: 0.3,
              shadowRadius: 3,
              shadowOffset: {
                height: 3,
                width: 3
              },
              flexDirection: 'row'
            }}
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              { paymentMethod.icon }
            </View>
            <View style={{ flex: 3, justifyContent: 'center' }}>
              <Text style={{ color: '#3c4f5e' }}>{ paymentMethod.name }</Text>
            </View>
          </View>
        </Touchable>
      );
    });
  };

  render() {
    return (
      <Layout title="결제수단 선택">
        <View style={{ flex: 1, padding: 16 }}>
          { this.renderPaymentMethods() }
        </View>
      </Layout>
    );
  }
}
