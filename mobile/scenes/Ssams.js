import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableWithoutFeedback } from 'react-native';
import PropType from 'prop-types';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import _ from 'lodash';

import Layout from '../layouts/Layout';

export default class Services extends Component {
  static propTypes = {
    service: PropType.object.isRequired,
    ssams: PropType.array.isRequired
  };

  static defaultProps = {
    ssams: [

    ]
  };

  keyExtractor = (service) => {
    return service._id;
  };

  renderService = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => { this.onPressService(item); }}>
        <View style={{ width: '50%', height: 185, paddingLeft: 16, marginTop: 16 }}>
          <View>
            <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 130 }} />
          </View>
          <View style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 1, borderColor: '#eeeeee', padding: 10, flex: 1 }}>
            <View>
              <Text style={{ fontSize: 13, color: '#666666' }}>{ item.name }</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={{ fontSize: 10, color: '#919191' }}>{ item.comment } | </Text>
              <Text style={{ fontSize: 10, color: '#fd614d' }}>{ this.renderPrice(item) }</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderPrice = (item) => {
    return item.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + item.price.unit;
  };

  onPressService = (service) => {
    Actions.service({
      service: service
    });
  };

  render() {
    let services = this.props.services;

    services  = _.sortBy(services, [(service) => { return -service.ordering; }, 'createAt']);

    services.reverse();

    return (
      <Layout title={this.props.serviceType.name} isKeyboardDismissedOnTouched={false}>
        <FlatList data={services} keyExtractor={this.keyExtractor} renderItem={this.renderService} numColumns={2} contentContainerStyle={{ paddingRight: 16, paddingBottom: 16 }} />
      </Layout>
    );
  }
}
