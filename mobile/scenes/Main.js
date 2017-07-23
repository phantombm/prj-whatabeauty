import React, { Component } from 'react';
import { View } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

import Drawer from '../components/Drawer';
import Header from '../components/Header';

export default class Main extends Component {
  render() {
    return (
      <Drawer ref={(ref) => { this.drawerRef = ref; }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: Constants.statusBarHeight }} />
          <View style={{ flex: 48 }}>
            <Header
              title="main"
              leftIcon={<Ionicons name="ios-menu" color="#1d1d1b" size={32} />}
              onPressLeftIcon={() => { this.drawerRef.openDrawer(); }}
              rightIcon={<SimpleLineIcons name="bell" color="#1d1d1b" size={26} />}
            />
          </View>
          <View style={{ flex: 500 }}>

          </View>
        </View>
      </Drawer>
    );
  }
}
