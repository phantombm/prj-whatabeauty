import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Animated } from 'react-native';
import PropType from 'prop-types';

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
    return (<View />);
  };

  render() {
    return (
      <Layout title={this.props.service.title} isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <Animated.View style={{ height: this.animatedHeight }}>
            <Animated.Image source={{ uri: this.props.service.imageUrl }} style={{ width: '100%', height: 260, transform: [{ translateY: this.animatedTranslateY }] }} />
            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, color: '#ffffff' }}>본식 메이크업 | 300,000원</Text>
            </View>
          </Animated.View>
          <ScrollView bounces={false} scrollEventThrottle={1} contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.animatedScrollY } } }])}>
            <View style={styleSheet.title}>
              <Text style={{ color: '#3c4f5e' }}>서비스 내용</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>신랑 신부 모두에게 서비스를 제공하는 세트 상품으로 두사람의 본식 메이크업을 저렴하고 합리적으로 제공받을 수 있는 서비스 입니다. 등등의 서비스 내용이 적히는 공간입니다.</Text>
            </View>
            <View style={styleSheet.title}>
              <Text style={{ color: '#3c4f5e' }}>진행 과정</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>상품을 등록하기 전에 채팅을 통해서 건 전화를 통해서 건 상담을 꼼꼼하게 받은 다음에 필요한 정보들을 차근차근 입력하고 예약하면 예약한 시간과 장소에 찾아가서 서비스를 진행한다는 일련의 과정들을 설명하는 공간입니다.</Text>
            </View>
            <View style={styleSheet.title}>
              <Text style={{ color: '#3c4f5e' }}>관련 서비스</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>
                웨딩 본식 메이크업{'\n'}
                혼주 메이크업
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>
                웨딩 본식 메이크업{'\n'}
                혼주 메이크업
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>
                웨딩 본식 메이크업{'\n'}
                혼주 메이크업
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>
                웨딩 본식 메이크업{'\n'}
                혼주 메이크업
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
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
          <Button buttonStyle={{ borderRadius: 0 }}>예약하기</Button>
        </View>
      </Layout>
    );
  }
}
