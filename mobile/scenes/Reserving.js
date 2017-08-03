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

  renderPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.props.service.price.unit;
  };

  renderService = (isMainService, service) => {
    return (
      <Touchable key={service._id} onPress={() => { Actions.selectingServiceQuantity({ flowType: 'popup', isMainService, service: service, callback: (quantity) => { service.quantity = quantity; this.forceUpdate(); } }); }}>
        <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20 }}>
          <View style={{ flex: 70, flexDirection: 'row', alignItems: 'center' }}>
            <View>
              { isMainService == true ?
                <Text style={{ fontSize: 16, color: '#3c4f5e', fontWeight: 'bold' }}>{ service.name }</Text> :
                <Text style={{ color: '#3c4f5e' }}>{ service.name }</Text>
              }
            </View>
            { service.quantity != 0 &&
              <View style={{ backgroundColor: '#fd614d', borderRadius: 10, height: 20, paddingHorizontal: 5, marginLeft: 5, overflow: 'hidden', justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff' }}>x{ service.quantity }</Text>
              </View>
            }
          </View>
          { service.quantity == 0 ?
            <View style={{ flex: 30, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text style={{ color: '#fd614d' }}>+ 추가</Text>
            </View> :
            <View style={{ flex: 30, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: '#fd614d' }}>{ this.renderPrice(service.price.amount * service.quantity) }</Text>
            </View>
          }
        </View>
      </Touchable>
    );
  };

  renderRelatedServices = (services) => {
    return services.map((service) => {
      return this.renderService(false, service);
    });
  };

  renderMemo = () => {
    let memo = this.props.service.memo;

    if (memo) {
      if (/\n/.test(memo)) {
        memo = memo.replace(/\n.*/, '');

        if (memo.length > 20) {
          memo = memo.substr(0, 20) + ' ... (생략)';
        }
        else {
          memo += ' ... (생략)';
        }
      }
      else {
        if (memo.length > 20) {
          memo = memo.substr(0, 20) + ' ... (생략)';
        }
      }

      return memo;
    }
    else {
      return '선택사항';
    }
  };

  onPressReserving = () => {

  };

  render() {
    return (
      <Layout title="예약하기" isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            { this.renderService(true, this.props.service) }
            { this.renderRelatedServices(this.props.service.relatedServices) }
            <View style={{ height: 120, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#cfcfcf' }}>아직 할인 혜택이 없습니다.</Text>
            </View>
            <Touchable onPress={() => { Actions.selectingAddress({ service: this.props.service }) }}>
              { this.props.service.address ?
                <View style={{ height: 70, borderTopWidth: 1, borderTopColor: '#eeeeee', paddingHorizontal: 20, justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <SimpleLineIcons name="home" size={23} color="#4a4a4a" />
                    <Text style={{ color: '#3c4f5e', marginLeft: 17 }}>{ this.props.service.address.address }</Text>
                  </View>
                  <View style={{ paddingLeft: 40 }}>
                    <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ this.props.service.address.detail }</Text>
                  </View>
                </View> :
                <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                  <SimpleLineIcons name="home" size={23} color="#4a4a4a" />
                  <Text style={{ color: '#3c4f5e', marginLeft: 20 }}>서비스를 받을 주소를 입력해 주세요.</Text>
                </View>
              }
            </Touchable>
            <Touchable onPress={() => { Actions.selectingDateTime({ service: this.props.service }) }}>
              { this.props.service.scheduledAt ?
                <View style={{ height: 70, borderTopWidth: 1, borderTopColor: '#eeeeee', paddingHorizontal: 20, justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <EvilIcons name="calendar" size={35} color="#4a4a4a" style={{ marginLeft: -7 }} />
                    <Text style={{ color: '#3c4f5e', marginLeft: 14 }}>{ this.props.service.scheduledAt.format('YYYY년 M월 D일 dddd') }</Text>
                  </View>
                  <View style={{ paddingLeft: 40 }}>
                    <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ this.props.service.scheduledAt.format('H시 m분') }</Text>
                  </View>
                </View> :
                <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                  <EvilIcons name="calendar" size={35} color="#4a4a4a" style={{ marginLeft: -7 }} />
                  <Text style={{ color: '#3c4f5e', marginLeft: 15 }}>일정을 입력해 주세요.</Text>
                </View>
              }
            </Touchable>
            <Touchable onPress={() => { Actions.writingMemo({ service: this.props.service }) }}>
              <View style={{ height: 70, borderTopWidth: 1, borderTopColor: '#eeeeee', borderBottomWidth: 1, borderBottomColor: '#eeeeee', paddingHorizontal: 20, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <SimpleLineIcons name="pencil" size={20} color="#4a4a4a" />
                  <Text style={{ color: '#3c4f5e', marginLeft: 20 }}>특별한 요청사항이 있다면 적어주세요.</Text>
                </View>
                <View style={{ paddingLeft: 40 }}>
                  <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ this.renderMemo() }</Text>
                </View>
              </View>
            </Touchable>
          </ScrollView>
          <View>
            <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressReserving}>예약하기</Button>
          </View>
        </View>
      </Layout>
    );
  }
}
