import React, { Component } from 'react';
import { View, Text, Alert, Animated, Dimensions, Easing, SectionList, Image } from 'react-native';
import { WebBrowser } from 'expo';
import { Actions, ActionConst } from 'react-native-router-flux';
import { FontAwesome, EvilIcons, Entypo } from '@expo/vector-icons';
import Meteor, { createContainer } from 'react-native-meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import Layout from '../layouts/Layout';

class Reservations extends Component {
  static propTypes = {
    reservations: PropTypes.array.isRequired,
    ssams: PropTypes.array.isRequired
  };

  renderReservation = ({ item }) => {
    console.log(item);

    return (
      <View style={{ padding: 16, flexDirection: 'row' }}>
        <View style={{ width: 90 }}>
          <Image source={{ uri: item.ssam.profile.informationForSsam.imageUrl }} style={{ width: 90, height: 80 }} />
          { item.progress == 'not paid' &&
            <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#fd614d', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
              <Text style={{ fontSize: 12, color: '#ffffff' }}>결제대기</Text>
            </View>
          }
          { item.progress == 'paid' &&
            <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#fd614d', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
              <Text style={{ fontSize: 12, color: '#ffffff' }}>예약중</Text>
            </View>
          }
          { item.progress == 'waiting for reviewing' &&
            <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#f5d56e', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
              <Text style={{ fontSize: 12, color: '#ffffff' }}>별점 | 리뷰</Text>
            </View>
          }
          { item.progress == 'refunded' &&
            <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#3c4f5e', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
              <Text style={{ fontSize: 12, color: '#ffffff' }}>환불</Text>
            </View>
          }
        </View>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={{ color: '#3c4f5e' }}>{ item.ssam.profile.informationForSsam.comment } | { item.ssam.profile.informationForSsam.name }</Text>
          <Text style={{ color: '#9b9b9b', marginTop: 10, fontSize: 12 }}>내용 : { item.service.name }</Text>
          <Text style={{ color: '#9b9b9b', marginTop: 2, fontSize: 12 }}>금액 : { this.renderPrice(item.price.amount, item.price.unit) }</Text>
          <Text style={{ color: '#9b9b9b', marginTop: 2, fontSize: 12 }}>예약 : { moment(item.scheduledAt).format('YYYY. MM. DD hh시 mm분') }</Text>
          <Text style={{ color: '#9b9b9b', marginTop: 2, fontSize: 12 }}>장소 : { item.service.address.address }</Text>
        </View>
      </View>
    );
  };

  renderPrice = (amount, unit) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + unit;
  };

  renderSectionHeader = ({ section }) => {
    if (section.title == 'new') {
      return (
        <View />
      );
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50 }}>
        <View style={{ width: 80, height: 1, backgroundColor: '#cfcfcf' }} />
        <Text style={{ fontSize: 11, color: '#cfcfcf', marginLeft: 20 }}>지난 예약들</Text>
        <View style={{ width: 80, height: 1, backgroundColor: '#cfcfcf', marginLeft: 20 }} />
      </View>
    );
  };

  keyExtractor = (reservation) => {
    return reservation._id
  };

  render() {
    if (this.props.reservations.length == 0 || this.props.ssams.length == 0) {
      return (
        <View />
      );
    }

    const mappedReservations = this.props.reservations.map((reservation) => {
      const index = _.findIndex(this.props.ssams, (ssam) => {
        return ssam._id == reservation.ssamId;
      });

      reservation.ssam = this.props.ssams[index];

      return reservation;
    });

    const groupedReservations = _.groupBy(mappedReservations, (reservation) => {
      if (reservation.progress == 'wating for reviewing' || reservation.progress == 'completed') {
        return 'old';
      }
      else {
        return 'new';
      }
    });

    const sections = [
      {
        data: groupedReservations.new || [],
        title: 'new'
      },
      {
        data: groupedReservations.old || [],
        title: 'old'
      }
    ];

    return (
      <Layout title="예약내역" isKeyboardDismissedOnTouched={false}>
        <SectionList keyExtractor={this.keyExtractor} renderItem={this.renderReservation} renderSectionHeader={this.renderSectionHeader} sections={sections} />
      </Layout>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('reservations', {
    userId: Meteor.userId()
  });

  return {
    reservations: Meteor.collection('reservations').find({
      userId: Meteor.userId()
    }),
    ssams: Meteor.collection('users').find({
      'profile.isSsam': true
    })
  };
}, Reservations);
