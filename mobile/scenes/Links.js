import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux'
import Meteor, { createContainer } from 'react-native-meteor';

import Header from '../components/Header';

class Links extends Component {
  renderItem = ({ item }) => {
    return (
      <View key={ item._id } style={{ marginTop: 15, marginLeft: 15 }}>
        <View>
          <Text>{ item.title }</Text>
        </View>
        <View>
          <Text>{ item.url }</Text>
        </View>
        <View>
          <Text>createAt : { item.createdAt.toISOString().substr(0, 10) }</Text>
        </View>
      </View>
    );
  };

  keyExtractor = (item) => {
    return item._id;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Header
            title="ToDoList"
            onPressIcon={ Actions.pop }
            icon={ <Ionicons name="md-arrow-back" size={ 32 } /> }
          />
        </View>
        <View style={{ flex: 10 }}>
          { this.props.isLinksReady && <FlatList
            data={ this.props.links }
            renderItem={ this.renderItem }
            keyExtractor={this.keyExtractor}
          /> }
        </View>
      </View>
    );
  }
}

export default createContainer( () => {
  const linksSubscription = Meteor.subscribe('links.all');

  return {
    isLinksReady: linksSubscription.ready(),
    links: Meteor.collection('links').find({})
  }
}, Links);
