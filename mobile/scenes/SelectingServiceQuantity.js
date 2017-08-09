import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import Layout from '../layouts/Layout';
import IconButton from '../components/IconButton';
import Button from '../components/Button';

export default class SelectingServiceQuantity extends Component {
  static propTypes = {
    flowType: PropTypes.string.isRequired,
    isMainService: PropTypes.bool.isRequired,
    service: PropTypes.object.isRequired,
    relatedServiceIndex: PropTypes.number
  };

  static defaultProps = {
    relatedServiceIndex: 0
  };

  state = {
    quantity: this.props.isMainService ? this.props.service.quantity : this.props.service.relatedServices[this.props.relatedServiceIndex].quantity,
    isMinusButtonActive: this.props.isMainService ? (this.props.service.quantity < 2 ? false : true) : (this.props.service.relatedServices[this.props.relatedServiceIndex].quantity < 1 ? false : true),
    isPlusButtonActive: true
  };

  onPressRightIcon = () => {
    Actions.pop();
  };

  onPressMinus = () => {
    let isMinusButtonActive = true;

    if (this.state.quantity == (this.props.isMainService ? 2 : 1)) {
      isMinusButtonActive = false;
    }

    this.setState((previousState) => {
      return {
        quantity: previousState.quantity - 1,
        isMinusButtonActive: isMinusButtonActive,
        isPlusButtonActive: true
      };
    });
  };

  onPressPlus = () => {
    let isPlusButtonActive = true;

    if (this.state.quantity == 98) {
      isPlusButtonActive = false;
    }

    this.setState((previousState) => {
      return {
        quantity: previousState.quantity + 1,
        isMinusButtonActive: true,
        isPlusButtonActive: isPlusButtonActive
      };
    });
  };

  renderServiceCommentsForReserving = () => {
    const commentsForReserving = this.props.isMainService ? _.sortBy(this.props.service.commentsForReserving, ['ordering']) : _.sortBy(this.props.service.relatedServices[this.props.relatedServiceIndex].commentsForReserving, ['ordering']);

    return commentsForReserving.map((comment, index) => {
      return (
        <View key={index} style={{ flexDirection: 'row', paddingLeft: 20, marginTop: index == 0 ? 5 : 0 }}>
          <View>
            <Ionicons name="ios-checkmark" size={30} color="#fd614d" style={{ marginTop: -7 }} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 12, color: '#3c4f5e' }}>{ comment.comment }</Text>
          </View>
        </View>
      );
    });
  };

  renderPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.props.service.price.unit;
  };

  onPressSelectingServiceQuantity = () => {
    if (this.props.flowType == 'initial') {
      this.props.service.quantity = this.state.quantity;

      Actions.reserving({
        service: this.props.service
      });
    }
    else if (this.props.flowType == 'popup') {
      if (this.props.isMainService) {
        this.props.service.quantity = this.state.quantity;
      }
      else {
        this.props.service.relatedServices[this.props.relatedServiceIndex].quantity = this.state.quantity;
      }

      Actions.pop({
        refresh: {
          service: this.props.service
        }
      });
    }
  };

  render() {
    return (
      <Layout title={this.props.isMainService ? this.props.service.name : this.props.service.relatedServices[this.props.relatedServiceIndex].name} leftIcon={<View />} onPressLeftIcon={() => {}} rightIcon={<Ionicons name="ios-close-outline" size={50} />} onPressRightIcon={this.onPressRightIcon}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 260 }}>
            <Image source={{ uri: this.props.isMainService ? this.props.service.imageUrl : this.props.service.relatedServices[this.props.relatedServiceIndex].imageUrl }} style={{ width: '100%', height: 260 }} />
            <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, color: '#ffffff' }}>{ this.props.isMainService ? this.props.service.name : this.props.service.relatedServices[this.props.relatedServiceIndex].name } | { this.renderPrice(this.props.isMainService ? this.props.service.price.amount : this.props.service.relatedServices[this.props.relatedServiceIndex].price.amount) }</Text>
            </View>
          </View>
          <View style={{ flex: 1, padding: 16, paddingBottom: 0 }}>
            <View style={{ height: 1, backgroundColor: '#eeeeee' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <IconButton backgroundColor="#fd5739" borderRadius={30} inactiveBackgroundColor="#e0e0e1" onPress={this.onPressMinus} isActive={this.state.isMinusButtonActive}>
                <MaterialCommunityIcons name="minus" size={25} color="#ffffff" />
              </IconButton>
              <Text style={{ fontSize: 22, color: '#24253d' }}>{ this.state.quantity }</Text>
              <IconButton backgroundColor="#fd5739" borderRadius={30} inactiveBackgroundColor="#e0e0e1" onPress={this.onPressPlus} isActive={this.state.isPlusButtonActive}>
                <MaterialCommunityIcons name="plus" size={25} color="#ffffff" />
              </IconButton>
            </View>
            <View style={{ height: 1, backgroundColor: '#eeeeee' }} />
            <View style={{ flex: 5, justifyContent: 'center' }}>
              { this.renderServiceCommentsForReserving() }
            </View>
            <View style={{ height: 1, backgroundColor: '#eeeeee' }} />
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#3c4f5e' }}>총 금액 : { this.renderPrice(this.props.isMainService ? this.props.service.price.amount * this.state.quantity : this.props.service.relatedServices[this.props.relatedServiceIndex].price.amount * this.state.quantity) }</Text>
            </View>
          </View>
          <View>
            <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressSelectingServiceQuantity}>선택하기</Button>
          </View>
        </View>
      </Layout>
    );
  }
}
