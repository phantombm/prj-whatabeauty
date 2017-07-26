import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import Info from '../../components/Info/Info';
import Hello from '../../components/Hello/Hello';

export default class Main extends Component {
  onClick = () => {
    setTimeout(function() {
      Meteor.loginWithGoogle(function(err)
      {
        if(!err)
        {
          console.log('success');
        }
        else
        {
          console.log(err);
        }
      });
    }, 1000);
  }

  render() {
    return (
      <div id="main">
        <button onClick={this.onClick}>asdf</button>
        <Hello />
        <Info />
      </div>
    );
  }
}
