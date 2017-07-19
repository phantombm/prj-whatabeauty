import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

export default class Tutorial2 extends Component {
  render() {
    const { width } = Dimensions.get('window');

    return (
      <ScrollView pagingEnabled horizontal>
        <View style={{ width: width * 5, height: '100%', flexDirection: 'row' }}>
          <View style={{ width: width, height: '100%' }}>
            <Text>1</Text>
          </View>
          <View style={{ width: width, height: '100%' }}>
            <Text>2</Text>
          </View>
          <View style={{ width: width, height: '100%' }}>
            <Text>3</Text>
          </View>
          <View style={{ width: width, height: '100%' }}>
            <Text>4</Text>
          </View>
          <View style={{ width: width, height: '100%' }}>
            <Text>5</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
