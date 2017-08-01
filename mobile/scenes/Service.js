import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Animated, Image, TouchableWithoutFeedback, WebView } from 'react-native';
import PropType from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import Button from '../components/Button';

const styleSheet = StyleSheet.create({
  title: {
    height: 40,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class Service extends Component {
  static propTypes = {
    service: PropType.object.isRequired
  };

  animatedScrollY = new Animated.Value(0);

  animatedTranslateY = this.animatedScrollY.interpolate({
    inputRange: [0, 300, 301],
    outputRange: [0, -160, -160]
  });

  animatedHeight = this.animatedScrollY.interpolate({
    inputRange: [0, 300, 301],
    outputRange: [260, 100, 100]
  });

  renderGallary = () => {
    return (
      this.props.service.gallery.map((gallery, index) => {
        return (
          <View key={index} style={{ marginTop: 10 }}>
            <Image source={{ uri: gallery.imageUrl }} style={{ width: '100%', height: 180 }} />
            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 10, color: '#ffffff' }}>{ gallery.description }</Text>
            </View>
          </View>
        );
      })
    );
  };

  renderPrice = () => {
    return this.props.service.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.props.service.price.unit;
  };

  onPressReserving = () => {
    Actions.selectingServiceQuantity({
      flowType: 'initial',
      isMainService: true,
      service: this.props.service
    });
  };

  render() {
    return (
      <Layout title={this.props.service.name} isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <Animated.View style={{ height: this.animatedHeight }}>
            <Animated.Image source={{ uri: this.props.service.imageUrl }} style={{ width: '100%', height: 260, transform: [{ translateY: this.animatedTranslateY }] }} />
            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, color: '#ffffff' }}>{ this.props.service.name } | { this.renderPrice() }</Text>
            </View>
          </Animated.View>
          <ScrollView bounces={false} scrollEventThrottle={1} contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.animatedScrollY } } }])}>
            <View style={styleSheet.title}>
              <Text style={{ color: '#3c4f5e' }}>서비스 내용</Text>
            </View>
            <View style={{ marginTop: 10, height: 100 }}>
              <WebView scrollEnabled={false} source={{ html: this.props.service.description.contents }} />
            </View>
            <View style={styleSheet.title}>
              <Text style={{ color: '#3c4f5e' }}>진행 과정</Text>
            </View>
            <View style={{ marginTop: 10, height: 170 }}>
              <WebView scrollEnabled={false} source={{ html: this.props.service.description.progress }} />
            </View>
            <View style={styleSheet.title}>
              <Text style={{ color: '#3c4f5e' }}>관련 서비스</Text>
            </View>
            <View style={{ marginTop: 10, paddingLeft: 8 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>
                웨딩 본식 메이크업{'\n'}
                혼주 메이크업
              </Text>
            </View>
            <View style={styleSheet.title}>
              <Text style={{ color: '#3c4f5e' }}>갤러리</Text>
            </View>
            { this.renderGallary() }
          </ScrollView>
          <View>
            <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressReserving}>예약하기</Button>
          </View>
          {/*<View style={{ position: 'absolute', bottom: 70, right: 20 }}>*/}
          {/*<TouchableWithoutFeedback>*/}
          {/*<View style={{ width: 45, height: 45, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 3 }}>*/}
          {/*<Ionicons name="ios-arrow-round-up-outline" size={45} />*/}
          {/*</View>*/}
          {/*</TouchableWithoutFeedback>*/}
          {/*</View>*/}
        </View>
      </Layout>
    );
  }
}
