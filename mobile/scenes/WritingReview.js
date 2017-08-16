import React, { Component } from 'react';
import { View, Text, TextInput, Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import Meteor from 'react-native-meteor';

import Layout from '../layouts/Layout';
import Button from '../components/Button';
import MagnetView from '../components/MagnetView';

export default class WritingReview extends Component {
  static propTypes = {
    reservation: PropTypes.object.isRequired
  };

  state = {
    grade: 3,
    comment: ''
  };

  onChangeComment = (comment) => {
    this.setState({
      comment: comment
    });
  };

  onPressWritingReview = () => {
    Keyboard.dismiss();

    Meteor.call('reviews.insert', {
      userId: Meteor.userId(),
      ssamId: this.props.reservation.ssamId,
      reservationId: this.props.reservation._id,
      name: Meteor.user().profile.name,
      grade: this.state.grade,
      comment: this.state.comment,
      isVisible: true,
      isActive: true,
      createdAt: new Date()
    }, (error, reviewId) => {
      if (error) {
        Alert.alert(
          'whatabeauty',
          error.reason,
          [{ text: '확인' }],
          { cancelable: false }
        );

        return;
      }

      Meteor.call('reservations.update', {
        _id: this.props.reservation._id
      }, {
        $set: {
          reviewId: reviewId
        }
      });

      // Meteor.call('users.update', {
      //   _id: this.props.reservation.ssamId
      // }, {
      //   $push: {
      //     'profile.informationForSsam.reviews': {
      //       reviewId: reviewId,
      //       grade: this.state.grade
      //     }
      //   }
      // });

      Actions.pop();
    });
  };

  onPressStar = (grade) => {
    this.setState({
      grade: grade
    });
  };

  render() {
    return (
      <Layout title="리뷰 작성">
        <View style={{ flex: 1, padding: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 180 }}>
              <StarRating maxStars={5} rating={this.state.grade} starSize={30} starColor="#f5d56e" emptyStarColor="#f5d56e" selectedStar={this.onPressStar} />
            </View>
            <Text style={{ fontSize: 11, color: '#cfcfcf', marginTop: 5 }}>별을 눌러 평가해주세요</Text>
          </View>
          <TextInput
            selectionColor={global.keyColor}
            multiline
            autoCorrect={false}
            autoCapitalizer="none"
            placeholder="내용을 입력해주세요."
            style={{ backgroundColor: '#fafafa', height: 150, color: '#3c4f5e', padding: 12, fontSize: 14, marginTop: 20 }}
            placeholderTextColor="#cfcfcf"
            maxLength={500}
            onChangeText={this.onChangeComment}
          />
        </View>
        <MagnetView>
          <Button buttonStyle={{ borderRadius: 0 }} onPress={this.onPressWritingReview}>리뷰 저장하기</Button>
        </MagnetView>
      </Layout>
    );
  }
}
