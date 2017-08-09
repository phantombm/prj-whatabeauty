import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

class Settings extends Component {
  static propTypes = {
    user: ProTypes.object.isRequired
  };

  onChangeValueForGettingNotifications = (isGettingNotificationActive) => {
    Meteor.call('users.update', {
      $set: {
        'profile.isGettingNotificationActive': isGettingNotificationActive
      }
    });
  };

  render() {
    return (
      <Layout title="환경설정">
        <View style={{ flex: 1 }}>
          <View style={{ height: 60, flexDirection: 'row' }}>
            <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
              <Text>푸쉬알람 받기</Text>
            </View>
            <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Switch onValueChange={this.onChangeValueForGettingNotifications} value={this.props.user.profile.isGettingNotificationActive} />
            </View>
          </View>
          <Touchable onPress={Actions.termsOfService}>
            <View style={{ height: 60, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee' }}>
              <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
                <Text>서비스 이용약관</Text>
              </View>
              <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
                <SimpleLineIcons name="arrow-right" size={23} />
              </View>
            </View>
          </Touchable>
          <Touchable onPress={Actions.privacyPolicy}>
            <View style={{ height: 60, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee' }}>
              <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
                <Text>개인정보 취급방침</Text>
              </View>
              <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
                <SimpleLineIcons name="arrow-right" size={23} />
              </View>
            </View>
          </Touchable>
          <View style={{ height: 60, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee', borderBottomWidth: 1, borderBottomColor: '#eeeeee' }}>
            <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
              <Text>버전정보</Text>
            </View>
            <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text>1.0.0</Text>
            </View>
          </View>
        </View>
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user()
  };
}, Settings);
