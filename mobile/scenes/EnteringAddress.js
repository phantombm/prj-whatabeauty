import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView, Location, Permissions } from 'expo';

import Layout from '../layouts/Layout';

export default class EnteringAddress extends Component {
  state = {
    position: null,
    markerPosition: null
  };

  componentDidMount() {
    this.getCurrentPositionAsync();
  }

  getCurrentPositionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status != 'granted') {
      return;
    }

    const position = await Location.getCurrentPositionAsync({});

    this.setState({
      position: position
    });
  };

  render() {
    return (
      <Layout>
        <View style={{ flex: 1 }}>
          { this.state.position &&
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: this.state.position.coords.latitude,
                longitude: this.state.position.coords.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002
              }}
            >
              <MapView.Marker
                draggable
                coordinate={{
                  latitude: this.state.position.coords.latitude,
                  longitude: this.state.position.coords.longitude
                }}
                onDragEnd={(event) => { this.setState({ markerPosition: event.nativeEvent.coordinate }) }}
              />
            </MapView>
          }
        </View>
      </Layout>
    );
  }
}
