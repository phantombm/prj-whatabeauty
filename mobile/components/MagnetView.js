import React, { Component } from 'react';
import { Keyboard, Animated, Platform } from 'react-native';
import PropTypes from 'prop-types';

export default class MagnetView extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    offsetInIos: PropTypes.number,
    offsetInAndroid: PropTypes.number,
    isWorkingIos: PropTypes.bool,
    isWorkinginAndroid: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    offsetInIos: 0,
    offsetInAndroid: 0,
    isWorkingIos: true,
    isWorkinginAndroid: true
  };

  animatedTranlateY = new Animated.Value(0);

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = (event) => {
    if (Platform.OS == 'ios' && this.props.isWorkingIos == false) {
      return;
    }

    if (Platform.OS == 'android' && this.props.isWorkinginAndroid == false) {
      return;
    }

    let toValue = -event.endCoordinates.height;

    if (Platform.OS == 'ios') {
      toValue += this.props.offsetInIos;
    }
    else if (Platform.OS == 'android') {
      toValue += this.props.offsetInAndroid;
    }

    Animated.timing(this.animatedTranlateY, {
      toValue: toValue,
      duration: 200
    }).start();
  };

  keyboardDidHide = () => {
    if (Platform.OS == 'ios' && this.props.isWorkingIos == false) {
      return;
    }

    if (Platform.OS == 'android' && this.props.isWorkinginAndroid == false) {
      return;
    }

    Animated.timing(this.animatedTranlateY, {
      toValue: 0,
      duration: 200
    }).start();
  };

  render() {
    return (
      <Animated.View {...this.props} style={[{ transform: [{ translateY: this.animatedTranlateY }] }, this.props.style]}>
        { this.props.children }
      </Animated.View>
    );
  }
}
