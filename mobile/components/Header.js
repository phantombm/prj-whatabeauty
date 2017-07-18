import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

export default class Header extends Component {
  static propTypes = {
    onPressIcon: PropTypes.func,
    icon: PropTypes.element,
    title: PropTypes.string
  };

  static defaultProps = {
    icon: <Ionicons name="md-menu" size={ 32 } />
  };

  // TODO: this 'add' method is for testing jest unit test
  add = (a, b) => {
    return a + b;
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={ this.props.onPressIcon }>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>{ this.props.icon }</View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{
          flex: 4,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>{ this.props.title }</Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    );
  }
}
