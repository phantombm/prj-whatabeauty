import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';
import { Entypo, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Actions, ActionConst } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

class Account extends Component {
  static propTypes = {
    user: ProTypes.object.isRequired
  };

  renderAddresses = () => {
    return this.props.user.profile.addresses.map((address, index) => {
      return (
        <Touchable key={index} onPress={() => { this.onPressAddress(index) }}>
          <View style={{ height: 60, flexDirection: 'row', borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
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

  onPressAddress = (index) => {
    Actions.enteringAddress({
      flowType: 'editing',
      addressesIndex: index
    });
  };

  render() {
    return (
      <Layout title="계정관리" isKeyboardDismissedOnTouched={false}>
        <View style={{ height: 140, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa' }}>
          <Text style={{ fontSize: 16, color: '#3c4f5e' }}>{ this.props.user.profile.name }</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ fontSize: 12, color: '#3c4f5e' }}>{ this.props.user.profile.email }</Text>
            { this.props.user.profile.signInType == 'facebook' &&
              <Entypo name="facebook-with-circle" color="#4267b2" size={18} style={{ marginLeft: 5 }} />
            }
            { this.props.user.profile.signInType == 'google' &&
              <FontAwesome name="google-plus-official" color="#dd4b39" size={21} style={{ marginLeft: 5 }} />
            }
          </View>
          <Text style={{ fontSize: 12, color: '#3c4f5e' }}>{ this.props.user.profile.phoneNumber }</Text>
          <Touchable onPress={Actions.updatingInformation}>
            <View style={{ width: 45, height: 45, alignItems: 'center', justifyContent: 'center' }}>
              <SimpleLineIcons name="pencil" size={18} color="#3c4f5e" />
            </View>
          </Touchable>
        </View>
        { this.props.user.profile.signInType == 'password' &&
          <Touchable onPress={Actions.changingPassword}>
            <View style={{ height: 60, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eeeeee', borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
              <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
                <Text>비밀번호 변경하기</Text>
              </View>
              <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
                <SimpleLineIcons name="arrow-right" size={23} />
              </View>
            </View>
          </Touchable>
        }
        <Touchable onPress={() => { Meteor.logout(); Actions.signIn({ type: ActionConst.RESET }); }}>
          <View style={{ height: 60, flexDirection: 'row', borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
            <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
              <Text>로그아웃</Text>
            </View>
          </View>
        </Touchable>
        <Touchable>
          <View style={{ height: 60, flexDirection: 'row', borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
            <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
              <Text>회원 탈퇴하기</Text>
            </View>
            <View style={{ flex: 1, paddingRight: 16, alignItems: 'flex-end', justifyContent: 'center' }}>
              <SimpleLineIcons name="arrow-right" size={23} />
            </View>
          </View>
        </Touchable>
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
          <View style={{ height: 60 }} />
        </ScrollView>
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user()
  };
}, Account);
