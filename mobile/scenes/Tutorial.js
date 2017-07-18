import React, { Component } from 'react';
import AppIntro from 'react-native-app-intro';
import { Actions } from 'react-native-router-flux'

export default class Tutorial extends Component {
  pageArray = [
    {
      title: 'page 1',
      description: 'description 1',
      img: require('../assets/images/tutorial_prototype.png'),
      backgroundColor: '#999999',
      level: 10,
    }, {
      title: 'page 2',
      description: 'description 2',
      img: require('../assets/images/tutorial_prototype.png'),
      backgroundColor: '#999999',
      level: 10,
    }, {
      title: 'page 3',
      description: 'description 3',
      img: require('../assets/images/tutorial_prototype.png'),
      backgroundColor: '#999999',
      level: 10,
    }
  ];

  render() {
    return (
      <AppIntro
        pageArray={ this.pageArray }
        onDoneBtnClick={ Actions.mainRouter }
        onSkipBtnClick={ Actions.mainRouter }
      />
    );
  }
}
