import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux'

import Tutorial from '../components/Tutorial';

const styleSheet = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#3c4f5e'
  },
  description: {
    fontSize: 12,
    color: '#3c4f5e',
    textAlign: 'center',
    lineHeight: 19
  }
});

export default class _Tutorial extends Component {
  render() {
    return (
      <Tutorial backgroundColor="#fd614d" onPressSkip={Actions.mainRouter}>
        <View>
          <Image source={require('../assets/images/tutorial_1.png')} />
          <Text style={styleSheet.title}>찾아가는 서비스</Text>
          <Text style={styleSheet.description}>
            아름답고싶은것은 본능입니다.{'\n'}
            편안한 장소, 원하는 시간에{'\n'}
            찾아가는 뷰티서비스를 만나보세요.
          </Text>
        </View>
        <View>
          <Image source={require('../assets/images/tutorial_2.png')} />
          <Text style={styleSheet.title}>특별해지고 싶은 날</Text>
          <Text style={styleSheet.description}>
            아름답고싶은것은 본능입니다.{'\n'}
            편안한 장소, 원하는 시간에{'\n'}
            찾아가는 뷰티서비스를 만나보세요.
          </Text>
        </View>
        <View>
          <Image source={require('../assets/images/tutorial_3.png')} />
          <Text style={styleSheet.title}>전문가의 손길</Text>
          <Text style={styleSheet.description}>
            아름답고싶은것은 본능입니다.{'\n'}
            편안한 장소, 원하는 시간에{'\n'}
            찾아가는 뷰티서비스를 만나보세요.
          </Text>
        </View>
      </Tutorial>
    );
  }
}
