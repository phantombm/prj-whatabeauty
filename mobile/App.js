import React, { Component } from 'react';
import { View } from 'react-native';
import { Asset } from 'expo';

import Splash from './scenes/Splash';
import Router from './routers/Router';
import './initialization/initialization';

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
    }, 2000);

    // TODO: assets to preload
    const assets = [
      require('./assets/images/tutorial_1.png'),
      require('./assets/images/tutorial_2.png'),
      require('./assets/images/tutorial_3.png'),
      require('./assets/images/splash_inverted.png'),
      require('./assets/images/kakaotalk.png')
    ];

    for (let asset of assets) {
      await Asset.fromModule(asset).downloadAsync();
    }

    require('./initialization/initialization');

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
