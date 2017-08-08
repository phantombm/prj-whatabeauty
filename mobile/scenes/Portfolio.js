import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { ScreenOrientation } from 'expo';

import Layout from '../layouts/Layout';

export default class Portfolio extends Component {
  static propTypes = {
    portfolio: PropTypes.object.isRequired
  };

  componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_LEFT);
  }

  onPressRightIcon = () => {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);

    Actions.pop();
  };

  render() {
    return (
      <Layout title="포트폴리오" leftIcon={<View />} onPressLeftIcon={() => {}} rightIcon={<Ionicons name="ios-close-outline" size={50} />} onPressRightIcon={this.onPressRightIcon}>
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View>
            <Image source={{ uri: this.props.portfolio.imageUrl }} style={{ width: '100%', height: '100%' }} />
            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 10, color: '#ffffff' }}>{ this.props.portfolio.description }</Text>
            </View>
          </View>
        </View>
      </Layout>
    );
  }
}
