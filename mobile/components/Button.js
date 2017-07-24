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
    marginTop: 0,
    isActive: true,
    onPress: () => {}
  };

  render() {
    return (
      <View style={{ marginTop: this.props.marginTop }}>
        { Platform.OS == 'android' &&
          <TouchableNativeFeedback onPress={this.props.onPress} disabled={!this.props.isActive}>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: this.props.borderRadius, backgroundColor: this.props.isActive ? this.props.backgroundColor : this.props.inactiveBackgroundColor }}>
              <Text style={{ color: this.props.isActive ? this.props.textColor : this.props.inactiveTextColor, fontSize: 16 }}>
                { this.props.children }
              </Text>
            </View>
          </TouchableNativeFeedback>
        }
        { Platform.OS == 'ios' &&
          <TouchableOpacity onPress={this.props.onPress} disabled={!this.props.isActive}>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: this.props.borderRadius, backgroundColor: this.props.isActive ? this.props.backgroundColor : this.props.inactiveBackgroundColor }}>
              <Text style={{ color: this.props.isActive ? this.props.textColor : this.props.inactiveTextColor, fontSize: 16 }}>
                { this.props.children }
              </Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    );
  }
}
