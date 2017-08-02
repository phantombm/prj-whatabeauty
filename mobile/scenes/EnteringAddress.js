/* eslint "no-undef": "off" */

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';
import { FontAwesome } from '@expo/vector-icons';

import Layout from '../layouts/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import MagnetView from '../components/MagnetView';

export default class EnteringAddress extends Component {
  state = {
    initialRegion: null,
    currentRegion: null,
    markerPosition: null,
    addressPredictions: [],
    address: '',
    addressErrorText: 'blank',
    isAddressPredictionsVisible: false
  };

  componentDidMount() {
    this.getCurrentPositionAsync();
  }

  getCurrentPositionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status != 'granted') {
      Actions.pop();

      return;
    }

    const currentPosition = await Location.getCurrentPositionAsync({});

    this.setState({
      initialRegion: {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
      },
      currentRegion: {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
      },
      markerPosition: {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude
      }
    });
  };

  geocode = async (address) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDPfFACTvvSydru2peltHH6CInpZr6336s`);

      let respondedJson = await response.json();

      this.setState({
        currentRegion: {
          latitude: respondedJson.results[0].geometry.location.lat,
          longitude: respondedJson.results[0].geometry.location.lng,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002
        },
        markerPosition: {
          latitude: respondedJson.results[0].geometry.location.lat,
          longitude: respondedJson.results[0].geometry.location.lng,
        }
      });
    } catch(error) {
      Alert.alert(
        'whatabeauty',
        error.reason,
        [{ text: '확인' }],
        { cancelable: false }
      );
    }
  };

  geocodeReversely = async (region) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?result_type=sublocality_level_2&language=ko&latlng=${region.latitude},${region.longitude}&key=AIzaSyDPfFACTvvSydru2peltHH6CInpZr6336s`);

      let respondedJson = await response.json();

      this.addressRef.setText(respondedJson.results[0].formatted_address.replace('대한민국 ', ''));
    } catch(error) {
      Alert.alert(
        'whatabeauty',
        error.reason,
        [{ text: '확인' }],
        { cancelable: false }
      );
    }
  };

  onPressGetCurrentPosition = () => {
    this.geocodeReversely(this.state.initialRegion);

    this.setState({
      currentRegion: this.state.initialRegion,
      markerPosition: {
        latitude: this.state.initialRegion.latitude,
        longitude: this.state.initialRegion.longitude
      }
    });
  };

  onChangeAddress = (address, addressErrorText) => {
    this.setState({
      address: address,
      addressErrorText: addressErrorText
    });

    if (/^[가-힣 ]+$/.test(address)) {
      this.autocompleteAddress(address);
    }
  };

  autocompleteAddress = async (address) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?language=ko&components=country:kr&input=${address}&key=AIzaSyDPfFACTvvSydru2peltHH6CInpZr6336s`);

      let respondedJson = await response.json();

      this.setState({
        addressPredictions: respondedJson.predictions
      });
    } catch(error) {
      Alert.alert(
        'whatabeauty',
        error.reason,
        [{ text: '확인' }],
        { cancelable: false }
      );
    }
  };

  onPressAddressPrediction = (addressPrediction) => {
    this.geocode(addressPrediction.description);

    this.addressRef.setText(addressPrediction.description.replace('대한민국 ', ''));

    this.setState({
      isAddressPredictionsVisible: false
    });

    Keyboard.dismiss();
  };

  renderAddressPredictions = () => {
    return this.state.addressPredictions.map((addressPrediction) => {
      return (
        <TouchableWithoutFeedback key={addressPrediction.place_id} onPress={() => { this.onPressAddressPrediction(addressPrediction); }}>
          <View style={{ flexDirection: 'row', paddingVertical: 7 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome name="map-marker" size={20} color="#cfcfcf" />
            </View>
            <View style={{ flex: 8 }}>
              <View>
                <Text style={{ color: '#9b9b9b' }}>{ addressPrediction.structured_formatting.main_text }</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ addressPrediction.structured_formatting.secondary_text ? addressPrediction.structured_formatting.secondary_text.replace('대한민국 ', '') : addressPrediction.structured_formatting.secondary_text }</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  render() {
    if (!this.state.initialRegion && !this.state.currentRegion && !this.state.markerPosition && !this.state.address) {
      return (
        <Layout title="주소">
          <View />
        </Layout>
      );
    }
    else {
      return (
        <Layout title="주소">
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <MapView
                style={{ flex: 1 }}
                region={this.state.currentRegion}
                onRegionChangeComplete={(region) => { this.setState({ currentRegion: region }) }}
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
              <MagnetView style={{ position: 'absolute', bottom: 16, width: '100%', paddingHorizontal: 30 }}>
                <Button>확인</Button>
              </MagnetView>
              <View style={{ position: 'absolute', top: 16, width: '100%', paddingHorizontal: 16 }}>
                <View style={{ backgroundColor: '#ffffff', borderRadius: 3 }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <FontAwesome name="map-marker" size={20} color="#fd614d" />
                    </View>
                    <View style={{ flex: 6 }}>
                      <Input
                        ref={(ref) => { this.addressRef = ref; }}
                        placeholder="주소"
                        onChangeText={this.onChangeAddress}
                        onFocus={() => { this.setState({ isAddressPredictionsVisible: true }); }}
                        onBlur={() => { this.setState({ isAddressPredictionsVisible: false }); }}
                      />
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                      <Button onPress={this.onPressGetCurrentPosition} buttonStyle={{ width: 58, height: 22 }} textStyle={{ fontSize: 12 }} marginTop={5}>현재위치</Button>
                    </View>
                  </View>
                  { this.state.isAddressPredictionsVisible && this.renderAddressPredictions() }
                </View>
              </View>
            </View>
          </View>
        </Layout>
      );
    }
  }
}
