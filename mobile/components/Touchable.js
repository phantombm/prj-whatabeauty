import React, { Component } from 'react';
import { TouchableNativeFeedback, TouchableWithoutFeedback, Platform } from 'react-native';
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
    else {
      return (
        <TouchableWithoutFeedback {...this.props}>
          { this.props.children }
        </TouchableWithoutFeedback>
      );
    }
  }
}
