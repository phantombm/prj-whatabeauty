import React, { Component } from 'react';
import { View } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import Layout from '../layouts/Layout';
import Calendar from '../components/Calendar';
import Button from '../components/Button';

class Schedule extends Component {
  static propTypes = {
    isReservationsReady: ProTypes.bool.isRequired,
    reservations: ProTypes.array.isRequired
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
    console.log(this.props);
    console.log(nextPorps);
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

  render() {
    if (!this.props.isReservationsReady) {
      return (
        <View />
      );
    }

    this.props.reservations.forEach((reservation) => {
      console.log(moment(reservation.service.scheduledAt).format('YYYY-MM-DD'));
    });

    return (
      <Layout title="일정 관리" isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 365 }}>
            <Calendar markedDates={this.state.markedDates} onDayPress={this.onPressDay} />
          </View>

        </View>
        <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressDisablingDate}>이날 더이상 예약 안받기</Button>
      </Layout>
    );
  }
}

export default createContainer(() => {
  const reservationsHandle = Meteor.subscribe('reservationsForSsam', {});

  return {
    isReservationsReady: reservationsHandle.ready(),
    reservations: Meteor.collection('reservations').find({})
  };
}, Schedule);
