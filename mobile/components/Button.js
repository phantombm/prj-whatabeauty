import React, { Component } from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object,
    inactiveButtonStyle: PropTypes.object,
    inactiveTextStyle: PropTypes.object,
    isActive: PropTypes.bool
  };

  static defaultProps = {
    buttonStyle: {},
    textStyle: {},
    inactiveButtonStyle: {},
    inactiveTextStyle: {},
    isActive: true
  };

  render() {
    return (
      <View>
        { Platform.OS == 'android' &&
          <TouchableNativeFeedback onPress={this.props.onPress} disabled={!this.props.isActive}>
            <View style={[{ alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: 3, backgroundColor: this.props.isActive ? '#000000' : '#efefef' }, this.props.isActive ? this.props.buttonStyle : this.props.inactiveButtonStyle]}>
              <Text style={[{ color: '#ffffff', fontSize: 16 }, this.props.isActive ? this.props.textStyle : this.props.inactiveTextStyle]}>
                { this.props.children }
              </Text>
            </View>
          </TouchableNativeFeedback>
        }
        { Platform.OS == 'ios' &&
          <TouchableOpacity onPress={this.props.onPress} disabled={!this.props.isActive}>
            <View style={[{ alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: 3, backgroundColor: this.props.isActive ? '#000000' : '#efefef' }, this.props.isActive ? this.props.buttonStyle : this.props.inactiveButtonStyle]}>
              <Text style={[{ color: '#ffffff', fontSize: 16 }, this.props.isActive ? this.props.textStyle : this.props.inactiveTextStyle]}>
                { this.props.children }
              </Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    );
  }
}
