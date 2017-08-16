import React, { Component } from 'react';
import { Text, View, Image, Share } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Constants } from 'expo';
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import Meteor, { createContainer } from 'react-native-meteor';

import Touchable from '../components/Touchable';

class DrawerContent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    closeDrawer: PropTypes.func.isRequired
  };

  onPressSharing = () => {
    Share.share({
      title: 'what a beauty!',
      message: '\n최고의 메이크업 출장 예약 어플! what a beauty를 공유합니다!\nhttp://naver.com'
    });
  };

  render() {
    if (!this.props.user.profile) {
      return (
        <View />
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: global.keyColor, paddingBottom: 30 }}>
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
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 30 }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>Home</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.reservations({ flowType: 'from main' }); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 30 }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>예약내역</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.notices(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 30 }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>공지사항</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.faqs(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 30 }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>FAQ</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={this.onPressSharing}>
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 30 }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>앱 공유하기</Text>
              </View>
            </Touchable>
          </View>
          <View style={{ height: 50 }}>
            <Touchable onPress={() => { Actions.settings(); this.props.closeDrawer(); }}>
              <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 30 }}>
                <Text style={{ color: '#ffffff', fontSize: 18 }}>환경설정</Text>
              </View>
            </Touchable>
          </View>
          { Meteor.user().profile.isSsam ||
            <View style={{ height: 50 }}>
              <Touchable onPress={() => { Actions.main(); this.props.closeDrawer(); }}>
                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 30 }}>
                  <Text style={{ color: '#ffffff', fontSize: 18 }}>쌤 등록하기</Text>
                </View>
              </Touchable>
            </View>
          }
          { Meteor.user().profile.isSsam &&
            <View style={{ height: 50 }}>
              <Touchable onPress={() => { Actions.menuForSsam(); this.props.closeDrawer(); }}>
                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 30 }}>
                  <Text style={{ color: '#ffffff', fontSize: 18 }}>쌤 메뉴</Text>
                </View>
              </Touchable>
            </View>
          }
        </View>
        <View style={{ height: 50, paddingLeft: 30 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#ffffff', fontSize: 16 }}>
              { this.props.user.profile.isSsam ?
                this.props.user.profile.informationForSsam.name :
                this.props.user.profile.name
              }
            </Text>
            { this.props.user.profile.isSsam &&
              <Image source={require('../assets/images/ssam_badge.png')} style={{ width: 25, height: 23, marginLeft: 10 }} />
            }
            <Touchable onPress={() => { Actions.account(); this.props.closeDrawer(); }}>
              <View style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                <SimpleLineIcons name="pencil" size={18} color="#ffffff" />
              </View>
            </Touchable>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#ffffff', fontSize: 11 }}>{ this.props.user.profile.email }</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user() || {}
  };
}, DrawerContent);
