import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';

import Layout from '../layouts/Layout';

class TermsOfService extends Component {
  static propTypes = {
    documentsForManagement: ProTypes.array.isRequired
  };

  render() {
    if (this.props.documentsForManagement[0]) {
      return (
        <Layout title={this.props.documentsForManagement[0].title} isKeyboardDismissedOnTouched={false}>
          <View style={{ flex: 1, padding: 30 }}>
            <WebView source={{ html: this.props.documentsForManagement[0].content }} />
          </View>
        </Layout>
      );
    }
    else {
      return (
        <View />
      );
    }
  }
}

export default createContainer(() => {
  Meteor.subscribe('documentsForManagement', {});

  return {
    documentsForManagement: Meteor.collection('documentsForManagement').find({
      type: 'terms of service'
    })
  };
}, TermsOfService);
