import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import PropTypes from 'prop-types';

export default class Splash extends Component {
  static propTypes = {
    endLoading: PropTypes.func.isRequired
  };

  componentDidMount() {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(
          this.animatedValue,
          {
            toValue: 1,
            duration: 500
          }
        ),
        Animated.timing(
          this.animatedOpacity,
          {
            toValue: 1,
            duration: 500
          }
        )
      ]).start();
    }, 500);
  }

  animatedValue = new Animated.Value(0);

  animatedOpacity = new Animated.Value(0);

  animatedTranslateY = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0]
  });

  disappearSpalshImage = () => {
    Animated.timing(
      this.animatedOpacity,
      {
        toValue: 0,
        duration: 500
      }
    ).start();

    setTimeout(() => {
      this.props.endLoading();
    }, 500);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: global.keyColor }}>
        <View style={{ flex: 7, alignItems: 'center', justifyContent: 'center' }}>
          <Animated.Image source={require('../assets/images/splash.png')} style={{ width: 100, height: 100, opacity: this.animatedOpacity, transform: [{ translateY: this.animatedTranslateY }] }} />
        </View>
        <View style={{ flex: 3 }} />
      </View>
    );
  }
}
