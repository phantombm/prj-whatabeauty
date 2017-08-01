import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { SimpleLineIcons, EvilIcons } from '@expo/vector-icons';

import Layout from '../layouts/Layout';
import Button from '../components/Button';

export default class Reserving extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired
  };

  renderPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.props.service.price.unit;
  };

  renderService = (isMainService, service) => {
    return (
      <TouchableWithoutFeedback key={service._id} onPress={() => { Actions.selectingServiceQuantity({ flowType: 'popup', isMainService, service: service, callback: (quantity) => { service.quantity = quantity; this.forceUpdate(); } }); }}>
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
      </TouchableWithoutFeedback>
    );
  };

  renderRelatedServices = (services) => {
    return services.map((service) => {
      return this.renderService(false, service);
    });
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
            <TouchableWithoutFeedback>
              <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                <SimpleLineIcons name="home" size={23} color="#4a4a4a" />
                <Text style={{ color: '#3c4f5e', marginLeft: 20 }}>서비스를 받을 주소를 입력해 주세요.</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                <EvilIcons name="calendar" size={35} color="#4a4a4a" style={{ marginLeft: -7 }} />
                <Text style={{ color: '#3c4f5e', marginLeft: 15 }}>일정을 입력해 주세요.</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={{ height: 70, borderTopWidth: 1, borderTopColor: '#eeeeee', borderBottomWidth: 1, borderBottomColor: '#eeeeee', paddingHorizontal: 20, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <SimpleLineIcons name="pencil" size={20} color="#4a4a4a" />
                  <Text style={{ color: '#3c4f5e', marginLeft: 20 }}>특별한 요청사항이 있다면 적어주세요.</Text>
                </View>
                <View style={{ paddingLeft: 40 }}>
                  <Text style={{ fontSize: 12, color: '#cfcfcf' }}>선택사항</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <View>
            <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressReserving}>예약하기</Button>
          </View>
        </View>
      </Layout>
    );
  }
}
