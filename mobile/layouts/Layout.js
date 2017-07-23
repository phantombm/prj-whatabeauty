import React, { Component } from 'react';
import { View } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';

import Header from '../components/Header';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: Constants.statusBarHeight }} />
        <View style={{ flex: 1 }}>
          <Header {...this.props} />
        </View>
        <View style={{ flex: 10 }}>
          { this.props.children }
        </View>
      </View>
    );
  }
}
