import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Main from '../scenes/Main';
import Links from '../scenes/Links';
import Tutorial from '../scenes/Tutorial';

export default class _Router extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="tutorialRouter" initial hideNavBar>
            <Scene key="tutorial" component={Tutorial} />
          </Scene>
          <Scene key="mainRouter" hideNavBar>
            <Scene key="main" component={Main} panHandlers={null} />
            <Scene key="links" component={Links} panHandlers={null} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
