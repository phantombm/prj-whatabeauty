import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Meteor, { createContainer } from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import PropType from 'prop-types';
import _ from 'lodash';

import Drawer from '../components/Drawer';
import Header from '../components/Header';

class Main extends Component {
  static propTypes = {
    serviceTypes: PropType.array.isRequired
  };

  onPressLeftIcon = () => {
    this.drawerRef.openDrawer();
  };

  keyExtractor = (serviceType) => {
    return serviceType._id;
  };

  renderServiceType = ({ item }) => {
    return (
      <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableWithoutFeedback onPress={() => { this.onPressServiceType(item); }}>
          <View style={{ width: 180, height: 180, borderRadius: 90, alignItems: 'center' }}>
            <Image source={{ uri: item.imageUrl }} style={{ width: 180, height: 180, borderRadius: 90 }} />
            <View style={{ position: 'absolute', bottom: 30 }}>
              <Text style={{ backgroundColor: 'transparent', color: '#ffffff', fontSize: 20 }}>{ item.name }</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  onPressServiceType = (serviceType) => {
    Actions.services({
      serviceType: serviceType
    });
  };

  render() {
    const serviceTypes  = _.sortBy(this.props.serviceTypes, [
      'order'
    ]);

    return (
      <Drawer ref={(ref) => { this.drawerRef = ref; }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: Constants.statusBarHeight }} />
          <View style={{ height: 60 }}>
            <Header
              title="main"
              leftIcon={<Ionicons name="ios-menu" color="#1d1d1b" size={32} />}
              onPressLeftIcon={this.onPressLeftIcon}
              rightIcon={<SimpleLineIcons name="bell" color="#1d1d1b" size={26} />}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FlatList data={serviceTypes} keyExtractor={this.keyExtractor} renderItem={this.renderServiceType} />
          </View>
        </View>
      </Drawer>
    );
  }
}

export default createContainer(() => {
  return {
    serviceTypes: Meteor.collection('serviceTypes').find({})
  };
}, Main);
