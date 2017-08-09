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
    if (moment(this.props.notice.createAt).diff(moment(), 'days') > 5) {
      return moment(this.props.notice.createAt).format('YYYY.MM.DD');
    }
    else {
      return moment(this.props.notice.createAt).fromNow();
    }
  };

  render() {
    return (
      <Layout title="공지사항" isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 1, backgroundColor: '#eeeeee' }} />
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <View style={{ paddingHorizontal: 30, paddingVertical: 12, borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
              <View>
                <Text style={{ color: '#3c4f5e' }}>{ this.props.notice.title }</Text>
              </View>
              <View>
                <Text style={{ color: '#cfcfcf', fontSize: 12 }}>{ this.renderDate() }</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <WebView source={{ html: this.props.notice.content }} />
            </View>
          </View>
        </View>
      </Layout>
    );
  }
}
