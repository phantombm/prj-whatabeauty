import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import Layout from '../layouts/Layout';
import Button from '../components/Button';

export default class Reserving extends Component {
  render() {
    return (
      <Layout title="에약하기">
        <ScrollView>
          <View style={{ height: 55, borderTopWidth: 1, borderTopColor: '#eeeeee' }}></View>
          <View style={{ height: 55, borderTopWidth: 1, borderTopColor: '#eeeeee' }}></View>
          <View style={{ height: 55, borderTopWidth: 1, borderTopColor: '#eeeeee' }}></View>
          <View style={{ height: 55, borderTopWidth: 1, borderTopColor: '#eeeeee' }}></View>
        </ScrollView>
        <View>
          <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressReserving}>예약하기</Button>
        </View>
      </Layout>
    );
  }
}
