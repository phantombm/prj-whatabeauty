import React, { Component } from 'react';
import { View } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Meteor from 'react-native-meteor';
import { Actions, ActionConst } from 'react-native-router-flux';

import Drawer from '../components/Drawer';
import Header from '../components/Header';
import Button from '../components/Button';

export default class Main extends Component {
  onPressSignOut = () => {
    Meteor.logout();

    Actions.tutorial({
      type: ActionConst.RESET
    });
  };

  render() {
    return (
      <Drawer ref={(ref) => { this.drawerRef = ref; }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: Constants.statusBarHeight }} />
          <View style={{ flex: 1 }}>
            <Header
              title="main"
              leftIcon={<Ionicons name="ios-menu" color="#1d1d1b" size={32} />}
              onPressLeftIcon={() => { this.drawerRef.openDrawer(); }}
              rightIcon={<SimpleLineIcons name="bell" color="#1d1d1b" size={26} />}
            />
          </View>
          <View style={{ flex: 10 }}>
            <Button onPress={this.onPressSignOut}>로그아웃</Button>
          </View>
        </View>
      </Drawer>
    );
  }
}
