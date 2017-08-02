import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { MapView } from 'expo';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import MagnetView from '../components/MagnetView';

export default class EnteringAddressDetail extends Component {
  static propTypes = {
    region: PropTypes.object.isRequired,
    markerPosition: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired
  };

  state = {
    region: this.props.region,
    markerPosition: this.props.markerPosition,
    address: this.props.address,
    addressDetail: '',
    memo: '',
    isAddingAddressActive: false
  };

  onChangeAddressDetail = (addressDetail) => {
    this.setState({
      addressDetail: addressDetail,
      isAddingAddressActive: addressDetail == '' ? false : true
    });
  };

  onChangeMemo = (memo) => {
    this.setState({
      memo: memo
    });
  };

  onPressAddingAddress = () => {
    Actions.pop({
      popNum: 2
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
              <MapView.Marker
                draggable
                coordinate={{
                  latitude: this.state.markerPosition.latitude,
                  longitude: this.state.markerPosition.longitude
                }}
                onDragEnd={(event) => { this.setState({ markerPosition: event.nativeEvent.coordinate }) }}
              />
            </MapView>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', paddingVertical: 7 }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome name="map-marker" size={20} color="#fd614d" />
              </View>
              <View style={{ flex: 8, justifyContent: 'center' }}>
                <View>
                  <Text style={{ color: '#9b9b9b' }}>{ this.state.address }</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 30 }}>
              <View>
                <Input onChangeText={this.onChangeAddressDetail} placeholder="자세한주소를 입력해주세요. (동, 호수, 층수)" />
              </View>
              <View style={{ flex: 1, paddingVertical: 16 }}>
                <TextInput
                  selectionColor="#fd614d"
                  multiline
                  autoCorrect={false}
                  autoCapitalizer="none"
                  placeholder="방문 시 요청사항이 있다면 적어주세요."
                  style={{ backgroundColor: '#fafafa', height: '100%', color: '#3c4f5e', padding: 12 }}
                  placeholderTextColor="#cfcfcf"
                  maxLength={200}
                  onChangeText={this.onChangeMemo}
                />
              </View>
            </View>
          </View>
          <View>
            <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressAddingAddress} isActive={this.state.isAddingAddressActive}>주소 저장하기</Button>
          </View>
        </MagnetView>
      </Layout>
    );
  }
}
