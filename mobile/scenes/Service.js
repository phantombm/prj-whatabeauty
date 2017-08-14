import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Animated, Image, WebView } from 'react-native';
import PropType from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Meteor, { createContainer } from 'react-native-meteor';

import Layout from '../layouts/Layout';
import Button from '../components/Button';

class Service extends Component {
  static propTypes = {
    service: PropType.object.isRequired,
    isRelatedServicesReady: PropType.bool.isRequired,
    relatedServices: PropType.array.isRequired
  };

  styleSheet = StyleSheet.create({
    title: {
      height: 40,
      borderBottomColor: '#eeeeee',
      borderBottomWidth: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  animatedScrollY = new Animated.Value(0);

  animatedTranslateY = this.animatedScrollY.interpolate({
    inputRange: [0, 300, 301],
    outputRange: [0, -(global.width * 11 / 16 - 100), -(global.width * 11 / 16 - 100)]
  });

  animatedHeight = this.animatedScrollY.interpolate({
    inputRange: [0, 300, 301],
    outputRange: [global.width * 11 / 16, 100, 100]
  });

  isQuantityInitialized = false;

  componentWillUpdate(nextProps) {
    if (!nextProps.isRelatedServicesReady) {
      return;
    }

    if (this.isQuantityInitialized) {
      return;
    }

    this.props.service.quantity = 1;

    this.props.relatedServices.forEach((relatedService) => {
      relatedService.quantity = 0;
    });

    this.props.service.relatedServices = this.props.relatedServices;

    this.isQuantityInitialized = true;
  }

  renderGallary = () => {
    return this.props.service.gallery.map((gallery, index) => {
      return (
        <View key={index} style={{ marginTop: 10 }}>
          <Image source={{ uri: gallery.imageUrl }} style={{ width: global.width - 32, height: (global.width - 32) * 75 / 144 }} />
          <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 10, color: '#ffffff' }}>{ gallery.description }</Text>
          </View>
        </View>
      );
    });
  };

  renderPrice = () => {
    return this.props.service.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  renderRelatedServices = () => {
    return this.props.service.relatedServices.map((relatedService) => {
      return (
        <View key={relatedService._id}>
          <Text style={{ fontSize: 12, color: '#9b9b9b' }}>{ relatedService.name }</Text>
        </View>
      );
    });
  };

  onPressReserving = () => {
    Actions.selectingServiceQuantity({
      flowType: 'initial',
      isMainService: true,
      service: this.props.service
    });
  };

  render() {
    if (!this.props.isRelatedServicesReady || !this.isQuantityInitialized) {
      return (
        <View />
      );
    }

    return (
      <Layout title={this.props.service.name} isKeyboardDismissedOnTouched={false}>
        <Animated.View style={{ height: this.animatedHeight }}>
          <Animated.Image source={{ uri: this.props.service.imageUrl }} style={{ width: global.width, height: global.width * 11 / 16, transform: [{ translateY: this.animatedTranslateY }] }} />
          <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, color: '#ffffff' }}>{ this.props.service.name } | { this.renderPrice() }</Text>
          </View>
        </Animated.View>
        <ScrollView
          bounces={false}
          scrollEventThrottle={1}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.animatedScrollY } } }])}
        >
          <View style={this.styleSheet.title}>
            <Text style={{ color: '#3c4f5e' }}>서비스 내용</Text>
          </View>
          <View style={{ marginTop: 10, height: 100 }}>
            <WebView scrollEnabled={false} source={{ html: this.props.service.description.content }} />
          </View>
          <View style={this.styleSheet.title}>
            <Text style={{ color: '#3c4f5e' }}>진행 과정</Text>
          </View>
          <View style={{ marginTop: 10, height: 170 }}>
            <WebView scrollEnabled={false} source={{ html: this.props.service.description.progress }} />
          </View>
          { this.props.service.relatedServiceIds.length > 0 &&
            <View>
              <View style={this.styleSheet.title}>
                <Text style={{ color: '#3c4f5e' }}>관련 서비스</Text>
              </View>
              <View style={{ marginTop: 10, paddingLeft: 8 }}>
                { this.renderRelatedServices() }
              </View>
            </View>
          }
          <View style={this.styleSheet.title}>
            <Text style={{ color: '#3c4f5e' }}>갤러리</Text>
          </View>
          { this.renderGallary() }
        </ScrollView>
        <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressReserving}>예약하기</Button>
      </Layout>
    );
  }
}

export default createContainer((props) => {
  const servicesHandle = Meteor.subscribe('services', {
    _id: {
      $in: props.service.relatedServiceIds
    }
  });

  return {
    isRelatedServicesReady: servicesHandle.ready(),
    relatedServices: Meteor.collection('services').find({
      _id: {
        $in: props.service.relatedServiceIds
      }
    })
  };
}, Service);
