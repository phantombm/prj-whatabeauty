import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import Layout from '../layouts/Layout';
import IconButton from '../components/IconButton';
import Button from '../components/Button';

export default class SelectingServiceQuantity extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired
  };

  state = {
    quantity: 1,
    isMinusButtonActive: false,
    isPlusButtonActive: true
  };

  renderPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.props.service.price.unit;
  };

  onPressRightIcon = () => {
    Actions.pop();
  };

  onPressMinus = () => {
    if (this.state.quantity == 2) {
      this.setState({
        isMinusButtonActive: false
      });
    }

    this.setState((previousState) => {
      return {
        quantity: previousState.quantity - 1
      };
    });
  };

  onPressPlus = () => {
    this.setState((previousState) => {
      return {
        quantity: previousState.quantity + 1,
        isMinusButtonActive: true
      };
    });
  };

  onPressConfirm = () => {
    Actions.reserving();
  };

  render() {
    return (
      <Layout title={this.props.service.name} leftIcon={<View />} onPressLeftIcon={() => {}} rightIcon={<Ionicons name="ios-close-outline" size={50} />} onPressRightIcon={this.onPressRightIcon}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 260 }}>
            <Image source={{ uri: this.props.service.imageUrl }} style={{ width: '100%', height: 260 }} />
            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, color: '#ffffff' }}>{ this.props.service.name } | { this.renderPrice(this.props.service.price.amount) }</Text>
            </View>
          </View>
          <View style={{ flex: 1, padding: 16, paddingBottom: 0 }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#eeeeee' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <IconButton backgroundColor="#fd5739" borderRadius={30} inactiveBackgroundColor="#e0e0e1" onPress={this.onPressMinus} isActive={this.state.isMinusButtonActive}>
                <MaterialCommunityIcons name="minus" size={25} color="#ffffff" />
              </IconButton>
              <Text style={{ fontSize: 22, color: '#24253d' }}>{ this.state.quantity }</Text>
              <IconButton backgroundColor="#fd5739" borderRadius={30} inactiveBackgroundColor="#e0e0e1" onPress={this.onPressPlus} isActive={this.state.isPlusButtonActive}>
                <MaterialCommunityIcons name="plus" size={25} color="#ffffff" />
              </IconButton>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#eeeeee' }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', paddingLeft: 20, marginTop: 5 }}>
                <View>
                  <Ionicons name="ios-checkmark" size={30} color="#fd614d" style={{ marginTop: -7 }} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontSize: 12, color: '#3c4f5e' }}>신랑 신부 2인 모두에게 서비스 합니다.</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                <View>
                  <Ionicons name="ios-checkmark" size={30} color="#fd614d" style={{ marginTop: -7 }} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontSize: 12, color: '#3c4f5e' }}>신랑 신부 2인 모두에게 서비스 합니다.</Text>
                </View>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#eeeeee' }} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#3c4f5e' }}>총 금액 : { this.renderPrice(this.props.service.price.amount * this.state.quantity) }</Text>
            </View>
          </View>
          <View>
            <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressConfirm}>선택하기</Button>
          </View>
        </View>
      </Layout>
    );
  }
}
