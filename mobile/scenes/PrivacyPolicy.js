import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';

import Layout from '../layouts/Layout';

class PrivacyPolicy extends Component {
  static propTypes = {
    documentsForManagement: ProTypes.array.isRequired
  };

  render() {
    return (
      <Layout title={this.props.documentsForManagement[0].title} isKeyboardDismissedOnTouched={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <WebView source={{ html: this.props.documentsForManagement[0].content }} />
        </View>
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    documentsForManagement: Meteor.collection('documentsForManagement').find({
      type: 'privacy policy'
    })
  };
}, PrivacyPolicy);
