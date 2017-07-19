import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

export default class DrawerContent extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => { Actions.main(); this.props.closeDrawer(); }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Main</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => { Actions.links(); this.props.closeDrawer(); }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Links</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
