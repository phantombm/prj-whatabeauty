import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import Header from '../components/Header';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
    onPressLeftIcon: PropTypes.func,
    isKeyboardDismissedOnTouched: PropTypes.bool
  };

  static defaultProps = {
    title: '',
    onPressLeftIcon: () => {},
    isKeyboardDismissedOnTouched: true
  };

  onPressLeftIcon = () => {
    this.props.onPressLeftIcon();

    Actions.pop();
  };

  onPressView = () => {
    Keyboard.dismiss();
  };

  render() {
    if (this.props.isKeyboardDismissedOnTouched) {
      return (
        <TouchableWithoutFeedback onPress={this.onPressView}>
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <View style={{ height: Constants.statusBarHeight }} />
            <View style={{ flex: 1 }}>
              <Header title={this.props.title} leftIcon={<Ionicons name="ios-arrow-round-back-outline" color="#3c4f5e" size={50} />} onPressLeftIcon={this.onPressLeftIcon} />
            </View>
            <View style={{ flex: 10 }}>
              { this.props.children }
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    else {
      return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <View style={{ height: Constants.statusBarHeight }} />
          <View style={{ flex: 1 }}>
            <Header title={this.props.title} leftIcon={<Ionicons name="ios-arrow-round-back-outline" color="#3c4f5e" size={50} />} onPressLeftIcon={this.onPressLeftIcon} />
          </View>
          <View style={{ flex: 10 }}>
            { this.props.children }
          </View>
        </View>
      );
    }
  }
}
