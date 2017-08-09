import React, { Component } from 'react';
import { View, Image, Text, ScrollView, Alert } from 'react-native';
import { SimpleLineIcons, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { Actions, ActionConst } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';
import { WebBrowser } from 'expo';
import Meteor from 'react-native-meteor';

import Layout from '../layouts/Layout';
import Button from '../components/Button';

export default class Reservation extends Component {
  static propTypes = {
    flowType: PropTypes.string.isRequired,
    service: PropTypes.object,
    ssam: PropTypes.object,
    reservation: PropTypes.object
  };
  
  static defaultProps = {
    service: {},
    ssam: {},
    reservation: {}
  };

  getGradesAverage = (informationForSsam) => {
    const length = informationForSsam.reviews.length;

    if (length == 0) {
      return '0.0';
    }

    const sum = _.reduce(informationForSsam.reviews, (sum, review) => {
      return sum + review.grade;
    }, 0);

    return (sum / length).toFixed(1);
  };

  renderReviewsLength = (informationForSsam) => {
    const length = informationForSsam.reviews.length;

    if (length > 99) {
      return length + '+';
    }
    else {
      return length;
    }
  };

  renderService = (isMainService, service) => {
    if (service.quantity == 0) {
      return (
        <View key={service._id} />
      );
    }

    return (
      <View key={service._id} style={{ height: 60, borderTopWidth: isMainService == true ? 0 : 1, borderTopColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20 }}>
        <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center' }}>
          <View>
            { isMainService == true ?
              <Text style={{ fontSize: 16, color: '#3c4f5e', fontWeight: 'bold' }}>{ service.name }</Text> :
              <Text style={{ color: '#3c4f5e' }}>{ service.name }</Text>
            }
          </View>
          <View style={{ backgroundColor: '#fd614d', borderRadius: 10, height: 20, paddingHorizontal: 5, marginLeft: 5, overflow: 'hidden', justifyContent: 'center' }}>
            <Text style={{ color: '#ffffff' }}>x{ service.quantity }</Text>
          </View>
        </View>
        <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, color: '#fd614d' }}>{ this.renderPrice(service.price.amount * service.quantity) }</Text>
        </View>
      </View>
    );
  };

  renderPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.props.service.price.unit;
  };

  renderRelatedServices = () => {
    return this.props.service.relatedServices.map((relatedService) => {
      return this.renderService(false, relatedService);
    });
  };

  getTotalAmount = () => {
    let totalAmount = this.props.service.price.amount * this.props.service.quantity;

    totalAmount += _.reduce(this.props.service.relatedServices, (sum, relatedService) => {
      return sum + relatedService.price.amount * relatedService.quantity;
    }, 0);

    return totalAmount;
  };

  onPressPayment = (totalAmount) => {
    const service = _.clone(this.props.service);

    service.scheduledAt = service.scheduledAt.toDate();

    const reservation = {
      userId: Meteor.userId(),
      ssamId: this.props.ssam._id,
      service: service,
      price: {
        amount: totalAmount,
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

      await WebBrowser.openBrowserAsync(`http://${global.ddpServerIp}/payment/${merchantUid}/${service.name}/${totalAmount}/${Meteor.user().profile.email}/${Meteor.user().profile.name}/${Meteor.user().profile.phoneNumber}/${service.address.address} ${service.address.detail}`);

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

  render() {
    const informationForSsam = this.props.ssam.profile.informationForSsam;

    const average = this.getGradesAverage(informationForSsam);

    const totalAmount = this.getTotalAmount();
    
    return (
      <Layout title="예약 내용" isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ flexDirection: 'row', padding: 16 }}>
                <View style={{ flex: 1 }}>
                  <Image source={{ uri: informationForSsam.imageUrl }} style={{ width: 140, height: 120, borderRadius: 5 }} />
                </View>
                <View style={{ flex: 1, paddingVertical: 12 }}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: '#666666' }}>{ informationForSsam.name }</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View>
                      <Text style={{ fontSize: 10, color: '#3c4f5e' }}>{ informationForSsam.region } | 경력 { informationForSsam.career }년</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: '#9b9b9b' }}>{ informationForSsam.comment }</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <StarRating disabled maxStars={5} rating={parseFloat(average)} starSize={10} starColor="#f5d56e" emptyStarColor="#f5d56e" />
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text style={{ marginLeft: 10, fontSize: 10, color: '#fd614d' }}>{average} ({ this.renderReviewsLength(informationForSsam) })</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <SimpleLineIcons name="home" size={23} color="#4a4a4a" />
                </View>
                <View style={{ flex: 11, justifyContent: 'center' }}>
                  <View>
                    <Text style={{ color: '#3c4f5e' }}>{ this.props.service.address.address }</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ this.props.service.address.detail }</Text>
                  </View>
                </View>
              </View>
              <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row' }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <EvilIcons name="calendar" size={35} color="#4a4a4a" />
                </View>
                <View style={{ flex: 11, justifyContent: 'center' }}>
                  <View>
                    <View>
                      <Text style={{ color: '#3c4f5e' }}>{ this.props.service.scheduledAt.format('YYYY년 M월 D일 dddd') }</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ this.props.service.scheduledAt.format('H시 m분') }</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: "#fafafa" }}>
                <FontAwesome name="location-arrow" size={15} color="#fd614d" />
                <Text style={{ color: "#fd614d", marginLeft: 10 }}>이동거리 99km</Text>
              </View>
              { this.renderService(true, this.props.service) }
              { this.renderRelatedServices() }
              <View style={{ height: 120, borderTopWidth: 1, borderTopColor: '#eeeeee', paddingLeft: 20, justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: '#cfcfcf' }}>아직 할인 혜택이 없습니다.</Text>
              </View>
              <View style={{ height: 90, borderTopWidth: 1, borderTopColor: '#eeeeee', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#3c4f5e', fontWeight: 'bold' }}>총 금액 : { this.renderPrice(totalAmount) }</Text>
              </View>
            </ScrollView>
          </View>
          <View>
            <Button buttonStyle={{ borderRadius: 0 }} onPress={() => { this.onPressPayment(totalAmount); }}>결제하기</Button>
          </View>
        </View>
      </Layout>
    );
  }
}
