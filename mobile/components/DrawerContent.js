import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Constants } from 'expo';
import { EvilIcons } from '@expo/vector-icons';
import Meteor from 'react-native-meteor';

import Touchable from '../components/Touchable';

export default class DrawerContent extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fd614d', paddingLeft: 30, paddingBottom: 30 }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: Constants.statusBarHeight }} />
          <View style={{ height: 60, alignItems: 'flex-end', justifyContent: 'center' }}>
            <Touchable onPress={this.props.closeDrawer}>
              <View style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}>
                <EvilIcons name="close" size={50} color="#ffffff" />
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.main(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>Home</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.main(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>예약내역</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.notices(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>공지사항</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.main(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>FAQ</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.main(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>친구 초대하기</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.settings(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>환경설정</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.main(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>쌤등록하기</Text>
              </View>
            </Touchable>
          </View>
        </View>
        <View style={{ height: 50 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#ffffff', fontSize: 16 }}>
              { Meteor.user().profile.isSsam ?
                Meteor.user().profile.informationForSsam.name :
                Meteor.user().profile.name
              }
            </Text>
            { Meteor.user().profile.isSsam &&
              <Text style={{ color: '#ffffff', fontSize: 16 }}> 쌤</Text>
            }
            <Touchable onPress={this.props.closeDrawer}>
              <View style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center', marginLeft: 30 }}>
                <EvilIcons name="close" size={30} color="#ffffff" />
              </View>
            </Touchable>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#ffffff', fontSize: 11 }}>{ Meteor.user().profile.email }</Text>
          </View>
        </View>
      </View>
    );
  }
}
