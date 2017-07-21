import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import Meteor from 'react-native-meteor';
import { Asset, Font } from 'expo';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';

import Splash from './scenes/Splash';
import Router from './routers/Router';

export default class Application extends Component {
  state = {
    isLoadingAssetsDone: false,
    isApplicationReady: false,
    isSplashImageDisappearing: true,
    isSplashImageDisappeared: false
  };

  componentWillMount() {
    this.loadAssets();
  }

  async loadAssets() {
    setTimeout(() => {
      const intervalId = setInterval(() => {
        if (this.state.isLoadingAssetsDone) {
          clearInterval(intervalId);

          this.setState({
            isApplicationReady: true
          });

          this.splashRef.disappearSpalshImage();
        }
      }, 500);
    }, 2000); // TODO: minimum loading time

    // TODO: assets to preload
    const assets = [
      require('./assets/images/tutorial_1.png'),
      require('./assets/images/tutorial_2.png'),
      require('./assets/images/tutorial_3.png')
    ];

    for (let asset of assets) {
      await Asset.fromModule(asset).downloadAsync();
    }

    // TODO: global initializations
    setCustomText({
      style: {
        fontFamily: Platform.OS == 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif'
      }
    });

    setCustomTextInput({
      underlineColorAndroid: 'transparent'
    });

    // TODO: ddp server ip
    Meteor.connect('ws://192.168.0.36:3000/websocket');

    this.setState({
      isLoadingAssetsDone: true
    });
  }

  endLoading = () => {
    this.setState({
      isSplashImageDisappearing: false,
      isSplashImageDisappeared: true
    });
  };

  render() {
    if (!this.state.isLoadingAssetsDone || !this.state.isApplicationReady || this.state.isSplashImageDisappearing || !this.state.isSplashImageDisappeared) {
      return (
        <Splash ref={(ref) => { this.splashRef = ref; }} endLoading={this.endLoading} />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    );
  }
}
