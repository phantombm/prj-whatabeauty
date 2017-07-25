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
    onPress: PropTypes.func,
    icon: PropTypes.element
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
    onPress: () => {},
    icon: null
  };

  render() {
    if (Platform.OS == 'android') {
      return (
        <TouchableNativeFeedback onPress={this.props.onPress} disabled={!this.props.isActive}>
          <View style={[{ marginTop: this.props.marginTop, alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: this.props.borderRadius, backgroundColor: this.props.isActive ? this.props.backgroundColor : this.props.inactiveBackgroundColor }, this.props.buttonStyle]}>
            <Text style={[{ color: this.props.isActive ? this.props.textColor : this.props.inactiveTextColor, fontSize: 16 }, this.props.textStyle]}>
              { this.props.children }
            </Text>
            { this.props.icon &&
              <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 9, left: 0, width: 50, height: 28, borderRightWidth: 1, borderRightColor: 'rgba(0, 0, 0, 0.1)' }}>
                { this.props.icon }
              </View>
            }
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
            { this.props.icon &&
              <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 9, left: 0, width: 50, height: 28, borderRightWidth: 1, borderRightColor: 'rgba(0, 0, 0, 0.1)' }}>
                { this.props.icon }
              </View>
            }
          </View>
        </TouchableOpacity>
      );
    }
  }
}
