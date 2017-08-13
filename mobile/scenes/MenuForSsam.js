import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Meteor from 'react-native-meteor';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

export default class MenuForSsam extends Component {
  render() {
    return (
      <Layout title="쌤 메뉴">
        <Touchable onPress={() => { Actions.ssam({ flowType: 'from menuForSsam', ssam: Meteor.user() }); }}>
          <View style={{ height: 60, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee' }}>
            <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
              <Text>쌤 정보 관리</Text>
            </View>
            <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
              <SimpleLineIcons name="arrow-right" size={23} />
            </View>
          </View>
        </Touchable>
        <Touchable onPress={() => { Actions.reservations({ flowType: 'from menuForSsam' }); }}>
          <View style={{ height: 60, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee' }}>
            <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
              <Text>서비스 내역</Text>
            </View>
            <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
              <SimpleLineIcons name="arrow-right" size={23} />
            </View>
          </View>
        </Touchable>
        <Touchable>
          <View style={{ height: 60, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee' }}>
            <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
              <Text>정산 관리</Text>
            </View>
            <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
              <SimpleLineIcons name="arrow-right" size={23} />
            </View>
          </View>
        </Touchable>
        <Touchable>
          <View style={{ height: 60, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee', borderBottomWidth: 1, borderBottomColor: '#eeeeee' }}>
            <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
              <Text>일정 관리</Text>
            </View>
            <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
              <SimpleLineIcons name="arrow-right" size={23} />
            </View>
          </View>
        </Touchable>
      </Layout>
    );
  }
}
