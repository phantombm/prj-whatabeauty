import React, { Component } from 'react';
import Drawer from 'react-native-drawer'

import DrawerContent from '../components/DrawerContent';

export default class _Drawer extends Component {
  openDrawer = () => {
    this.drawer.open();
  };

  closeDrawer = () => {
    this.drawer.close();
  };

  render() {
    return (
      <Drawer
        acceptTap
        type="overlay"
        tweenDuration={ 100 }
        openDrawerOffset={ 0.3 }
        ref={ (ref) => { this.drawer = ref; } }
        content={ <DrawerContent closeDrawer={ this.closeDrawer } /> }
        styles={{ drawer: { backgroundColor: '#ffffff' }, mainOverlay: { backgroundColor: '#000000', opacity: 0 } }}
        tweenHandler={ (ratio) => ({ main: { opacity: ( 2 - ratio ) / 2 }, mainOverlay: { opacity: ratio * 0.8 } }) }
      >{ this.props.children }</Drawer>
    );
  }
}
