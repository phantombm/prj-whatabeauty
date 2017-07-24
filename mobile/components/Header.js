import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    leftIcon: PropTypes.element,
    onPressLeftIcon: PropTypes.func,
    rightIcon: PropTypes.element,
    onPressRightIcon: PropTypes.func
  };

  static defaultProps = {
    title: '',
    titleColor: '#000000',
    backgroundColor: '#ffffff',
    leftIcon: <Ionicons name="ios-arrow-round-back" color="#3c4f5e" size={32} />,
    onPressLeftIcon: null,
    rightIcon: null,
    onPressRightIcon: null
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: this.props.backgroundColor }}>
        <View style={{ flex: 1 }}>
          { this.props.leftIcon &&
            <TouchableWithoutFeedback onPress={this.props.onPressLeftIcon}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                { this.props.leftIcon }
              </View>
            </TouchableWithoutFeedback>
          }
        </View>
        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, color: this.props.titleColor }}>
            { this.props.title }
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          { this.props.rightIcon &&
            <TouchableWithoutFeedback onPress={this.props.onPressRightIcon}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                { this.props.rightIcon }
              </View>
            </TouchableWithoutFeedback>
          }
        </View>
      </View>
    );
  }
}
