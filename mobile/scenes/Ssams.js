import React, { Component } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import PropType from 'prop-types';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import Meteor, { createContainer } from 'react-native-meteor';
import StarRating from 'react-native-star-rating';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

class Ssams extends Component {
  static propTypes = {
    service: PropType.object.isRequired,
    ssams: PropType.array.isRequired
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
          <View>
            <Image source={{ uri: informationForSsam.imageUrl }} style={{ width: '100%', height: 130 }} />
          </View>
          <View style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 1, borderColor: '#eeeeee', flex: 1, justifyContent: 'center', paddingVertical: 7, paddingHorizontal: 10 }}>
            <View>
              <Text style={{ fontSize: 13, color: '#666666' }}>{ informationForSsam.name }</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, color: '#3c4f5e' }}>{ informationForSsam.region } | 경력 { informationForSsam.career }년</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, color: '#9b9b9b' }}>{ informationForSsam.comment }</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <StarRating disabled maxStars={5} rating={parseFloat(average)} starSize={10} starColor="#f5d56e" emptyStarColor="#f5d56e" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, color: '#fd614d', textAlign: 'right' }}>{average} ({ this.renderGradesLenght(informationForSsam) })</Text>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    );
  };

  onPressSsam = (ssam) => {
    Actions.ssam({
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

  renderGradesLenght = (informationForSsam) => {
    const length = informationForSsam.reviews.length;

    if (length > 99) {
      return length + '+';
    }
    else {
      return length;
    }
  };

  render() {
    let ssams = this.props.ssams;

    // ssams  = _.sortBy(ssams, [(ssam) => { return -service.ordering; }, 'createAt']);

    return (
      <Layout title="예약 가능한 쌤" isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <FlatList data={ssams} keyExtractor={this.keyExtractor} renderItem={this.renderSsam} numColumns={2} contentContainerStyle={{ paddingRight: 16, paddingBottom: 16 }} />
        </View>
      </Layout>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('ssams.all');

  return {
    ssams: Meteor.collection('users').find({
      'profile.isSsam': true
    })
  };
}, Ssams);
