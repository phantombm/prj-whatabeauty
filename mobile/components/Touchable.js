import React, { Component } from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    if (Platform.OS == 'android') {
      return (
        <TouchableNativeFeedback {...this.props}>
          { this.props.children }
        </TouchableNativeFeedback>
      );
    }
    else if (Platform.OS == 'ios') {
      return (
        <TouchableOpacity {...this.props}>
          { this.props.children }
        </TouchableOpacity>
      );
    }
  }
}
