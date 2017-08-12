import React, { Component } from 'react';
import { View, Text, TextInput, Alert, Keyboard } from 'react-native';
import { MapView } from 'expo';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Meteor from 'react-native-meteor';

import Layout from '../layouts/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import MagnetView from '../components/MagnetView';

export default class EnteringAddressDetail extends Component {
  static propTypes = {
    flowType: PropTypes.string.isRequired,
    addressesIndex: PropTypes.number,
    region: PropTypes.object.isRequired,
    markerPosition: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired
  };

  static defaultProps = {
    addressesIndex: 0
  };

  state = {
    region: this.props.region,
    markerPosition: this.props.markerPosition,
    addressDetail: '',
    memo: '',
    isValid: this.props.flowType == 'adding' ? false : true
  };

  onChangeAddressDetail = (addressDetail) => {
    this.setState({
      addressDetail: addressDetail,
      isValid: addressDetail == '' ? false : true
    });
  };

  onChangeMemo = (memo) => {
    this.setState({
      memo: memo
    });
  };

  onPressAddingAddress = () => {
    Keyboard.dismiss();

    let modifier = null;

    if (this.props.flowType == 'adding') {
      modifier = {
        $push: {
          'profile.addresses': {
            address: this.props.address,
            detail: this.state.addressDetail,
            memo: this.state.memo
          }
        }
      };
    }
    else if (this.props.flowType == 'editing') {
      modifier = {
        $set: {}
      };

      modifier.$set[`profile.addresses.${this.props.addressesIndex}`] = {
        address: this.props.address,
        detail: this.state.addressDetail,
        memo: this.state.memo
      };
    }

    Meteor.call('users.update', modifier, (error) => {
      if (error) {
        Alert.alert(
          'whatabeauty',
          error.reason,
          [{ text: '확인' }],
          { cancelable: false }
        );

        return;
      }

      Actions.pop({
        popNum: 2
      });
    });
  };

  render() {
    return (
      <Layout title="자세한 주소">
        <MagnetView style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <View style={{ flex: 1 }}>
            <MapView
              style={{ flex: 1 }}
              region={this.state.region}
              onRegionChangeComplete={(region) => { this.setState({ region: region }) }}
            >
              <MapView.Marker draggable coordinate={this.state.markerPosition} />
            </MapView>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome name="map-marker" size={20} color={global.keyColor} />
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#9b9b9b' }}>{ this.props.address }</Text>
              </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 30 }}>
              <View>
                <Input onChangeText={this.onChangeAddressDetail} placeholder="자세한주소를 입력해주세요. (동, 호수, 층수)" defaultValue={this.props.flowType == 'adding' ? '' : Meteor.user().profile.addresses[this.props.addressesIndex].detail} />
              </View>
              <View style={{ flex: 1, paddingVertical: 16 }}>
                <TextInput
                  selectionColor={global.keyColor}
                  multiline
                  autoCorrect={false}
                  autoCapitalizer="none"
                  placeholder="방문 시 요청사항이 있다면 적어주세요."
                  style={{ backgroundColor: '#fafafa', flex: 1, color: '#3c4f5e', padding: 12, fontSize: 14 }}
                  placeholderTextColor="#cfcfcf"
                  maxLength={200}
                  onChangeText={this.onChangeMemo}
                  defaultValue={this.props.flowType == 'adding' ? '' : Meteor.user().profile.addresses[this.props.addressesIndex].memo}
                />
              </View>
            </View>
          </View>
          <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressAddingAddress} isActive={this.state.isValid}>주소 저장하기</Button>
        </MagnetView>
      </Layout>
    );
  }
}
