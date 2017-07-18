import React, { Component } from 'react';
import { View } from 'react-native';

import Drawer from '../components/Drawer'
import Header from '../components/Header';

export default class Main extends Component {
  render() {
    return (
      <Drawer ref="drawer">
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Header title="Main" onPressIcon={ () => { this.refs.drawer.openDrawer(); } } />
          </View>
          <View style={{ flex: 10 }}></View>
        </View>
      </Drawer>
    );
  }
}
