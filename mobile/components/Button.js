import React, { Component } from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    inactiveBackgroundColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    borderRadius: PropTypes.number,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object,
    marginTop: PropTypes.number,
    isActive: PropTypes.bool,
    onPress: PropTypes.func
  };

  static defaultProps = {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    inactiveBackgroundColor: '#efefef',
    inactiveTextColor: '#ffffff',
    borderRadius: 3,
    buttonStyle: {},
    textStyle: {},
    marginTop: 0,
    isActive: true,
    onPress: () => {}
  };

  render() {
    if (Platform.OS == 'android') {
      return (
        <TouchableNativeFeedback onPress={this.props.onPress} disabled={!this.props.isActive}>
          <View style={[{ marginTop: this.props.marginTop, alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: this.props.borderRadius, backgroundColor: this.props.isActive ? this.props.backgroundColor : this.props.inactiveBackgroundColor }, this.props.buttonStyle]}>
            <Text style={[{ color: this.props.isActive ? this.props.textColor : this.props.inactiveTextColor, fontSize: 16 }, this.props.textStyle]}>
              { this.props.children }
            </Text>
          </View>
        </TouchableNativeFeedback>
      );
    }
    else if (Platform.OS == 'ios') {
      return (
        <TouchableOpacity onPress={this.props.onPress} disabled={!this.props.isActive}>
          <View style={[{ marginTop: this.props.marginTop, alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: this.props.borderRadius, backgroundColor: this.props.isActive ? this.props.backgroundColor : this.props.inactiveBackgroundColor }, this.props.buttonStyle]}>
            <Text style={[{ color: this.props.isActive ? this.props.textColor : this.props.inactiveTextColor, fontSize: 16 }, this.props.textStyle]}>
              { this.props.children }
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}
