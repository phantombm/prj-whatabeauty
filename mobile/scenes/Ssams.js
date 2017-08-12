import React, { Component } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import PropType from 'prop-types';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import Meteor, { createContainer } from 'react-native-meteor';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

class Ssams extends Component {
  static propTypes = {
    service: PropType.object.isRequired,
    ssams: PropType.array.isRequired
  };

  state = {
    orderBy: '별점순'
  };

  keyExtractor = (ssam) => {
    return ssam._id;
  };

  renderSsam = ({ item }) => {
    const informationForSsam = item.profile.informationForSsam;

    const average = this.getGradesAverage(informationForSsam);

    return (
      <Touchable onPress={() => { this.onPressSsam(item); }}>
        <View style={{ width: '50%', paddingLeft: 16, marginTop: 16 }}>
          <Image source={{ uri: informationForSsam.imageUrl }} style={{ width: (global.width - 48) / 2, height: (global.width - 48) / 2 * 6 / 7 }} />
          <View style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 1, borderColor: '#eeeeee', flex: 1, justifyContent: 'center', paddingVertical: 7, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 13, color: '#666666' }}>{ informationForSsam.name }</Text>
            <Text style={{ fontSize: 10, color: '#3c4f5e' }}>{ informationForSsam.region } | 경력 { informationForSsam.career }년</Text>
            <Text style={{ fontSize: 10, color: '#9b9b9b' }}>{ informationForSsam.comment }</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 55 }}>
                <StarRating disabled maxStars={5} rating={parseFloat(average)} starSize={10} starColor="#f5d56e" emptyStarColor="#f5d56e" />
              </View>
              <Text style={{ marginLeft: 10, fontSize: 10, color: global.keyColor }}>{average} ({ this.renderReviewsLength(informationForSsam) })</Text>
            </View>
          </View>
        </View>
      </Touchable>
    );
  };

  onPressSsam = (ssam) => {
    Actions.ssam({
      service: this.props.service,
      ssam: ssam
    });
  };

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

  onPressOrdering = () => {
    if (this.state.orderBy == '별점순') {
      this.setState({
        orderBy: '경력순'
      });
    }
    else if (this.state.orderBy == '경력순') {
      this.setState({
        orderBy: '리뷰순'
      });
    }
    else if (this.state.orderBy == '리뷰순') {
      this.setState({
        orderBy: '별점순'
      });
    }
  };

  render() {
    let ssams = null;

    if (this.state.orderBy == '별점순') {
      ssams = _.sortBy(this.props.ssams, [
        (ssam) => {
          return -this.getGradesAverage(ssam.profile.informationForSsam);
        }
      ]);
    }
    else if (this.state.orderBy == '경력순') {
      ssams = _.sortBy(this.props.ssams, [
        (ssam) => {
          return -ssam.profile.informationForSsam.career;
        }
      ]);
    }
    else if (this.state.orderBy == '리뷰순') {
      ssams = _.sortBy(this.props.ssams, [
        (ssam) => {
          return -ssam.profile.informationForSsam.reviews.length;
        }
      ]);
    }

    return (
      <Layout title="예약 가능한 쌤" isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <FlatList data={ssams} keyExtractor={this.keyExtractor} renderItem={this.renderSsam} numColumns={2} contentContainerStyle={{ paddingRight: 16, paddingBottom: 16 }} />
          <Touchable onPress={this.onPressOrdering}>
            <View
              style={{
                position: 'absolute',
                bottom: 50,
                width: 95,
                height: 35,
                borderRadius: 30,
                backgroundColor: global.keyColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 5,
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: {
                  height: 3,
                  width: 3
                }
              }}
            >
              <Ionicons name="md-list" size={20} color="#ffffff" />
              <Text style={{ marginLeft: 5, color: '#ffffff' }}>{ this.state.orderBy }</Text>
            </View>
          </Touchable>
        </View>
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    ssams: Meteor.collection('users').find({
      'profile.isSsam': true
    })
  };
}, Ssams);
