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
        <View style={{ paddingHorizontal: 30, paddingVertical: 12, borderBottomColor: '#eeeeee', borderBottomWidth: 1, borderTopColor: '#eeeeee', borderTopWidth: index == 0 ? 1 : 0 }}>
          <View>
            <Text style={{ color: '#3c4f5e' }}>{ item.title }</Text>
          </View>
          <View>
            <Text style={{ color: '#cfcfcf', fontSize: 12 }}>{ this.renderDate(item) }</Text>
          </View>
        </View>
      </Touchable>
    );
  };

  renderDate = (item) => {
    if (moment(item.createAt).diff(moment(), 'days') > 5) {
      return moment(item.createAt).format('YYYY.MM.DD');
    }
    else {
      return moment(item.createAt).fromNow();
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
        <View style={{ flex: 1 }}>
          <FlatList data={this.props.documentsForManagement} keyExtractor={this.keyExtractor} renderItem={this.renderNotice} />
        </View>
      </Layout>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('documentsForManagement', {});

  return {
    documentsForManagement: Meteor.collection('documentsForManagement').find({
      type: 'notice'
    })
  };
}, Notices);
