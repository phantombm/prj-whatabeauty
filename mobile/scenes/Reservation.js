import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableWithoutFeedback, Linking } from 'react-native';
import { SimpleLineIcons, EvilIcons, FontAwesome, Foundation, Entypo } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';
import moment from 'moment';

import Layout from '../layouts/Layout';
import Button from '../components/Button';

export default class Reservation extends Component {
  static propTypes = {
    flowType: PropTypes.string.isRequired,
    service: PropTypes.object,
    ssam: PropTypes.object,
    reservation: PropTypes.object
  };
  
  static defaultProps = {
    service: {},
    ssam: {},
    reservation: {}
  };

  state = {
    now: moment()
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        now: moment()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getGradesAverage = (informationForSsam) => {
    const length = informationForSsam.reviews.length;

    if (length == 0) {
      return '0.0';
    }

    const sum = _.reduce(informationForSsam.reviews, (sum, review) => {
      return sum + review.grade;
    }, 0);

    return (sum / length).toFixed(1);
  };

  renderReviewsLength = (informationForSsam) => {
    const length = informationForSsam.reviews.length;

    if (length > 99) {
      return length + '+';
    }
    else {
      return length;
    }
  };

  renderService = (isMainService, service) => {
    if (service.quantity == 0) {
      return (
        <View key={service._id} />
      );
    }

    return (
      <View key={service._id} style={{ height: 60, borderBottomWidth: 1, borderBottomColor: '#eeeeee', flexDirection: 'row', paddingHorizontal: 20 }}>
        <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center' }}>
          <View>
            { isMainService &&
              <Text style={{ fontSize: 16, color: '#3c4f5e', fontWeight: 'bold' }}>{ service.name }</Text>
            }
            { !isMainService &&
              <Text style={{ color: '#3c4f5e' }}>{ service.name }</Text>
            }
          </View>
          <View style={{ backgroundColor: global.keyColor, borderRadius: 10, height: 20, paddingHorizontal: 5, marginLeft: 5, overflow: 'hidden', justifyContent: 'center' }}>
            <Text style={{ color: '#ffffff' }}>x{ service.quantity }</Text>
          </View>
        </View>
        <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, color: global.keyColor }}>{ this.renderPrice(service.price.amount * service.quantity) }</Text>
        </View>
      </View>
    );
  };

  renderPrice = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  renderRelatedServices = (service) => {
    return service.relatedServices.map((relatedService) => {
      return this.renderService(false, relatedService);
    });
  };

  getTotalAmount = (service) => {
    let totalAmount = service.price.amount * service.quantity;

    totalAmount += _.reduce(service.relatedServices, (sum, relatedService) => {
      return sum + relatedService.price.amount * relatedService.quantity;
    }, 0);

    return totalAmount;
  };

  onPressPaying = (totalAmount) => {
    Actions.paying({
      flowType: this.props.flowType,
      service: this.props.service,
      ssam: this.props.ssam,
      reservation: this.props.reservation,
      totalAmount: totalAmount
    });
  };

  render() {
    let informationForSsam = null;
    let service = null;
    let progress = null;

    if (this.props.flowType == 'from reserving') {
      informationForSsam = this.props.ssam.profile.informationForSsam;
      service = this.props.service;
      progress = 'not paid';
    }
    else if (this.props.flowType == 'from main' || this.props.flowType == 'from menuForSsam') {
      informationForSsam = this.props.reservation.ssam.profile.informationForSsam;
      service = this.props.reservation.service;
      progress = this.props.reservation.progress;

      if (progress == 'paid' && moment(service.scheduledAt).diff(moment()) < 0) {
        progress = 'waiting for approving payment';
      }
    }

    const average = this.getGradesAverage(informationForSsam);

    const totalAmount = this.getTotalAmount(service);

    const scheduledAt = moment(service.scheduledAt);

    return (
      <Layout title="예약 내용" isKeyboardDismissedOnTouched={false}>
        { this.props.flowType == 'from menuForSsam' &&
          <View style={{ height: 156, backgroundColor: global.keyColor, justifyContent: 'center', alignItems: 'center' }}>
            { scheduledAt.diff(this.state.now) > 0 &&
              <Text style={{ fontSize: 24, color: '#ffffff' }}>D - { scheduledAt.diff(this.state.now, 'days') }</Text>
            }
            { scheduledAt.diff(this.state.now) > 0 ||
              <Text style={{ fontSize: 24, color: '#ffffff' }}>D - 0</Text>
            }
            { scheduledAt.diff(this.state.now) > 0 &&
              <Text style={{ fontSize: 24, color: '#ffffff' }}>{ scheduledAt.diff(this.state.now, 'hours') % 24 } : { scheduledAt.diff(this.state.now, 'minutes') % 60 } : { scheduledAt.diff(this.state.now, 'seconds') % 60 }</Text>
            }
            { scheduledAt.diff(this.state.now) > 0 ||
              <Text style={{ fontSize: 24, color: '#ffffff' }}>00 : 00 : 00</Text>
            }
          </View>
        }
        <ScrollView>
          { this.props.flowType != 'from menuForSsam' &&
            <View style={{ flexDirection: 'row', padding: 16 }}>
              <View style={{ flex: 1 }}>
                <Image source={{ uri: informationForSsam.imageUrl }} style={{ width: 140, height: 120, borderRadius: 5 }} />
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#666666' }}>{ informationForSsam.name }</Text>
                <Text style={{ marginTop: 10, fontSize: 10, color: '#3c4f5e' }}>{ informationForSsam.region } | 경력 { informationForSsam.career }년</Text>
                <Text style={{ fontSize: 10, color: '#9b9b9b' }}>{ informationForSsam.comment }</Text>
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 55 }}>
                    <StarRating disabled maxStars={5} rating={parseFloat(average)} starSize={10} starColor="#f5d56e" emptyStarColor="#f5d56e" />
                  </View>
                  <Text style={{ marginLeft: 10, fontSize: 10, color: global.keyColor }}>{average} ({ this.renderReviewsLength(informationForSsam) })</Text>
                </View>
              </View>
            </View>
          }
          <View style={{ height: 60, borderTopWidth: 1, borderTopColor: '#eeeeee', borderBottomWidth: 1, borderBottomColor: '#eeeeee', flexDirection: 'row' }}>
            <View style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
              <SimpleLineIcons name="home" size={23} color="#4a4a4a" />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: '#3c4f5e' }}>{ service.address.address }</Text>
              <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ service.address.detail }</Text>
            </View>
          </View>
          <View style={{ height: 60, flexDirection: 'row' }}>
            <View style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
              <EvilIcons name="calendar" size={35} color="#4a4a4a" />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              { this.props.flowType == 'from reserving' &&
                <Text style={{ color: '#3c4f5e' }}>{ service.scheduledAt.format('YYYY년 M월 D일 dddd') }</Text>
              }
              { this.props.flowType != 'from reserving' &&
                <Text style={{ color: '#3c4f5e' }}>{ moment(service.scheduledAt).format('YYYY년 M월 D일 dddd') }</Text>
              }
              { this.props.flowType == 'from reserving' &&
                <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ service.scheduledAt.format('H시 m분') }</Text>
              }
              { this.props.flowType != 'from reserving' &&
                <Text style={{ fontSize: 12, color: '#cfcfcf' }}>{ moment(service.scheduledAt).format('H시 m분') }</Text>
              }
            </View>
          </View>
          <View style={{ height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: "#fafafa" }}>
            <FontAwesome name="location-arrow" size={15} color={global.keyColor} />
            <Text style={{ color: "#fd614d", marginLeft: 10 }}>이동거리 99km</Text>
          </View>
          { this.renderService(true, service) }
          { this.renderRelatedServices(service) }
          { this.props.flowType != 'from menuForSsam' &&
            <View style={{ height: 60, borderBottomWidth: 1, borderBottomColor: '#eeeeee', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#3c4f5e', fontWeight: 'bold' }}>총 금액 : { this.renderPrice(totalAmount) }</Text>
            </View>
          }
          { this.props.flowType != 'from menuForSsam' &&
            <View style={{ minHeight: 100, paddingLeft: 20, justifyContent: 'center' }}>
              <Text style={{ fontSize: 12, color: '#cfcfcf' }}>아직 할인 혜택이 없습니다.</Text>
            </View>
          }
          { this.props.flowType == 'from menuForSsam' &&
            <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }}>
              <View style={{ alignItems: 'center' }}>
                <Text>고객과의 소통</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <View style={{ alignItems: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => { Linking.openURL(`sms:${this.props.reservation.user.profile.phoneNumber}`); }}>
                    <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'rgba(155, 155, 155, 0.2)', alignItems: 'center', justifyContent: 'center' }}>
                      <FontAwesome name="envelope" size={22} color={global.keyColor} />
                    </View>
                  </TouchableWithoutFeedback>
                  <Text style={{ marginTop: 5, fontSize: 12, color: '#cfcfcf' }}>문자보내기</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => { Linking.openURL(`tel:${this.props.reservation.user.profile.phoneNumber}`); }}>
                    <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'rgba(155, 155, 155, 0.2)', alignItems: 'center', justifyContent: 'center' }}>
                      <Foundation name="telephone" size={30} color={global.keyColor} />
                    </View>
                  </TouchableWithoutFeedback>
                  <Text style={{ marginTop: 5, fontSize: 12, color: '#cfcfcf' }}>전화걸기</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => { Actions.selectingDateTime({ flowType: 'from reservation', reservation: this.props.reservation }) }}>
                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: global.keyColor, alignItems: 'center', justifyContent: 'center' }}>
                      <Entypo name="back-in-time" size={30} color="#ffffff" />
                    </View>
                  </TouchableWithoutFeedback>
                  <Text style={{ marginTop: 5, fontSize: 12, color: '#cfcfcf' }}>일정수정</Text>
                </View>
              </View>
            </View>
          }
          { this.props.flowType == 'from menuForSsam' &&
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 12, color: '#9b9b9b' }}>{ service.memo }</Text>
            </View>
          }
        </ScrollView>
        { progress == 'not paid' &&
          <Button buttonStyle={{ borderRadius: 0 }} onPress={() => { this.onPressPaying(totalAmount); }}>결제하기</Button>
        }
        { progress == 'paid' &&
          <Button buttonStyle={{ borderRadius: 0 }} onPress={() => { this.onPressPaying(totalAmount); }}>환불요청</Button>
        }
        { progress == 'waiting for approving payment' &&
          <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
            <View style={{ flex: 2 }}>
              <Button buttonStyle={{ borderRadius: 0 }} onPress={() => { this.onPressPaying(totalAmount); }}>결제승인</Button>
            </View>
            <View style={{ width: 16 }} />
            <View style={{ flex: 1 }}>
              <Button buttonStyle={{ borderRadius: 0 }} onPress={() => { this.onPressPaying(totalAmount); }}>환불요청</Button>
            </View>
          </View>
        }
        { progress == 'waiting for writing review' &&
          <Button buttonStyle={{ borderRadius: 0 }} onPress={() => { this.onPressPaying(totalAmount); }}>별점 | 리뷰</Button>
        }
      </Layout>
    );
  }
}
