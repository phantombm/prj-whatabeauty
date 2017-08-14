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

  renderAddresses = () => {
    return this.props.user.profile.addresses.map((address, index) => {
      return (
        <Touchable key={index} onPress={() => { this.onPressAddress(address) }}>
          <View style={{ height: 60, flexDirection: 'row', borderTopColor: '#eeeeee', borderTopWidth: index == 0 ? 1 : 0, borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
            <View style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome name="map-marker" size={20} color={global.keyColor} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: '#9b9b9b' }}>{ address.address }</Text>
              <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ address.detail }</Text>
            </View>
          </View>
        </Touchable>
      );
    });
  };

  onPressAddress = (address) => {
    this.props.service.address = address;

    Actions.pop({
      refresh: {
        service: this.props.service
      }
    });
  };

  render() {
    return (
      <Layout title="주소 선택하기" isKeyboardDismissedOnTouched={false}>
        <ScrollView>
          { this.renderAddresses() }
          <Touchable onPress={() => { Actions.enteringAddress({ flowType: 'adding' }); }}>
            <View style={{ height: 60, flexDirection: 'row', borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
              <View style={{ width: 40 }} />
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: global.keyColor }}>+ 주소 추가하기</Text>
              </View>
            </View>
          </Touchable>
        </ScrollView>
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user()
  }
}, SelectingAddress);
