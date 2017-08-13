import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import Layout from '../layouts/Layout';
import Touchable from '../components/Touchable';

class Notices extends Component {
  static propTypes = {
    documentsForManagement: ProTypes.array.isRequired
  };

  keyExtractor = (notice) => {
    return notice._id;
  };

  renderNotice = ({ item, index }) => {
    return (
      <Touchable onPress={() => { this.onPressNotice(item); }}>
        <View style={{ justifyContent: 'center', paddingHorizontal: 30, height: 60, borderBottomColor: '#eeeeee', borderBottomWidth: 1, borderTopColor: '#eeeeee', borderTopWidth: index == 0 ? 1 : 0 }}>
          <Text style={{ color: '#3c4f5e' }}>{ item.title }</Text>
          <Text style={{ color: '#cfcfcf', fontSize: 12 }}>{ this.renderDate(item) }</Text>
        </View>
      </Touchable>
    );
  };

  renderDate = (item) => {
    if (moment(item.createdAt).diff(moment(), 'days') < 5) {
      return moment(item.createdAt).fromNow();
    }
    else {
      return moment(item.createdAt).format('YYYY.MM.DD');
    }
  };

  onPressNotice = (notice) => {
    Actions.notice({
      notice: notice
    });
  };

  render() {
    return (
      <Layout title="공지사항" isKeyboardDismissedOnTouched={false}>
        <FlatList data={this.props.documentsForManagement} keyExtractor={this.keyExtractor} renderItem={this.renderNotice} />
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    documentsForManagement: Meteor.collection('documentsForManagement').find({
      type: 'notice'
    })
  };
}, Notices);
