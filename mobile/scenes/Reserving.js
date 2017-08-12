import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { SimpleLineIcons, EvilIcons } from '@expo/vector-icons';

import Layout from '../layouts/Layout';
import Button from '../components/Button';
import Touchable from '../components/Touchable';

export default class Reserving extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired
  };

  renderService = (isMainService, service, relatedServiceIndex) => {
    return (
      <Touchable key={service._id} onPress={() => { this.onPressService(isMainService, relatedServiceIndex); }}>
        <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20 }}>
          <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center' }}>
            <View>
              { isMainService ?
                <Text style={{ fontSize: 16, color: '#3c4f5e', fontWeight: 'bold' }}>{ service.name }</Text> :
                <Text style={{ color: '#3c4f5e' }}>{ service.name }</Text>
              }
            </View>
            { service.quantity != 0 &&
              <View style={{ backgroundColor: global.keyColor, borderRadius: 10, height: 20, paddingHorizontal: 5, marginLeft: 5, overflow: 'hidden', justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff' }}>x{ service.quantity }</Text>
              </View>
            }
          </View>
          { service.quantity == 0 ?
            <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text style={{ color: global.keyColor }}>+ 추가</Text>
            </View> :
            <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: global.keyColor }}>{ this.renderPrice(service.price.amount * service.quantity) }</Text>
            </View>
          }
        </View>
      </Touchable>
    );
  };

  onPressService = (isMainService, relatedServiceIndex) => {
    Actions.selectingServiceQuantity({
      flowType: 'popup',
      isMainService: isMainService,
      service: this.props.service,
      relatedServiceIndex: relatedServiceIndex
    });
  };

  renderPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  renderRelatedServices = () => {
    return this.props.service.relatedServices.map((relatedService, index) => {
      return this.renderService(false, relatedService, index);
    });
  };

  renderMemo = () => {
    let memo = this.props.service.memo;

    if (!memo) {
      return '선택사항';
    }

    if (/\n/.test(memo)) {
      memo = memo.replace(/\n/g, '/');
    }

    if (memo.length > 20) {
      memo = memo.substr(0, 20) + ' ... (생략)';
    }

    return memo;
  };

  onPressReserving = () => {
    Actions.ssams({
      service: this.props.service
    });
  };

  validate = () => {
    if (!this.props.service.address) {
      return false;
    }

    if (!this.props.service.scheduledAt) {
      return false;
    }

    return true;
  };

  render() {
    const isValid = this.validate();

    return (
      <Layout title="예약하기" isKeyboardDismissedOnTouched={false}>
        <ScrollView>
          { this.renderService(true, this.props.service, 0) }
          { this.renderRelatedServices() }
          <View style={{ minHeight: 100, borderTopWidth: 1, borderTopColor: '#eeeeee', paddingLeft: 20, justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, color: '#cfcfcf' }}>아직 할인 혜택이 없습니다.</Text>
          </View>
          <Touchable onPress={() => { Actions.selectingAddress({ service: this.props.service }) }}>
            <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row' }}>
              <View style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
                <SimpleLineIcons name="home" size={23} color="#4a4a4a" />
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                { !this.props.service.address ?
                  <Text style={{ color: '#3c4f5e' }}>서비스를 받을 주소를 입력해 주세요.</Text> :
                  <View>
                    <Text style={{ color: '#3c4f5e' }}>{ this.props.service.address.address }</Text>
                    <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ this.props.service.address.detail }</Text>
                  </View>
                }
              </View>
            </View>
          </Touchable>
          <Touchable onPress={() => { Actions.selectingDateTime({ service: this.props.service }) }}>
            <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row' }}>
              <View style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
                <EvilIcons name="calendar" size={35} color="#4a4a4a" />
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                { !this.props.service.scheduledAt ?
                  <Text style={{ color: '#3c4f5e' }}>일정을 입력해 주세요.</Text> :
                  <View>
                    <Text style={{ color: '#3c4f5e' }}>{ this.props.service.scheduledAt.format('YYYY년 M월 D일 dddd') }</Text>
                    <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ this.props.service.scheduledAt.format('H시 m분') }</Text>
                  </View>
                }
              </View>
            </View>
          </Touchable>
          <Touchable onPress={() => { Actions.writingMemo({ service: this.props.service }) }}>
            <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row' }}>
              <View style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
                <SimpleLineIcons name="pencil" size={20} color="#4a4a4a" />
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#3c4f5e' }}>특별한 요청사항이 있다면 적어주세요.</Text>
                <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ this.renderMemo() }</Text>
              </View>
            </View>
          </Touchable>
        </ScrollView>
        <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressReserving} isActive={isValid}>예약하기</Button>
      </Layout>
    );
  }
}
