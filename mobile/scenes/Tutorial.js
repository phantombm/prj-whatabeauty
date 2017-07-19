import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import AppIntro from 'react-native-app-intro';
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9dd6eb',
    padding: 15
  },
  text: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
  },
});

export default class Tutorial extends Component {
  render() {
    return (
      <AppIntro onDoneBtnClick={Actions.mainRouter} onSkipBtnClick={Actions.mainRouter} doneBtnLabel="완료" skipBtnLabel="건너뛰기">
        <View style={[styles.slide, { backgroundColor: '#fd614d' }]}>
          <View level={10}>
            <Image source={require('../assets/images/tutorial_1.png')} />
          </View>
          <View level={10}>
            <Text style={styles.text}>Page 1</Text>
          </View>
          <View level={15}>
            <Text style={styles.text}>Page 1</Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#fd614d' }]}>
          <View level={-10}>
            <Image source={require('../assets/images/tutorial_1.png')} />
          </View>
          <View level={5}>
            <Text style={styles.text}>Page 2</Text>
          </View>
          <View level={20}>
            <Text style={styles.text}>Page 2</Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#fd614d' }]}>
          <View level={8}>
            <Image source={require('../assets/images/tutorial_1.png')} />
          </View>
          <View level={0}>
            <Text style={styles.text}>Page 3</Text>
          </View>
          <View level={-10}>
            <Text style={styles.text}>Page 3</Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#fd614d' }]}>
          <View level={5}>
            <Image source={require('../assets/images/tutorial_1.png')} />
          </View>
          <View level={10}>
            <Text style={styles.text}>Page 4</Text>
          </View>
          <View level={15}>
            <Text style={styles.text}>Page 4</Text>
          </View>
        </View>
      </AppIntro>
    );
  }
}
