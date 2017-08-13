import React, { Component } from 'react';
import { View, Text, WebView } from 'react-native';
import ProTypes from 'prop-types';
import moment from 'moment';

import Layout from '../layouts/Layout';

export default class Notice extends Component {
  static propTypes = {
    notice: ProTypes.object.isRequired
  };

  renderDate = () => {
    if (moment(this.props.notice.createdAt).diff(moment(), 'days') < 5) {
      return moment(this.props.notice.createdAt).fromNow();
    }
    else {
      return moment(this.props.notice.createdAt).format('YYYY.MM.DD');
    }
  };

  render() {
    return (
      <Layout title="공지사항" isKeyboardDismissedOnTouched={false}>
        <View style={{ height: 1, backgroundColor: '#eeeeee' }} />
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <View style={{ justifyContent: 'center', paddingHorizontal: 30, height: 60, borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
            <Text style={{ color: '#3c4f5e' }}>{ this.props.notice.title }</Text>
            <Text style={{ color: '#cfcfcf', fontSize: 12 }}>{ this.renderDate() }</Text>
          </View>
          <WebView source={{ html: this.props.notice.content }} />
        </View>
      </Layout>
    );
  }
}
