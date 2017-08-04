import React, { Component } from 'react';
import { View, Text, TimePickerAndroid, Platform, DatePickerIOS } from 'react-native';
import PropTypes from 'prop-types';
import { EvilIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import Layout from '../layouts/Layout';
import Calendar from '../components/Calendar';
import Touchable from '../components/Touchable';
import Button from '../components/Button';

export default class SelectingDateTime extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired
  };

  state = {
    date: null,
    time: Platform.OS == 'android' ? null : {
      hours: 14,
      minutes: 0
    },
    markedDates: {},
    isSelectingDateTimeActive: false,
    dateForIos: moment().hours(14).minutes(0).toDate()
  };

  onPressDay = (day) => {
    const markedDates = {};

    markedDates[day.dateString] = {
      selected: true
    };

    this.setState({
      markedDates: markedDates,
      date: day.dateString
    });
  };

  onPressSelectingTime = async () => {
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: 14,
      minute: 0,
      is24Hour: false
    });

    if (action != TimePickerAndroid.dismissedAction) {
      this.setState({
        time: {
          hours: hour,
          minutes: minute
        }
      });
    }
  };

  renderTime = () => {
    if (this.state.time) {
      return `${this.state.time.hours}시 ${this.state.time.minutes}분`;
    }
    else {
      return '시간을 선택해주세요.';
    }
  };

  onPressSelectingDateTime = () => {
    this.props.service.scheduledAt = moment(`${this.state.date} ${this.state.time.hours}:${this.state.time.minutes}`, 'YYYY-MM-DD H:m');

    Actions.pop({
      refresh: {
        service: this.props.service
      }
    });
  };

  onChangeDate = (date) => {
    const currentMoment = moment(date);

    this.setState({
      time: {
        hours: currentMoment.hours(),
        minutes: currentMoment.minutes()
      },
      dateForIos: currentMoment.toDate()
    });
  };

  validate = () => {
    if (this.state.date && this.state.time) {
      return true;
    }
    else {
      return false;
    }
  };

  render() {
    let isSelectingDateTimeActive = this.validate();

    return (
      <Layout title="일정">
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ height: 365 }}>
              <Calendar
                markedDates={this.state.markedDates}
                onDayPress={this.onPressDay}
              />
            </View>
            <View>
              { Platform.OS == 'android' ?
                <View>
                  <Touchable onPress={this.onPressSelectingTime}>
                    <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', borderBottomWidth: 1, borderBottomColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                      <EvilIcons name="clock" size={35} color="#4a4a4a" />
                      <Text style={{ color: '#3c4f5e', marginLeft: 15 }}>{ this.renderTime() }</Text>
                    </View>
                  </Touchable>
                </View> :
                <View>
                  <DatePickerIOS date={this.state.dateForIos} mode="time" onDateChange={this.onChangeDate} />
                </View>
              }
            </View>
          </View>
          <View>
            <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressSelectingDateTime} isActive={isSelectingDateTimeActive}>일정 저장하기</Button>
          </View>
        </View>
      </Layout>
    );
  }
}
