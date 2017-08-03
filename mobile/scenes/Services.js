import React, { Component } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import PropType from 'prop-types';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import Meteor, { createContainer } from 'react-native-meteor';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

class Services extends Component {
  static propTypes = {
    serviceType: PropType.object.isRequired,
    services: PropType.array.isRequired
  };

  keyExtractor = (service) => {
    return service._id;
  };

  renderService = ({ item }) => {
    return (
      <Touchable onPress={() => { this.onPressService(item); }}>
        <View style={{ width: '50%', height: 185, paddingLeft: 16, marginTop: 16 }}>
          <View>
            <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 130 }} />
          </View>
          <View style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 1, borderColor: '#eeeeee', flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
            <View>
              <Text style={{ fontSize: 13, color: '#666666' }}>{ item.name }</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 10, color: '#919191' }}>{ item.comment } | </Text>
              <Text style={{ fontSize: 10, color: '#fd614d' }}>{ this.renderPrice(item) }</Text>
            </View>
          </View>
        </View>
      </Touchable>
    );
  };

  onPressService = (service) => {
    Actions.service({
      service: service
    });
  };

  renderPrice = (service) => {
    return service.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + service.price.unit;
  };

  render() {
    let services = this.props.services;

    services  = _.sortBy(services, [(service) => { return -service.ordering; }, 'createAt']);

    services.reverse();

    return (
      <Layout title={this.props.serviceType.name} isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <FlatList data={services} keyExtractor={this.keyExtractor} renderItem={this.renderService} numColumns={2} contentContainerStyle={{ paddingRight: 16, paddingBottom: 16 }} />
        </View>
      </Layout>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('services.find', {
    serviceTypeId: props.serviceType._id
  });

  return {
    services: Meteor.collection('services').find({
      serviceTypeId: props.serviceType._id
    })
  };
}, Services);
