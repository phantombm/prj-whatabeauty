import React, { Component } from 'react';
import { View, Text, SectionList, Image } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

class Reservations extends Component {
  static propTypes = {
    flowType: PropTypes.string.isRequired,
    isReservationsReady: PropTypes.bool.isRequired,
    reservations: PropTypes.array.isRequired,
    ssams: PropTypes.array.isRequired
  };

  renderReservation = ({ item }) => {
    let progress = item.progress;

    if (progress == 'paid' && moment(item.service.scheduledAt).diff(moment()) < 0) {
      progress = 'waiting for approving payment';
    }

    return (
      <Touchable onPress={() => { this.onPressReservation(item); }}>
        <View style={{ padding: 16, flexDirection: 'row' }}>
          <View style={{ width: 90 }}>
            { this.props.flowType == 'from main' &&
              <View>
                <Image source={{ uri: item.ssam.profile.informationForSsam.imageUrl }} style={{ width: 90, height: 90 * 6 / 7 }} />
                { progress == 'not paid' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: global.keyColor, alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>결제대기</Text>
                  </View>
                }
                { progress == 'paid' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: global.keyColor, alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>예약중</Text>
                  </View>
                }
                { progress == 'refunded' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#3c4f5e', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>환불</Text>
                  </View>
                }
                { progress == 'waiting for approving payment' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#3c4f5e', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>결제승인대기</Text>
                  </View>
                }
                { item.progress == 'waiting for writing review' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#f5d56e', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>별점 | 리뷰</Text>
                  </View>
                }
                { item.progress == 'completed' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#f5d56e', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>완료</Text>
                  </View>
                }
              </View>
            }
            { this.props.flowType == 'from menuForSsam' &&
              <View style={{ flex: 1, justifyContent: 'center' }}>
                { progress == 'not paid' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: global.keyColor, alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>결제대기</Text>
                  </View>
                }
                { progress == 'paid' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: global.keyColor, alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>예약중</Text>
                  </View>
                }
                { progress == 'refunded' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#3c4f5e', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>환불</Text>
                  </View>
                }
                { progress == 'waiting for approving payment' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#3c4f5e', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>결제승인대기</Text>
                  </View>
                }
                { item.progress == 'completed' &&
                  <View style={{ width: 90, height: 23, borderRadius: 3, backgroundColor: '#f5d56e', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>완료</Text>
                  </View>
                }
              </View>
            }
          </View>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            { this.props.flowType == 'from main' &&
              <Text style={{ color: '#3c4f5e' }}>{ item.ssam.profile.informationForSsam.comment } | { item.ssam.profile.informationForSsam.name }</Text>
            }
            { this.props.flowType == 'from menuForSsam' &&
              <Text style={{ color: '#3c4f5e' }}>{ item.user.profile.name }</Text>
            }
            <Text style={{ color: '#9b9b9b', marginTop: 10, fontSize: 12 }}>내용 : { item.service.name }</Text>
            <Text style={{ color: '#9b9b9b', marginTop: 2, fontSize: 12 }}>금액 : { this.renderPrice(item.price.amount) }</Text>
            <Text style={{ color: '#9b9b9b', marginTop: 2, fontSize: 12 }}>예약 : { moment(item.service.scheduledAt).format('YYYY.MM.DD dddd H시 m분') }</Text>
            <Text style={{ color: '#9b9b9b', marginTop: 2, fontSize: 12 }}>장소 : { this.renderAddress(item) }</Text>
          </View>
        </View>
      </Touchable>
    );
  };

  onPressReservation = (reservation) => {
    Actions.reservation({
      flowType: this.props.flowType,
      reservation: reservation
    });
  };

  renderPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  renderAddress = (item) => {
    let address = item.service.address.address;

    if (address.length > 20) {
      address = address.slice(0, 18) + ' ...';
    }

    return address;
  };

  renderSectionHeader = ({ section }) => {
    if (section.title == 'new' || section.data.length == 0) {
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

  renderItemSeparatorComponent = () => {
    return (
      <View style={{ height: 1, backgroundColor: '#eeeeee' }} />
    );
  };

  render() {
    if (!this.props.isReservationsReady) {
      return (
        <View />
      );
    }

    this.props.reservations.map((reservation) => {
      const index = _.findIndex(this.props.ssams, (ssam) => {
        return ssam._id == reservation.ssamId;
      });

      reservation.ssam = this.props.ssams[index];
    });

    const reservations = _.sortBy(this.props.reservations, [
      (reservation) => {
        return reservation.service.scheduledAt.getTime();
      }
    ]);

    const groupedReservations = _.groupBy(reservations, (reservation) => {
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
      <Layout title="예약 내역" isKeyboardDismissedOnTouched={false}>
        <SectionList ItemSeparatorComponent={this.renderItemSeparatorComponent} keyExtractor={this.keyExtractor} renderItem={this.renderReservation} renderSectionHeader={this.renderSectionHeader} sections={sections} />
      </Layout>
    );
  }
}

export default createContainer((props) => {
  let reservationsHandle = null;

  if (props.flowType == 'from main') {
    reservationsHandle = Meteor.subscribe('reservations', {});
  }
  else if (props.flowType == 'from menuForSsam') {
    reservationsHandle = Meteor.subscribe('reservationsForSsam', {});
  }

  let reservations = null;

  if (props.flowType == 'from main') {
    reservations = Meteor.collection('reservations').find({});
  }
  else if (props.flowType == 'from menuForSsam') {
    reservations = Meteor.collection('reservations').find({});
  }

  let ssams = null;

  if (props.flowType == 'from main') {
    ssams = Meteor.collection('users').find({
      'profile.isSsam': true
    });
  }
  else if (props.flowType == 'from menuForSsam') {
    ssams = [Meteor.user()];
  }

  return {
    isReservationsReady: reservationsHandle.ready(),
    reservations: reservations,
    ssams: ssams
  };
}, Reservations);
