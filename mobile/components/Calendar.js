import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['kr'] = {
  monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
};

LocaleConfig.defaultLocale = 'kr';

export default class _Calendar extends Component {
  onDayPress = (day) => {

  };

  renderArrow = (direction) => {
    if (direction == 'left') {
      return <SimpleLineIcons name="arrow-left" size={28} color={global.keyColor} />
    }
    else if (direction == 'right') {
      return <SimpleLineIcons name="arrow-right" size={28} color={global.keyColor} />
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Calendar
          {...this.props}
          monthFormat={'yyyy년 M월'}
          renderArrow={this.renderArrow}
          theme={{
            textSectionTitleColor: '#3c4f5e',
            selectedDayBackgroundColor: global.keyColor,
            todayTextColor: '#f5d56e',
            dayTextColor: '#3c4f5e',
            dotColor: global.keyColor,
            monthTextColor: global.keyColor,
            textDayFontFamily: Platform.OS == 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif',
            textMonthFontFamily: Platform.OS == 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif',
            textDayHeaderFontFamily: Platform.OS == 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif',
            textDayFontSize: 14,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14
          }}
        />
        <View style={{ width: 50, height: 1, backgroundColor: global.keyColor, position: 'absolute', top: 45, left: '50%', transform: [{ translateX: -25 }] }} />
      </View>
    );
  }
}
