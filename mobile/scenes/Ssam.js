import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import PropType from 'prop-types';
import _ from 'lodash';
import Meteor, { createContainer } from 'react-native-meteor';
import moment from 'moment';

import Layout from '../layouts/Layout';
import Button from '../components/Button';

class Ssam extends Component {
  static propTypes = {
    service: PropType.object.isRequired,
    ssam: PropType.object.isRequired,
    reviews: PropType.array.isRequired
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

  renderPortfolios = (informationForSsam) => {
    return informationForSsam.portfolios.map((portfolio, index) => {
      return (
        <View key={index} style={{ marginTop: 10 }}>
          <Image source={{ uri: portfolio.imageUrl }} style={{ width: '100%', height: 180 }} />
          <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 45, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 10, color: '#ffffff' }}>{ portfolio.description }</Text>
          </View>
        </View>
      );
    });
  };

  renderReviews = () => {
    return this.props.reviews.map((review) => {
      return (
        <View key={review._id}>
          <View style={{ flexDirection: 'row', height: 50 }}>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Text>{ review.name }</Text>
              </View>
              <View>
                <StarRating disabled maxStars={5} rating={review.grade} starSize={10} starColor="#f5d56e" emptyStarColor="#f5d56e" />
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text>{ moment(review.createAt).format('YYYY.MM.DD') }</Text>
            </View>
          </View>
        </View>
      );
    });
  };

  render() {
    const informationForSsam = this.props.ssam.profile.informationForSsam;

    const average = this.getGradesAverage(informationForSsam);

    return (
      <Layout title="김활란 뮤제네프" isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ flex: 1, padding: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Image source={{ uri: informationForSsam.imageUrl }} style={{ width: 140, height: 120, borderRadius: 5 }} />
                  </View>
                  <View style={{ flex: 1, paddingVertical: 12 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <Text style={{ color: '#666666' }}>{ informationForSsam.name }</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <View>
                        <Text style={{ fontSize: 10, color: '#3c4f5e' }}>{ informationForSsam.region } | 경력 { informationForSsam.career }년</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 10, color: '#9b9b9b' }}>{ informationForSsam.comment }</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <StarRating disabled maxStars={5} rating={parseFloat(average)} starSize={10} starColor="#f5d56e" emptyStarColor="#f5d56e" />
                      </View>
                      <View style={{ flex: 2 }}>
                        <Text style={{ marginLeft: 10, fontSize: 10, color: '#fd614d' }}>{average} ({ this.renderGradesLenght(informationForSsam) })</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontSize: 12, color: '#9b9b9b' }}>{ informationForSsam.description }</Text>
                </View>
                <View style={{ height: 40, borderBottomColor: '#eeeeee', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                  <Text style={{ color: '#3c4f5e' }}>포트폴리오</Text>
                </View>
                <View>
                  { this.renderPortfolios(informationForSsam) }
                </View>
                <View style={{ height: 40, borderBottomColor: '#eeeeee', borderBottomWidth: 1, marginTop: 10, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }} />
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#3c4f5e' }}>리뷰</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, color: '#fd614d' }}>총 { informationForSsam.reviews.length }개</Text>
                  </View>
                </View>
                <View>
                  { this.renderReviews() }
                </View>
              </View>
            </ScrollView>
          </View>
          <View>
            <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressSsam}>쌤 선택하기</Button>
          </View>
        </View>
      </Layout>
    );
  }
}

export default createContainer((props) => {
  const reviewIds = props.ssam.profile.informationForSsam.reviews.map((review) => {
    return review.id;
  });

  Meteor.subscribe('reviews', {
    _id: {
      $in: reviewIds
    }
  });

  return {
    reviews: Meteor.collection('reviews').find({
      _id: {
        $in: reviewIds
      }
    })
  };
}, Ssam);
