import React, { Component } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import PropType from 'prop-types';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import Meteor, { createContainer } from 'react-native-meteor';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

class Ssams extends Component {
  static propTypes = {
    service: PropType.object.isRequired,
    ssams: PropType.array.isRequired
  };

  keyExtractor = (ssam) => {
    return ssam._id;
  };

  renderSsam = ({ item }) => {
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

  onPressSsam = (service) => {
    Actions.service({
      service: service
    });
  };

  renderPrice = (service) => {
    return service.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + service.price.unit;
  };

  render() {
    let services = this.props.ssams;

    services  = _.sortBy(services, [(service) => { return -service.ordering; }, 'createAt']);

    services.reverse();

    return (
      <Layout title="쌤 리스트" isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <FlatList data={services} keyExtractor={this.keyExtractor} renderItem={this.renderService} numColumns={2} contentContainerStyle={{ paddingRight: 16, paddingBottom: 16 }} />
        </View>
      </Layout>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('ssams.find', {});

  return {
    services: Meteor.collection('users').find({
      serviceTypeId: props.serviceType._id
    })
  };
}, Ssams);
