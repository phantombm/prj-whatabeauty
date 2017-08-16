import React, { Component } from 'react';
import { View, Text, TimePickerAndroid, Platform, DatePickerIOS, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { EvilIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import Meteor from 'react-native-meteor';

import Layout from '../layouts/Layout';
import Calendar from '../components/Calendar';
import Touchable from '../components/Touchable';
import Button from '../components/Button';

export default class SelectingDateTime extends Component {
  static propTypes = {
    flowType: PropTypes.string.isRequired,
    service: PropTypes.object,
    reservation: PropTypes.object
  };

  static defaultProps = {
    service: {},
    reservation: {}
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
    if (this.state.time.hours < 6 || (this.state.time.hours == 21 && this.state.time.minutes > 0) || (this.state.time.hours > 21)) {
      Alert.alert(
        'whatabeauty',
        '예약 가능한 시간은 6시부터 21시까지입니다.',
        [{ text: '확인' }],
        { cancelable: false }
      );

      return;
    }

    const scheduledAt = moment(`${this.state.date} ${this.state.time.hours}:${this.state.time.minutes}`, 'YYYY-MM-DD H:m');

    if (this.props.flowType == 'from reserving') {
      this.props.service.scheduledAt = scheduledAt;

      Actions.pop({
        refresh: {
          service: this.props.service
        }
      });
    }
    else if (this.props.flowType == 'from reservation') {
      Alert.alert(
        'whatabeauty',
        '고객과 충분히 협의 후 변경하시기 바랍니다.',
        [
          {
            text: '변경',
            onPress: () => {
              Meteor.call('reservations.update', {
                _id: this.props.reservation._id
              }, {
                $set: {
                  'service.scheduledAt': scheduledAt.toDate()
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

                this.props.reservation.service.scheduledAt = scheduledAt.toDate();

                Actions.pop({
                  refresh: {
                    reservation: this.props.reservation
                  }
                });
              });
            }
          },
          {
            text: '취소'
          }
        ],
        {
          cancelable: false
        }
      );
    }
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
    if (!this.state.date) {
      return false;
    }

    if (!this.state.time) {
      return false;
    }

    return true;
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="일정">
        <View style={{ flex: 1 }}>
          <View style={{ height: 365 }}>
            <Calendar markedDates={this.state.markedDates} onDayPress={this.onPressDay} minDate={moment().format('YYYY-MM-DD')} />
          </View>
          <View>
            { Platform.OS == 'android' &&
              <View>
                <Touchable onPress={this.onPressSelectingTime}>
                  <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', borderBottomWidth: 1, borderBottomColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                    <EvilIcons name="clock" size={35} color="#4a4a4a" />
                    <Text style={{ color: '#3c4f5e', marginLeft: 15 }}>{ this.renderTime() }</Text>
                  </View>
                </Touchable>
              </View>
            }
            { Platform.OS == 'ios' &&
              <View>
                <DatePickerIOS date={this.state.dateForIos} mode="time" onDateChange={this.onChangeDate} />
              </View>
            }
          </View>
        </View>
        <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressSelectingDateTime} isActive={isValid}>일정 저장하기</Button>
      </Layout>
    );
  }
}
