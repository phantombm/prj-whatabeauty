import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import Calendar from '../components/Calendar';
import Button from '../components/Button';
import Touchable from '../components/Touchable';

class Schedule extends Component {
  static propTypes = {
    isReservationsReady: ProTypes.bool.isRequired,
    reservations: ProTypes.array.isRequired,
    ssam: ProTypes.object.isRequired
  };

  state = {
    markedDates: {}
  };

  componentWillMount() {
    const today = moment().format('YYYY-MM-DD');

    const markedDates = {};

    markedDates[today] = {
      selected: true
    };

    this.setState({
      markedDates: markedDates
    });
  }

  componentWillReceiveProps(nextPorps) {
    nextPorps.reservations.forEach((reservation) => {
      reservation.ssam = this.props.ssam;
    });

    const markedDates = _.clone(this.state.markedDates);

    _.forEach(markedDates, (value, key) => {
      markedDates[key].marked = false;
      markedDates[key].disabled = false;
    });

    nextPorps.reservations.forEach((reservation) => {
      const scheduledAt = moment(reservation.service.scheduledAt).format('YYYY-MM-DD');

      if (markedDates[scheduledAt]) {
        markedDates[scheduledAt].marked = true;
      }
      else {
        markedDates[scheduledAt] = {
          marked: true
        };
      }
    });

    nextPorps.ssam.profile.informationForSsam.notAvailableAts.forEach((notAvailableAt) => {
      const momentForNotAvailableAt = moment(notAvailableAt).format('YYYY-MM-DD');

      if (markedDates[momentForNotAvailableAt]) {
        markedDates[momentForNotAvailableAt].disabled = true;
      }
      else {
        markedDates[momentForNotAvailableAt] = {
          disabled: true
        };
      }
    });

    this.setState({
      markedDates: markedDates
    });
  }

  onPressDay = (day) => {
    this.setState((previousState) => {
      const markedDates = _.clone(previousState.markedDates);

      if (markedDates[day.dateString]) {
        markedDates[day.dateString].selected = !markedDates[day.dateString].selected;

        return {
          markedDates: markedDates
        };
      }
      else {
        markedDates[day.dateString] = {
          selected: true
        };

        return {
          markedDates: markedDates
        };
      }
    });
  };

  renderSchedule = () => {
    let markedDates = _.map(this.state.markedDates, (value, key) => {
      return _.extend(value, {
        date: key
      });
    });

    markedDates = _.sortBy(markedDates, [
      'date'
    ]);

    return markedDates.map((markedDate, index) => {
      if (!markedDate.selected) {
        return (
          <View key={index} />
        );
      }

      return (
        <View key={index}>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 25, paddingLeft: 16 }}>
            <Text style={{ fontSize: 12, color: global.keyColor }}>{ moment(markedDate.date).format('YYYY.MM.DD') }</Text>
            { markedDate.disabled &&
              <View style={{ marginLeft: 10, width: 70, height: 22, backgroundColor: global.keyColor, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: '#ffffff' }}>CLOSED</Text>
              </View>
            }
          </View>
          { this.renderReservations(markedDate.date) }
        </View>
      );
    });
  };

  renderReservations = (date) => {
    const reservations = _.filter(this.props.reservations, (reservation) => {
      return moment(reservation.service.scheduledAt).format('YYYY-MM-DD') == date;
    });

    return reservations.map((reservation) => {
      return (
        <Touchable key={reservation._id} onPress={() => { this.onPressReservation(reservation); }}>
          <View style={{ height: 60, borderBottomWidth: 1, borderBottomColor: '#eeeeee', flexDirection: 'row', paddingLeft: 16 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: '#3c4f5e' }}>{ moment(reservation.service.scheduledAt).format('H:mm') } { reservation.service.address.address }</Text>
              <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ reservation.service.name }</Text>
            </View>
            <View style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
              <SimpleLineIcons name="arrow-right" size={23} color="#3c4f5e" />
            </View>
          </View>
        </Touchable>
      );
    });
  };

  onPressReservation = (reservation) => {
    Actions.reservation({
      flowType: 'from menuForSsam',
      reservation: reservation
    });
  };

  onPressDisablingDates = () => {
    const notAvailableAts = _.clone(this.props.ssam.profile.informationForSsam.notAvailableAts);

    _.forEach(this.state.markedDates, (value, key) => {
      if (value.selected) {
        const index = _.findIndex(notAvailableAts, (notAvailableAt) => {
          return moment(notAvailableAt).format('YYYY-MM-DD') == key;
        });

        if (index == -1) {
          notAvailableAts.push(moment(key).toDate());
        }
        else {
          notAvailableAts.splice(index, 1);
        }
      }
    });

    Meteor.call('users.update', {
      $set: {
        'profile.informationForSsam.notAvailableAts': notAvailableAts
      }
    });
  };

  render() {
    if (!this.props.isReservationsReady) {
      return (
        <View />
      );
    }

    return (
      <Layout title="일정 관리" isKeyboardDismissedOnTouched={false}>
        <ScrollView>
          <View style={{ height: 365 }}>
            <Calendar markedDates={this.state.markedDates} onDayPress={this.onPressDay} />
          </View>
          { this.renderSchedule() }
        </ScrollView>
        <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressDisablingDates}>이날 예약 안받기 / 받기</Button>
      </Layout>
    );
  }
}

export default createContainer(() => {
  const reservationsHandle = Meteor.subscribe('reservationsForSsam', {});

  return {
    isReservationsReady: reservationsHandle.ready(),
    reservations: Meteor.collection('reservations').find({
      ssamId: Meteor.userId()
    }),
    ssam: Meteor.user()
  };
}, Schedule);
