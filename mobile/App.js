import React, { Component, Image } from 'react';
import { Asset } from 'expo';

import Splash from './scenes/Splash';
import Router from './routers/Router';
import './initialization/initialization';

export default class Application extends Component {
  state = {
    isLoadingAssetsDone: false,
    isApplicationReady: false,
    isSplashDisappearing: true,
    isSplashDisappeared: false
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

          this.splashRef.disappearSpalsh();
        }
      }, 500);
    }, 2000);

    // TODO: assets to preload
    const imageAssets = this.cacheImages([
      require('./assets/images/tutorial_1.png'),
      require('./assets/images/tutorial_2.png'),
      require('./assets/images/tutorial_3.png'),
      require('./assets/images/ssam_badge.png'),
      require('./assets/images/sign_in_background.png')
    ]);

    await Promise.all([
      ...imageAssets
    ]);

    require('./initialization/initialization');

    this.setState({
      isLoadingAssetsDone: true
    });
  }

  cacheImages = (images) => {
    return images.map((image) => {
      if (typeof image == 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  endLoading = () => {
    this.setState({
      isSplashDisappearing: false,
      isSplashDisappeared: true
    });
  };

  render() {
    if (!this.state.isLoadingAssetsDone || !this.state.isApplicationReady || this.state.isSplashDisappearing || !this.state.isSplashDisappeared) {
      return (
        <Splash ref={(ref) => { this.splashRef = ref; }} endLoading={this.endLoading} />
      );
    }

    return (
      <Router />
    );
  }
}
