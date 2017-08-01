import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';

export default class IconButton extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    backgroundColor: PropTypes.string,
    inactiveBackgroundColor: PropTypes.string,
    borderRadius: PropTypes.number,
    buttonStyle: PropTypes.object,
    marginTop: PropTypes.number,
    isActive: PropTypes.bool,
    onPress: PropTypes.func
  };

  static defaultProps = {
    backgroundColor: '#000000',
    inactiveBackgroundColor: '#efefef',
    inactiveIconColor: '#ffffff',
    borderRadius: 3,
    buttonStyle: {},
    marginTop: 0,
    isActive: true,
    onPress: () => {}
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} disabled={!this.props.isActive} style={{ width: 70, height: 70 }}>
        <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center' }}>
          <View style={[{ overflow: 'hidden', marginTop: this.props.marginTop, alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: this.props.borderRadius, backgroundColor: this.props.isActive ? this.props.backgroundColor : this.props.inactiveBackgroundColor }, this.props.buttonStyle]}>
            { this.props.children }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
