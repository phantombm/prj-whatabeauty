import React, { Component } from 'react';
import { View } from 'react-native';
import { Constants } from 'expo';

import Drawer from '../components/Drawer'
import Header from '../components/Header';

export default class Main extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={{ flex: 1 }}>
          <Drawer ref={(ref) => { this.drawerRef = ref; }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Header title="Main" onPressIcon={() => { this.drawerRef.openDrawer(); }} />
              </View>
              <View style={{ flex: 10 }} />
            </View>
          </Drawer>
        </View>
      </View>
    );
  }
}
