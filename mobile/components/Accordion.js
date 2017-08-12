import React, { Component } from 'react';
import { Text, View, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from '@expo/vector-icons';

import Touchable from './Touchable';

export default class Accordion extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    titleStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    contentHeight: PropTypes.number
  };

  static defaultProps = {
    titleStyle: {},
    contentStyle: {},
    contentHeight: 200
  };

  state = {
    isOpened: false
  };

  animatedValue = new Animated.Value(0);

  animatedRotateZ = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  animatedHeight = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, this.props.contentHeight]
  });

  animatedPaddingVertical = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16]
  });

  onPressAccordion = () => {
    if (this.state.isOpened) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 300
      }).start();

      this.setState({
        isOpened: false
      });
    }
    else {
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 300
      }).start();

      this.setState({
        isOpened: true
      });
    }
  };

  render() {
    return (
      <View>
        <Touchable onPress={this.onPressAccordion}>
          <View style={[{ height: 60, flexDirection: 'row' }, this.props.titleStyle]}>
            <View style={{ flex: 1, paddingHorizontal: 16, justifyContent: 'center' }}>
              <Text style={{ color: '#3c4f5e' }}>{ this.props.title }</Text>
            </View>
            <Animated.View style={{ width: 60, alignItems: 'center', justifyContent: 'center', transform: [{ rotateZ: this.animatedRotateZ }] }}>
              <SimpleLineIcons name="arrow-right" size={23} color="#3c4f5e" style={{ transform: [{ rotateZ: '90deg' }] }} />
            </Animated.View>
          </View>
        </Touchable>
        <Animated.View style={[{ height: this.animatedHeight, paddingHorizontal: 30, paddingVertical: this.animatedPaddingVertical }, this.props.contentStyle]}>
          <Text>{ this.props.content }</Text>
        </Animated.View>
      </View>
    );
  }
}
