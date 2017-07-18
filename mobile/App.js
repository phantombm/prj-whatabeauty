import React, { Component } from 'react';
import { View } from 'react-native';
import Meteor from 'react-native-meteor';
import { Constants, Asset, Font } from 'expo';
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

          this.refs.splash.disappearSpalshImage();
        }
      }, 500);
    }, 2000); // TODO: minimum loading time

    // TODO: assets to preload
    const assets = [
      require('./assets/images/tutorial_prototype.png')
    ];

    for (let asset of assets) {
      await Asset.fromModule(asset).downloadAsync();
    }

    // TODO: global initializations
    await Font.loadAsync({
      'spoqa_han_sans_regular': require('./assets/fonts/spoqa_han_sans/spoqa_han_sans_regular.ttf'),
      'Arial': require('./assets/fonts/spoqa_han_sans/spoqa_han_sans_regular.ttf')
    });

    setCustomText({
      style: {
        fontFamily: 'spoqa_han_sans_regular'
      }
    });

    setCustomTextInput({
      underlineColorAndroid: 'transparent'
    });

    // TODO: set ddp server ip
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
        <Splash ref="splash" endLoading={ this.endLoading }/>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: Constants.statusBarHeight }}></View>
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </View>
    );
  }
}
