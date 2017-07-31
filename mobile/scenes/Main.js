import React, { Component } from 'react';
import { View, FlatList, Image, TouchableWithoutFeedback, Text } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import PropType from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import Drawer from '../components/Drawer';
import Header from '../components/Header';

export default class Main extends Component {
  static propTypes = {
    serviceTypes: PropType.array
  };

  static defaultProps = {
    serviceTypes: [
      {
        _id: '1',
        name: 'WEDDING',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        ordering: 1,
        isVisible: true,
        isActive: true,
        createAt: moment().add(7, 'days')
      },
      {
        _id: '2',
        name: 'FAMILY1',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        ordering: 4,
        isVisible: true,
        isActive: true,
        createAt: moment()
      },
      {
        _id: '3',
        name: 'WEDDING2',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        ordering: 2,
        isVisible: true,
        isActive: true,
        createAt: moment()
      },
      {
        _id: '4',
        name: 'FAMILY2',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        ordering: 5,
        isVisible: true,
        isActive: true,
        createAt: moment()
      },
      {
        _id: '5',
        name: 'WEDDING3',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        ordering: 3,
        isVisible: true,
        isActive: true,
        createAt: moment()
      }
    ]
  };

  onPressServiceType = (serviceType) => {
    Actions.services({
      serviceType: serviceType
    });
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

  render() {
    let serviceTypes = this.props.serviceTypes;

    serviceTypes  = _.sortBy(serviceTypes, [(serviceType) => { return -serviceType.ordering; }, 'createAt']);

    serviceTypes.reverse();

    return (
      <Drawer ref={(ref) => { this.drawerRef = ref; }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: Constants.statusBarHeight }} />
          <View style={{ flex: 1 }}>
            <Header
              title="main"
              leftIcon={<Ionicons name="ios-menu" color="#1d1d1b" size={32} />}
              onPressLeftIcon={() => { this.drawerRef.openDrawer(); Meteor.logout(); }}
              rightIcon={<SimpleLineIcons name="bell" color="#1d1d1b" size={26} />}
            />
          </View>
          <View style={{ flex: 10 }}>
            <FlatList data={serviceTypes} keyExtractor={this.keyExtractor} renderItem={this.renderServiceType} />
          </View>
        </View>
      </Drawer>
    );
  }
}
