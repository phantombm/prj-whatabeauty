import React, { Component } from 'react';
import { View, FlatList, Image, TouchableWithoutFeedback, Text } from 'react-native';
import { Constants } from 'expo';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import PropType from 'prop-types';

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
        name: '웨딩',
        title: '웨딩',
        description: '결혼에 관한 겁니다.',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        ordering: 1
      },
      {
        _id: '2',
        name: '웨딩',
        title: '웨딩',
        description: '결혼에 관한 겁니다.',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        ordering: 1
      },
      {
        _id: '3',
        name: '웨딩',
        title: '웨딩',
        description: '결혼에 관한 겁니다.',
        imageUrl: 'http://cfile4.uf.tistory.com/image/2554843C5905D7B211D7E9',
        ordering: 1
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
          <View style={{ width: 180, height: 180, borderRadius: 90, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: item.imageUrl }} style={{ width: 180, height: 180, borderRadius: 90 }} />
            <View style={{ position: 'absolute', bottom: 30 }}>
              <Text style={{ backgroundColor: 'transparent', color: '#ffffff', fontSize: 20 }}>{ item.title }</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
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
            <View style={{ flex: 1 }}>
              <FlatList data={this.props.serviceTypes} keyExtractor={this.keyExtractor} renderItem={this.renderServiceType} />
            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}
