import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import ProTypes from 'prop-types';
import _ from 'lodash';

import Layout from '../layouts/Layout';
import Accordion from '../components/Accordion';

class Faqs extends Component {
  static propTypes = {
    documentsForManagement: ProTypes.array.isRequired
  };

  keyExtractor = (faq) => {
    return faq._id;
  };

  renderFaq = ({ item, index }) => {
    return (
      <Accordion title={item.title} content={item.content} titleStyle={{ borderBottomWidth: 1, borderBottomColor: '#eeeeee', borderTopWidth: index == 0 ? 1 : 0, borderTopColor: '#eeeeee' }} />
    );
  };

  render() {
    const documentsForManagement = _.sortBy(this.props.documentsForManagement, [
      'order'
    ]);

    return (
      <Layout title="FAQ" isKeyboardDismissedOnTouched={false}>
        <FlatList data={documentsForManagement} keyExtractor={this.keyExtractor} renderItem={this.renderFaq} />
      </Layout>
    );
  }
}

export default createContainer(() => {
  return {
    documentsForManagement: Meteor.collection('documentsForManagement').find({
      type: 'faq'
    })
  };
}, Faqs);
