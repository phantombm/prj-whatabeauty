import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

class SelectingAddress extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  renderAddresses = (addresses) => {
    return addresses.map((address, index) => {
      return (
        <Touchable key={index} onPress={() => { this.props.service.address = address; Actions.pop({ refresh: { service: this.props.service } }) }}>
          <View style={{ flexDirection: 'row', paddingVertical: 7, borderTopColor: '#eeeeee', borderTopWidth: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome name="map-marker" size={20} color="#fd614d" />
            </View>
            <View style={{ flex: 8 }}>
              <View>
                <Text style={{ color: '#9b9b9b' }}>{ address.address }</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ address.detail }</Text>
              </View>
            </View>
          </View>
        </Touchable>
      );
    });
  };

  render() {
    return (
      <Layout title="주소 선택하기" isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            { this.renderAddresses(this.props.user.profile.addresses) }
            <Touchable onPress={Actions.enteringAddress}>
              <View style={{ borderTopColor: '#eeeeee', borderTopWidth: 1, borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 8, paddingVertical: 16, paddingLeft: 40 }}>
                  <Text style={{ fontSize: 12, color: '#fd614d' }}>+ 주소 추가하기</Text>
                </View>
              </View>
            </Touchable>
          </ScrollView>
        </View>
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user()
  }
}, SelectingAddress);
